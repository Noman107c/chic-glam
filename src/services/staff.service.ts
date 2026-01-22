import { supabaseClient } from '@/lib/supabaseClient';

export interface StaffAttendanceRecord {
  id: string;
  user_id: string;
  check_in_time: string;
  check_out_time?: string;
  location_lat?: number;
  location_lng?: number;
  created_at: string;
}

export interface StaffSalaryRecord {
  id: string;
  user_id: string;
  base_salary: number;
  commission: number;
  bonuses: number;
  deductions: number;
  total_salary: number;
  month: number;
  year: number;
  status: 'paid' | 'pending';
  created_at: string;
}

export const staffService = {
  // Staff Attendance Methods
  async checkIn(userId: string, location?: { lat: number; lng: number }): Promise<StaffAttendanceRecord> {
    const checkInData = {
      user_id: userId,
      check_in_time: new Date().toISOString(),
      ...(location && {
        location_lat: location.lat,
        location_lng: location.lng,
      }),
    };

    const { data, error } = await supabaseClient
      .from('staff_attendance')
      .insert([checkInData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async checkOut(attendanceId: string): Promise<StaffAttendanceRecord> {
    const { data, error } = await supabaseClient
      .from('staff_attendance')
      .update({ check_out_time: new Date().toISOString() })
      .eq('id', attendanceId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async getTodayAttendance(userId: string): Promise<StaffAttendanceRecord | null> {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabaseClient
      .from('staff_attendance')
      .select('*')
      .eq('user_id', userId)
      .gte('check_in_time', `${today}T00:00:00.000Z`)
      .lt('check_in_time', `${today}T23:59:59.999Z`)
      .order('check_in_time', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  },

  async getAttendanceHistory(userId: string, limit = 30, offset = 0): Promise<StaffAttendanceRecord[]> {
    const { data, error } = await supabaseClient
      .from('staff_attendance')
      .select('*')
      .eq('user_id', userId)
      .order('check_in_time', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(error.message);
    return data || [];
  },

  async getAttendanceStats(userId: string): Promise<{
    totalDays: number;
    totalHours: number;
    averageHoursPerDay: number;
    thisMonthDays: number;
    thisMonthHours: number;
  }> {
    const { data, error } = await supabaseClient
      .from('staff_attendance')
      .select('*')
      .eq('user_id', userId);

    if (error) throw new Error(error.message);

    const records = data || [];
    const completedRecords = records.filter((r: any) => r.check_out_time);

    const totalHours = completedRecords.reduce((sum: number, record: any) => {
      const checkIn = new Date(record.check_in_time);
      const checkOut = new Date(record.check_out_time!);
      const hours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
      return sum + hours;
    }, 0);

    const thisMonth = new Date().toISOString().slice(0, 7);
    const thisMonthRecords = completedRecords.filter((r: any) =>
      r.check_in_time.startsWith(thisMonth)
    );

    const thisMonthHours = thisMonthRecords.reduce((sum: number, record: any) => {
      const checkIn = new Date(record.check_in_time);
      const checkOut = new Date(record.check_out_time!);
      const hours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
      return sum + hours;
    }, 0);

    return {
      totalDays: completedRecords.length,
      totalHours: Math.round(totalHours * 100) / 100,
      averageHoursPerDay: completedRecords.length > 0 ? Math.round((totalHours / completedRecords.length) * 100) / 100 : 0,
      thisMonthDays: thisMonthRecords.length,
      thisMonthHours: Math.round(thisMonthHours * 100) / 100,
    };
  },

  // Staff Salary Methods
  async getSalaryHistory(userId: string, limit = 12, offset = 0): Promise<StaffSalaryRecord[]> {
    const { data, error } = await supabaseClient
      .from('staff_salaries')
      .select('*')
      .eq('user_id', userId)
      .order('year', { ascending: false })
      .order('month', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(error.message);
    return data || [];
  },

  async getCurrentMonthSalary(userId: string): Promise<StaffSalaryRecord | null> {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const { data, error } = await supabaseClient
      .from('staff_salaries')
      .select('*')
      .eq('user_id', userId)
      .eq('month', currentMonth)
      .eq('year', currentYear)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  },

  async calculateSalary(userId: string, month: number, year: number): Promise<{
    baseSalary: number;
    commission: number;
    bonuses: number;
    deductions: number;
    totalSalary: number;
  }> {
    // Get staff details
    const { data: staffData, error: staffError } = await supabaseClient
      .from('staff')
      .select('salary, commission')
      .eq('user_id', userId)
      .single();

    if (staffError) throw new Error('Staff details not found');

    // Calculate attendance hours for the month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 1);

    const { data: attendanceData, error: attendanceError } = await supabaseClient
      .from('staff_attendance')
      .select('*')
      .eq('user_id', userId)
      .gte('check_in_time', startDate.toISOString())
      .lt('check_in_time', endDate.toISOString());

    if (attendanceError) throw new Error(attendanceError.message);

    const completedRecords = attendanceData?.filter(r => r.check_out_time) || [];
    const totalHours = completedRecords.reduce((sum, record) => {
      const checkIn = new Date(record.check_in_time);
      const checkOut = new Date(record.check_out_time);
      return sum + (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
    }, 0);

    // Calculate salary (assuming base salary is monthly, commission per hour)
    const baseSalary = staffData.salary;
    const commission = totalHours * staffData.commission;
    const bonuses = 0; // Can be calculated based on performance
    const deductions = 0; // Can be calculated based on absences, etc.

    return {
      baseSalary,
      commission,
      bonuses,
      deductions,
      totalSalary: baseSalary + commission + bonuses - deductions,
    };
  },
};

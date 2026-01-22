import { supabaseClient } from '@/lib/supabaseClient';

export interface AttendanceRecord {
  id: string;
  user_id: string;
  check_in_time: string;
  check_out_time?: string;
  location_lat?: number;
  location_lng?: number;
  created_at: string;
}

export const attendanceService = {
  // Check in (start shift)
  async checkIn(userId: string, location?: { lat: number; lng: number }): Promise<AttendanceRecord> {
    const checkInData: Omit<AttendanceRecord, 'id' | 'created_at'> = {
      user_id: userId,
      check_in_time: new Date().toISOString(),
      ...(location && {
        location_lat: location.lat,
        location_lng: location.lng,
      }),
    };

    const { data, error } = await supabaseClient
      .from('attendance')
      .insert([checkInData])
      .select()
      .single();

    if (error) throw new Error(error.message);

    // TODO: Store in IndexedDB for offline support
    // await storeAttendanceLocally(data);

    return data;
  },

  // Check out (end shift)
  async checkOut(attendanceId: string): Promise<AttendanceRecord> {
    const { data, error } = await supabaseClient
      .from('attendance')
      .update({ check_out_time: new Date().toISOString() })
      .eq('id', attendanceId)
      .select()
      .single();

    if (error) throw new Error(error.message);

    // TODO: Update in IndexedDB for offline support
    // await updateAttendanceLocally(attendanceId, data);

    return data;
  },

  // Get today's attendance for user
  async getTodayAttendance(userId: string): Promise<AttendanceRecord | null> {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabaseClient
      .from('attendance')
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

  // Get attendance history for user
  async getAttendanceHistory(userId: string, limit = 30, offset = 0): Promise<AttendanceRecord[]> {
    const { data, error } = await supabaseClient
      .from('attendance')
      .select('*')
      .eq('user_id', userId)
      .order('check_in_time', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(error.message);
    return data || [];
  },

  // Get all attendance records (for super admin)
  async getAllAttendance(limit = 100, offset = 0): Promise<AttendanceRecord[]> {
    const { data, error } = await supabaseClient
      .from('attendance')
      .select(`
        *,
        users!inner(name, email)
      `)
      .order('check_in_time', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(error.message);
    return data || [];
  },

  // Get attendance stats for dashboard
  async getAttendanceStats(userId?: string): Promise<{
    totalDays: number;
    totalHours: number;
    averageHoursPerDay: number;
    thisMonthDays: number;
    thisMonthHours: number;
  }> {
    let query = supabaseClient.from('attendance').select('*');

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    const records = data || [];
    const completedRecords = records.filter((r: any) => r.check_out_time);

    // Calculate total hours
    const totalHours = completedRecords.reduce((sum: number, record: any) => {
      const checkIn = new Date(record.check_in_time);
      const checkOut = new Date(record.check_out_time!);
      const hours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
      return sum + hours;
    }, 0);

    // This month's records
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

  // Update attendance record
  async updateAttendance(id: string, updates: Partial<AttendanceRecord>): Promise<AttendanceRecord> {
    const { data, error } = await supabaseClient
      .from('attendance')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Delete attendance record
  async deleteAttendance(id: string): Promise<void> {
    const { error } = await supabaseClient
      .from('attendance')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  },
};

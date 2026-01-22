import { supabaseClient } from '@/lib/supabaseClient';
import { attendanceService } from './attendance.service';
import { salesService } from './sales.service';
import { userService } from './user.service';

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalAttendance: number;
  totalSales: number;
  totalRevenue: number;
  todayAttendance: number;
  todaySales: number;
  todayRevenue: number;
  monthlyRevenue: number;
}

export const dashboardService = {
  // Get comprehensive dashboard stats
  async getDashboardStats(userId?: string): Promise<DashboardStats> {
    try {
      // Get user stats
      const users = await userService.getAllUsers();
      const activeUsers = users.filter(u => u.is_active).length;

      // Get attendance stats
      const attendanceStats = await attendanceService.getAttendanceStats(userId);

      // Get sales stats
      const salesStats = await salesService.getSalesStats(userId);

      return {
        totalUsers: users.length,
        activeUsers,
        totalAttendance: attendanceStats.totalDays,
        totalSales: salesStats.totalSales,
        totalRevenue: salesStats.totalRevenue,
        todayAttendance: 0, // TODO: Implement today's attendance count
        todaySales: salesStats.todaySales,
        todayRevenue: salesStats.todayRevenue,
        monthlyRevenue: salesStats.monthlyRevenue,
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw new Error('Failed to fetch dashboard statistics');
    }
  },

  // Get recent activities
  async getRecentActivities(userId?: string, limit = 10): Promise<Array<{
    id: string;
    type: 'attendance' | 'sale' | 'user';
    title: string;
    description: string;
    timestamp: string;
  }>> {
    try {
      const activities: Array<{
        id: string;
        type: 'attendance' | 'sale' | 'user';
        title: string;
        description: string;
        timestamp: string;
      }> = [];

      // Get recent attendance
      const attendanceRecords = await attendanceService.getAttendanceHistory(userId || '', 5);
      attendanceRecords.forEach(record => {
        activities.push({
          id: record.id,
          type: 'attendance',
          title: record.check_out_time ? 'Checked Out' : 'Checked In',
          description: `Attendance recorded`,
          timestamp: record.check_in_time,
        });
      });

      // Get recent sales
      const salesRecords = await salesService.getSalesForStaff(userId || '', 5);
      salesRecords.forEach(sale => {
        activities.push({
          id: sale.id,
          type: 'sale',
          title: 'Sale Recorded',
          description: `Rs. ${sale.amount} for ${sale.service_type}`,
          timestamp: sale.sale_date,
        });
      });

      // Sort by timestamp and limit
      return activities
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      return [];
    }
  },

  // Get performance metrics
  async getPerformanceMetrics(userId?: string): Promise<{
    attendanceRate: number;
    salesGrowth: number;
    customerSatisfaction: number;
    revenueGrowth: number;
  }> {
    try {
      // This would require more complex queries with date ranges
      // For now, return placeholder data
      return {
        attendanceRate: 85,
        salesGrowth: 12.5,
        customerSatisfaction: 4.2,
        revenueGrowth: 8.3,
      };
    } catch (error) {
      console.error('Error fetching performance metrics:', error);
      throw new Error('Failed to fetch performance metrics');
    }
  },
};

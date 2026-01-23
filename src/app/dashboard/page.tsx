'use client';

import React, { useState, useEffect } from 'react';
import { StatCard } from '@/components/cards/StatCard';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { RevenueChart, ComparisonChart } from '@/components/charts/DashboardCharts';
import { useAuth } from '@/hooks/useAuth';
import { dashboardService } from '@/services/dashboard.service';
import { attendanceService } from '@/services/attendance.service';
import { Users, DollarSign, Calendar, TrendingUp, Activity, Settings, UserCheck, CreditCard } from 'lucide-react';

export default function DashboardPage() {
  const { user, role, isSuperAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    totalAttendance: 15680,
    totalSales: 2341,
    totalRevenue: 2847500,
    todayAttendance: 45,
    todaySales: 23,
    todayRevenue: 45600,
    monthlyRevenue: 892500
  });
  const [loading, setLoading] = useState(true);
  const [todayAttendance, setTodayAttendance] = useState<any>(null);

  useEffect(() => {
    loadDashboardData();
    loadTodayAttendance();
  }, [user]);

  const loadDashboardData = async () => {
    try {
      if (!user) return;

      // Using mock data for demonstration
      // const dashboardStats = await dashboardService.getDashboardStats(
      //   isSuperAdmin ? undefined : user.id
      // );
      // setStats(dashboardStats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };
  const loadTodayAttendance = async () => {
    try {
      if (!user) return;

      const attendance = await attendanceService.getTodayAttendance(user.id);
      setTodayAttendance(attendance);
    } catch (error) {
      console.error('Error loading today attendance:', error);
    }
  };

  const handleCheckIn = async () => {
    try {
      if (!user) return;

      await attendanceService.checkIn(user.id);
      await loadTodayAttendance();
      await loadDashboardData();
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  const handleCheckOut = async () => {
    try {
      if (!todayAttendance) return;

      await attendanceService.checkOut(todayAttendance.id);
      await loadTodayAttendance();
      await loadDashboardData();
    } catch (error) {
      console.error('Error checking out:', error);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-700">
            {role === 'super_admin' ? 'Super Admin Dashboard' :
             role === 'beautician' ? 'Beautician Dashboard' :
             'Trainer Dashboard'}
          </p>
        </div>
        
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users />}
          title="Total Users"
          value={stats.totalUsers}
          color="blue"
        />
        <StatCard
          icon={<UserCheck />}
          title="Active Users"
          value={stats.activeUsers}
          color="green"
        />
        <StatCard
          icon={<Calendar />}
          title="Total Attendance"
          value={stats.totalAttendance}
          color="purple"
        />
        <StatCard
          icon={<DollarSign />}
          title="Total Revenue"
          value={(stats.totalRevenue)}
          color="orange"
        />
      </div>

    

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader title="Today's Attendance" />
          <CardBody>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.todayAttendance}
              </div>
              <p className="text-gray-600">Check-ins today</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Today's Sales" />
          <CardBody>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats.todaySales}
              </div>
              <p className="text-gray-600">Sales recorded</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Today's Revenue" />
          <CardBody>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {(stats.todayRevenue)}
              </div>
              <p className="text-gray-600">Revenue earned</p>
            </div>
          </CardBody>
        </Card>
      </div>
  {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart
          data={[
            { date: '2024-01-01', revenue: 50000, expenses: 30000, profit: 20000 },
            { date: '2024-01-02', revenue: 55000, expenses: 32000, profit: 23000 },
            { date: '2024-01-03', revenue: 48000, expenses: 28000, profit: 20000 },
            { date: '2024-01-04', revenue: 60000, expenses: 35000, profit: 25000 },
            { date: '2024-01-05', revenue: 52000, expenses: 31000, profit: 21000 },
          ]}
        />
        <ComparisonChart
          data={[
            { name: 'Jan', salonRevenue: 30000 },
            { name: 'Feb', salonRevenue: 35000 },
            { name: 'Mar', salonRevenue: 32000 },
            { name: 'Apr', salonRevenue: 38000 },
          ]}
        />
      </div>
      {/* Current Status */}
      <Card>
        <CardHeader title="Current Status" />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Attendance Status</h3>
              {todayAttendance ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in Time:</span>
                    <span className="font-medium">
                      {new Date(todayAttendance.check_in_time).toLocaleTimeString()}
                    </span>
                  </div>
                  {todayAttendance.check_out_time && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out Time:</span>
                      <span className="font-medium">
                        {new Date(todayAttendance.check_out_time).toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                  <Badge
                    label={todayAttendance.check_out_time ? 'Completed' : 'Active'}
                    variant={todayAttendance.check_out_time ? 'success' : 'info'}
                  />
                </div>
              ) : (
                <p className="text-gray-500">Not checked in today</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Monthly Performance</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Revenue:</span>
                  <span className="font-medium">
                    {(stats.monthlyRevenue)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth:</span>
                  <Badge label="+12.5%" variant="success" />
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { StatCard } from "@/components/cards/StatCard";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  RevenueChart,
  ComparisonChart,
} from "@/components/charts/DashboardCharts";
import { useAuth } from "@/hooks/useAuth";
import { dashboardService } from "@/services/dashboard.service";
import { attendanceService } from "@/services/attendance.service";
import {
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  Activity,
  Settings,
  UserCheck,
  CreditCard,
  Clock,
  Scissors,
  Star,
} from "lucide-react";

const recentActivities = [
  {
    id: 1,
    user: "Sarah K.",
    action: "Booked 'Bridal Makeup'",
    time: "2 mins ago",
    type: "booking",
  },
  {
    id: 2,
    user: "John D.",
    action: "Checked in",
    time: "5 mins ago",
    type: "check-in",
  },
  {
    id: 3,
    user: "Emily R.",
    action: "Completed payment of $120",
    time: "15 mins ago",
    type: "payment",
  },
  {
    id: 4,
    user: "Admin",
    action: "Updated 'Facial Kit' stock",
    time: "1 hour ago",
    type: "stock",
  },
  {
    id: 5,
    user: "Michael B.",
    action: "Registered as new member",
    time: "2 hours ago",
    type: "user",
  },
];

const topServices = [
  { name: "Hydra Facial", bookings: 145, revenue: 15400, growth: 12 },
  { name: "Hair Spa", bookings: 120, revenue: 8500, growth: 8 },
  { name: "Bridal Makeup", bookings: 45, revenue: 22500, growth: 15 },
  { name: "Manicure", bookings: 89, revenue: 4500, growth: 5 },
];

const revenueData = [
  { date: "Jan 01", revenue: 45000, expenses: 20000, profit: 25000 },
  { date: "Jan 05", revenue: 52000, expenses: 22000, profit: 30000 },
  { date: "Jan 10", revenue: 49000, expenses: 25000, profit: 24000 },
  { date: "Jan 15", revenue: 63000, expenses: 28000, profit: 35000 },
  { date: "Jan 20", revenue: 58000, expenses: 26000, profit: 32000 },
  { date: "Jan 25", revenue: 72000, expenses: 31000, profit: 41000 },
  { date: "Jan 30", revenue: 68000, expenses: 29000, profit: 39000 },
];

const monthlyComparison = [
  { name: "Jan", salonRevenue: 150000 },
  { name: "Feb", salonRevenue: 180000 },
  { name: "Mar", salonRevenue: 165000 },
  { name: "Apr", salonRevenue: 190000 },
  { name: "May", salonRevenue: 210000 },
  { name: "Jun", salonRevenue: 195000 },
];

export default function DashboardPage() {
  const { user, role, isSuperAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 1450,
    activeUsers: 1230,
    totalAttendance: 16200,
    totalSales: 2890,
    totalRevenue: 3450750,
    todayAttendance: 68,
    todaySales: 35,
    todayRevenue: 52400,
    monthlyRevenue: 950000,
    pendingAppointments: 12,
    customerSatisfaction: 4.8,
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
      console.error("Error loading dashboard data:", error);
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
      console.error("Error loading today attendance:", error);
    }
  };

  const handleCheckIn = async () => {
    try {
      if (!user) return;

      await attendanceService.checkIn(user.id);
      await loadTodayAttendance();
      await loadDashboardData();
    } catch (error) {
      console.error("Error checking in:", error);
    }
  };

  const handleCheckOut = async () => {
    try {
      if (!todayAttendance) return;

      await attendanceService.checkOut(todayAttendance.id);
      await loadTodayAttendance();
      await loadDashboardData();
    } catch (error) {
      console.error("Error checking out:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1 md:mb-2">
            Welcome back{user?.name}!
          </h1>
          <p className="text-sm md:text-base text-gray-700">
            {role === "super_admin"
              ? "Super Admin Dashboard"
              : role === "beautician"
                ? "Beautician Dashboard"
                : "Trainer Dashboard"}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users />}
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          color="blue"
        />
        <StatCard
          icon={<UserCheck />}
          title="Active Users"
          value={stats.activeUsers.toLocaleString()}
          color="green"
        />
        <StatCard
          icon={<Calendar />}
          title="Total Appointments"
          value={stats.totalSales.toLocaleString()}
          color="purple"
        />
        <StatCard
          icon={<DollarSign />}
          title="Total Revenue"
          value={`$${(stats.totalRevenue / 100).toLocaleString()}`} // Assuming value is in cents/smallest unit or just big number
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
                {stats.todayRevenue}
              </div>
              <p className="text-gray-600">Revenue earned</p>
            </div>
          </CardBody>
        </Card>
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <ComparisonChart data={monthlyComparison} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-1">
          <CardHeader
            title="Recent Activity"
            subtitle="Latest system updates"
          />
          <CardBody>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0"
                >
                  <div
                    className={`mt-1 p-1.5 rounded-full ${
                      activity.type === "booking"
                        ? "bg-purple-100 text-purple-600"
                        : activity.type === "payment"
                          ? "bg-green-100 text-green-600"
                          : activity.type === "stock"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {activity.type === "booking" ? (
                      <Calendar size={14} />
                    ) : activity.type === "payment" ? (
                      <CreditCard size={14} />
                    ) : activity.type === "stock" ? (
                      <Activity size={14} />
                    ) : (
                      <UserCheck size={14} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {activity.user}
                    </p>
                    <p className="text-xs text-gray-500">{activity.action}</p>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                      <Clock size={10} /> {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Top Services */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Top Performing Services"
            subtitle="Based on bookings this month"
          />
          <CardBody>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-semibold text-gray-500 py-2">
                      Service
                    </th>
                    <th className="text-center text-xs font-semibold text-gray-500 py-2">
                      Bookings
                    </th>
                    <th className="text-right text-xs font-semibold text-gray-500 py-2">
                      Revenue
                    </th>
                    <th className="text-right text-xs font-semibold text-gray-500 py-2">
                      Growth
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topServices.map((service, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 text-sm font-medium text-gray-900 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                          <Scissors size={16} />
                        </div>
                        {service.name}
                      </td>
                      <td className="py-3 text-center text-sm text-gray-700">
                        <Badge
                          label={service.bookings.toString()}
                          variant="info"
                        />
                      </td>
                      <td className="py-3 text-right text-sm font-bold text-gray-900">
                        ${service.revenue.toLocaleString()}
                      </td>
                      <td className="py-3 text-right">
                        <Badge
                          label={`+${service.growth}%`}
                          variant="success"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
      {/* Current Status */}
      <Card>
        <CardHeader title="Current Status" />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Attendance Status
              </h3>
              {todayAttendance ? (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check-in Time:</span>
                    <span className="font-medium">
                      {new Date(
                        todayAttendance.check_in_time,
                      ).toLocaleTimeString()}
                    </span>
                  </div>
                  {todayAttendance.check_out_time && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out Time:</span>
                      <span className="font-medium">
                        {new Date(
                          todayAttendance.check_out_time,
                        ).toLocaleTimeString()}
                      </span>
                    </div>
                  )}
                  <Badge
                    label={
                      todayAttendance.check_out_time ? "Completed" : "Active"
                    }
                    variant={
                      todayAttendance.check_out_time ? "success" : "info"
                    }
                  />
                </div>
              ) : (
                <p className="text-gray-500">Not checked in today</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Monthly Performance
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Revenue:</span>
                  <span className="font-medium">{stats.monthlyRevenue}</span>
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

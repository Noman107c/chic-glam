'use client';

import React, { useState, useEffect } from 'react';
import { StatCard } from '@/components/cards/StatCard';
import { RevenueChart } from '@/components/charts/DashboardCharts';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, DollarSign, Calendar, TrendingUp, Activity, Settings, UserCheck, CreditCard } from 'lucide-react';

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRevenue: 0,
    totalAppointments: 0,
    activeUsers: 0,
    pendingPayments: 0,
    growth: 0
  });

  const periods = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'year', label: 'This Year' },
  ];

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setStats({
      totalUsers: 1247,
      totalRevenue: 45680,
      totalAppointments: 89,
      activeUsers: 234,
      pendingPayments: 12,
      growth: 12.5
    });
  }, [selectedPeriod]);

  const quickActions = [
    {
      title: 'New Appointment',
      description: 'Schedule a new booking',
      icon: Calendar,
      color: 'bg-blue-500',
      action: () => console.log('New appointment')
    },
    {
      title: 'Add User',
      description: 'Register new customer',
      icon: Users,
      color: 'bg-green-500',
      action: () => console.log('Add user')
    },
    {
      title: 'Process Payment',
      description: 'Handle customer payment',
      icon: CreditCard,
      color: 'bg-purple-500',
      action: () => console.log('Process payment')
    },
    {
      title: 'View Reports',
      description: 'Check analytics',
      icon: TrendingUp,
      color: 'bg-orange-500',
      action: () => console.log('View reports')
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'appointment',
      title: 'New appointment booked',
      description: 'John Doe booked Hair Styling',
      time: '2 minutes ago',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment received',
      description: '$150.00 from Sarah Wilson',
      time: '15 minutes ago',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'user',
      title: 'New user registered',
      description: 'Mike Johnson joined the platform',
      time: '1 hour ago',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'system',
      title: 'System maintenance',
      description: 'Scheduled maintenance completed',
      time: '2 hours ago',
      icon: Settings,
      color: 'text-gray-600'
    }
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex gap-2">
          {periods.map((period) => (
            <Button
              key={period.key}
              variant={selectedPeriod === period.key ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period.key)}
              className="text-sm"
            >
              {period.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<DollarSign className="w-6 h-6" />}
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          growth={stats.growth}
          growthPositive={true}
          color="green"
        />
        <StatCard
          icon={<UserCheck className="w-6 h-6" />}
          title="Active Users"
          value={stats.activeUsers.toString()}
          growth={8.2}
          growthPositive={true}
          color="blue"
        />
        <StatCard
          icon={<Calendar className="w-6 h-6" />}
          title="Total Appointments"
          value={stats.totalAppointments.toString()}
          growth={15.3}
          growthPositive={true}
          color="purple"
        />
        <StatCard
          icon={<CreditCard className="w-6 h-6" />}
          title="Pending Payments"
          value={stats.pendingPayments.toString()}
          growth={5.1}
          growthPositive={false}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader title="Quick Actions" />
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left group"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {action.description}
                </p>
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader title="Revenue Overview" subtitle="Monthly revenue trends" />
            <CardBody>
              <RevenueChart
                data={[
                  { date: 'Jan', revenue: 12000, expenses: 8000, profit: 4000 },
                  { date: 'Feb', revenue: 19000, expenses: 12000, profit: 7000 },
                  { date: 'Mar', revenue: 15000, expenses: 9000, profit: 6000 },
                  { date: 'Apr', revenue: 25000, expenses: 15000, profit: 10000 },
                  { date: 'May', revenue: 22000, expenses: 13000, profit: 9000 },
                  { date: 'Jun', revenue: 30000, expenses: 18000, profit: 12000 }
                ]}
                type="line"
              />
            </CardBody>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader title="Recent Activity" subtitle="Latest system activities" />
            <CardBody>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700`}>
                      <activity.icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Service Performance" />
          <CardBody>
            <div className="space-y-4">
              {[
                { service: 'Hair Styling', bookings: 45, revenue: '$2,250' },
                { service: 'Facial Treatment', bookings: 32, revenue: '$1,920' },
                { service: 'Massage', bookings: 28, revenue: '$1,680' },
                { service: 'Manicure', bookings: 21, revenue: '$1,050' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.service}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.bookings} bookings
                    </p>
                  </div>
                  <Badge label={item.revenue} variant="success" />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="System Status" />
          <CardBody>
            <div className="space-y-4">
              {[
                { label: 'Server Status', status: 'Online', color: 'success' },
                { label: 'Database', status: 'Healthy', color: 'success' },
                { label: 'API Response', status: 'Fast', color: 'success' },
                { label: 'Last Backup', status: '2 hours ago', color: 'info' }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    {item.label}
                  </span>
                  <Badge label={item.status} variant={item.color as any} />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

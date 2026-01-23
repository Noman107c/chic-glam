'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  RevenueChart,
  ComparisonChart,
  MembershipGrowthChart,
  CustomPieChart,
} from '@/components/charts/DashboardCharts';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import {
  mockRevenueData,
  mockComparisonData,
  mockMembershipData,
} from '@/utils/mockData';

export default function AnalyticsPage() {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [dateRange, setDateRange] = useState('weekly');



  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
        <p className="text-gray-700">
          Detailed insights into your business performance
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Date Range"
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              options={[
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'monthly', label: 'Monthly' },
                { value: 'yearly', label: 'Yearly' },
              ]}
            />
            <Select
              label="Chart Type"
              value={chartType}
              onChange={e => setChartType(e.target.value as 'line' | 'bar')}
              options={[
                { value: 'line', label: 'Line Chart' },
                { value: 'bar', label: 'Bar Chart' },
              ]}
            />
            <div className="flex items-end gap-2">
              <Button variant="primary" size="md">
                Export Report
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={mockRevenueData} type={chartType} />
        <ComparisonChart data={mockComparisonData} />
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <MembershipGrowthChart data={mockMembershipData} />
      </div>



      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Top Performing Services" />
          <CardBody>
            <div className="space-y-3">
              {[
                { name: 'Hair Styling', revenue: 24500 },
                { name: 'Personal Training', revenue: 22300 },
                { name: 'Facial Treatment', revenue: 18900 },
                { name: 'Membership Plans', revenue: 15600 },
              ].map((service, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700">{service.name}</span>
                  <span className="font-semibold text-gray-900">
                    ${service.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Peak Hours Analysis" />
          <CardBody>
            <div className="space-y-3">
              {[
                { hour: '10 AM - 11 AM', bookings: 15 },
                { hour: '6 PM - 7 PM', bookings: 42 },
                { hour: '7 PM - 8 PM', bookings: 38 },
                { hour: '12 PM - 1 PM', bookings: 28 },
              ].map((slot, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-700 ">{slot.hour}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200  rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{ width: `${(slot.bookings / 42) * 100}%` }}
                      />
                    </div>
                    <span className="font-semibold text-gray-900  w-8">
                      {slot.bookings}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

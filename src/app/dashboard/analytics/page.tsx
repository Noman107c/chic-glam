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
  mockBranchPerformance,
} from '@/utils/mockData';

export default function AnalyticsPage() {
  const [chartType, setChartType] = useState<'line' | 'bar'>('line');
  const [dateRange, setDateRange] = useState('weekly');

  const branchRevenueData = mockBranchPerformance.map(branch => ({
    name: branch.branchName,
    value: branch.revenue,
  }));

  const branchProfitData = mockBranchPerformance.map(branch => ({
    name: branch.branchName,
    value: branch.profit,
  }));

  const bookingCountData = mockBranchPerformance.map(branch => ({
    name: branch.branchName,
    value: branch.bookingCount,
  }));

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MembershipGrowthChart data={mockMembershipData} />
        <CustomPieChart
          data={branchRevenueData}
          title="Revenue Distribution"
          subtitle="By branch"
        />
        <CustomPieChart
          data={bookingCountData}
          title="Booking Distribution"
          subtitle="By branch"
        />
      </div>

      {/* Performance Table */}
      <Card>
        <CardHeader
          title="Branch Performance Summary"
          subtitle="Detailed metrics for each branch"
        />
        <CardBody>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">
                    Branch Name
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    Revenue
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    Expenses
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    Profit
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    Margin %
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    Members
                  </th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">
                    Bookings
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockBranchPerformance.map(branch => {
                  const margin = ((branch.profit / branch.revenue) * 100).toFixed(1);
                  return (
                    <tr
                      key={branch.branchId}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {branch.branchName}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-900">
                        { (branch.revenue)}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-900">
                        { (branch.expenses)}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-green-600">
                        { (branch.profit)}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-900">
                        {margin}%
                      </td>
                      <td className="px-4 py-3 text-right text-gray-900">
                        {branch.memberCount}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-900">
                        {branch.bookingCount}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

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
                    { (service.revenue)}
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

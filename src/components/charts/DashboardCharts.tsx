'use client';

import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, CardHeader } from '@/components/ui/Card';
import { CHART_COLORS } from '@/constants';

interface RevenueChartProps {
  data: Array<{
    date: string;
    revenue: number;
    expenses: number;
    profit: number;
  }>;
  type?: 'line' | 'bar';
}

export const RevenueChart: React.FC<RevenueChartProps> = ({ data, type = 'line' }) => {
  return (
    <Card>
      <CardHeader
        title="Revenue Analytics"
        subtitle="Daily revenue, expenses, and profit"
      />
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke={CHART_COLORS[0]}
                name="Revenue"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke={CHART_COLORS[4]}
                name="Expenses"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke={CHART_COLORS[2]}
                name="Profit"
                strokeWidth={2}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill={CHART_COLORS[0]} name="Revenue" />
              <Bar dataKey="expenses" fill={CHART_COLORS[4]} name="Expenses" />
              <Bar dataKey="profit" fill={CHART_COLORS[2]} name="Profit" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

interface ComparisonChartProps {
  data: Array<{
    name: string;
    salonRevenue: number;
    gymRevenue?: number;
  }>;
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({ data }) => {
  const hasGymData = data.some(item => item.gymRevenue !== undefined);

  return (
    <Card>
      <CardHeader
        title={hasGymData ? "Salon vs Gym Performance" : "Monthly Revenue"}
        subtitle={hasGymData ? "Monthly comparison" : "Revenue performance"}
      />
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="salonRevenue" fill={CHART_COLORS[1]} name="Salon" />
            {hasGymData && <Bar dataKey="gymRevenue" fill={CHART_COLORS[3]} name="Gym" />}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

interface MembershipGrowthProps {
  data: Array<{
    month: string;
    activeMembers: number;
  }>;
}

export const MembershipGrowthChart: React.FC<MembershipGrowthProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader
        title="Membership Growth"
        subtitle="Active members over time"
      />
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="activeMembers"
              stroke={CHART_COLORS[0]}
              name="Active Members"
              strokeWidth={2}
              dot={{ fill: CHART_COLORS[0], r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title: string;
  subtitle?: string;
}

export const CustomPieChart: React.FC<PieChartProps> = ({ data, title, subtitle }) => {
  return (
    <Card>
      <CardHeader title={title} subtitle={subtitle} />
      <div className="w-full h-80 flex justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

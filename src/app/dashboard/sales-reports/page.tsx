'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  Calendar,
  Filter,
  Download,
  Eye,
  EyeOff,
  BarChart3,
  PieChart,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart as PieChartComponent,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface SalesRecord {
  id: string;
  date: string;
  transactionId: string;
  customer: string;
  items: number;
  total: number;
  discount: number;
  tax: number;
  paymentMethod: string;
  serviceType: string;
  status: 'completed' | 'pending' | 'cancelled';
}

interface SalesSummary {
  totalSales: number;
  totalTransactions: number;
  averageTransaction: number;
  topService: string;
  topCustomer: string;
  conversionRate: number;
}

const mockSalesRecords: SalesRecord[] = [
  {
    id: '1',
    date: '2024-01-24',
    transactionId: 'TXN-001',
    customer: 'Aisha Khan',
    items: 3,
    total: 5000,
    discount: 500,
    tax: 850,
    paymentMethod: 'Cash',
    serviceType: 'Facial + Hair',
    status: 'completed',
  },
  {
    id: '2',
    date: '2024-01-24',
    transactionId: 'TXN-002',
    customer: 'Fatima Ali',
    items: 2,
    total: 3500,
    discount: 0,
    tax: 595,
    paymentMethod: 'Card',
    serviceType: 'Massage + Nails',
    status: 'completed',
  },
  {
    id: '3',
    date: '2024-01-24',
    transactionId: 'TXN-003',
    customer: 'Sara Khan',
    items: 5,
    total: 8500,
    discount: 1000,
    tax: 1445,
    paymentMethod: 'Online',
    serviceType: 'Full Package',
    status: 'completed',
  },
  {
    id: '4',
    date: '2024-01-23',
    transactionId: 'TXN-004',
    customer: 'Hina Shah',
    items: 1,
    total: 2000,
    discount: 0,
    tax: 340,
    paymentMethod: 'Card',
    serviceType: 'Makeup',
    status: 'completed',
  },
];

const salesTrendData = [
  { date: 'Mon', sales: 45000, transactions: 12 },
  { date: 'Tue', sales: 52000, transactions: 14 },
  { date: 'Wed', sales: 48000, transactions: 11 },
  { date: 'Thu', sales: 61000, transactions: 16 },
  { date: 'Fri', sales: 55000, transactions: 13 },
  { date: 'Sat', sales: 72000, transactions: 19 },
  { date: 'Sun', sales: 38000, transactions: 9 },
];

const servicePerformanceData = [
  { name: 'Facial Services', value: 35, sales: 85000 },
  { name: 'Hair Services', value: 28, sales: 68000 },
  { name: 'Body Massage', value: 20, sales: 48000 },
  { name: 'Makeup', value: 12, sales: 29000 },
  { name: 'Nails', value: 5, sales: 12000 },
];

const paymentMethodData = [
  { name: 'Cash', value: 40 },
  { name: 'Card', value: 35 },
  { name: 'Online', value: 25 },
];

const COLORS = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b'];

export default function SalesReportsPage() {
  const [salesRecords, setSalesRecords] = useState<SalesRecord[]>(mockSalesRecords);
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'analysis'>('overview');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');
  const [dateRange, setDateRange] = useState('week');

  // Calculate summary
  const summary: SalesSummary = {
    totalSales: salesRecords.reduce((sum, r) => sum + r.total, 0),
    totalTransactions: salesRecords.length,
    averageTransaction: salesRecords.length > 0 ? Math.round(salesRecords.reduce((sum, r) => sum + r.total, 0) / salesRecords.length) : 0,
    topService: 'Facial Services',
    topCustomer: 'Sara Khan',
    conversionRate: 85,
  };

  // Filter records
  const filteredRecords =
    filterStatus === 'all' ? salesRecords : salesRecords.filter((r) => r.status === filterStatus);

  // Overview Tab
  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          {
            label: 'Total Sales',
            value: `Rs ${summary.totalSales.toLocaleString()}`,
            icon: ShoppingCart,
            color: 'purple',
          },
          {
            label: 'Transactions',
            value: summary.totalTransactions,
            icon: TrendingUp,
            color: 'green',
          },
          {
            label: 'Avg. Transaction',
            value: `Rs ${summary.averageTransaction.toLocaleString()}`,
            icon: TrendingDown,
            color: 'blue',
          },
          {
            label: 'Top Service',
            value: 'Facial',
            icon: BarChart3,
            color: 'pink',
          },
          {
            label: 'Conversion',
            value: `${summary.conversionRate}%`,
            icon: Users,
            color: 'yellow',
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-gradient-to-br from-${card.color}-50 to-${card.color}-100 p-4 rounded-lg border border-${card.color}-200`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm text-gray-600 font-medium">{card.label}</div>
              <card.icon className={`text-${card.color}-600`} size={20} />
            </div>
            <div className="text-2xl font-bold text-gray-800">{card.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Sales Trend (Weekly)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction Count */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Transactions Per Day</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="transactions" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Service Performance */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Service Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={servicePerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChartComponent>
              <Pie
                data={paymentMethodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChartComponent>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // Records Tab
  const RecordsTab = () => (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-4">
        {(['all', 'completed', 'pending', 'cancelled'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize transition ${
              filterStatus === status
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Transaction</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Customer</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Service</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Items</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Total</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Discount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Payment</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-600">{record.date}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{record.transactionId}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{record.customer}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{record.serviceType}</td>
                  <td className="px-4 py-3 text-sm font-medium text-center text-gray-800">{record.items}</td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">
                    Rs {record.total.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-red-600 font-medium">
                    Rs {record.discount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{record.paymentMethod}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        record.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : record.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {record.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Analysis Tab
  const AnalysisTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Service Analysis */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Service Analysis</h3>
          <div className="space-y-3">
            {servicePerformanceData.map((service, idx) => (
              <div key={idx} className="flex items-center justify-between pb-3 border-b last:border-b-0">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  />
                  <span className="text-gray-700 font-medium">{service.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-800">{service.value}%</div>
                  <div className="text-xs text-gray-500">Rs {service.sales.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="text-sm text-gray-600 font-medium">Total Revenue</div>
              <div className="text-3xl font-bold text-purple-600 mt-1">
                Rs {summary.totalSales.toLocaleString()}
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="text-sm text-gray-600 font-medium">Avg. Transaction Value</div>
              <div className="text-3xl font-bold text-green-600 mt-1">
                Rs {summary.averageTransaction.toLocaleString()}
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="text-sm text-gray-600 font-medium">Conversion Rate</div>
              <div className="text-3xl font-bold text-blue-600 mt-1">{summary.conversionRate}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Sales Analysis Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              label: 'Best Performing Service',
              value: servicePerformanceData[0].name,
              subtext: `Rs ${servicePerformanceData[0].sales.toLocaleString()}`,
            },
            {
              label: 'Top Customer',
              value: summary.topCustomer,
              subtext: 'Multiple purchases',
            },
            {
              label: 'Peak Day',
              value: 'Saturday',
              subtext: '19 transactions',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg">
              <div className="text-sm text-gray-600 font-medium">{item.label}</div>
              <div className="text-2xl font-bold text-gray-800 mt-2">{item.value}</div>
              <div className="text-xs text-gray-500 mt-1">{item.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Sales & Reports</h1>
            <p className="text-gray-600">Track sales performance and analyze business metrics</p>
          </div>
          <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700">
            <Download size={18} />
            Export Report
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {(['overview', 'records', 'analysis'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold capitalize border-b-2 transition ${
                activeTab === tab
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'records' && <RecordsTab />}
        {activeTab === 'analysis' && <AnalysisTab />}
      </div>
    </div>
  );
}

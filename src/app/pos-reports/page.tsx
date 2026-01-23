'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Loader } from '@/components/ui/Loader';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react';

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [dateRange, setDateRange] = useState('today');
  const [stats, setStats] = useState({
    totalSales: 0,
    totalTransactions: 0,
    averageTransaction: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const date = new Date();
        if (dateRange === 'today') {
          // Already set
        } else if (dateRange === '7days') {
          date.setDate(date.getDate() - 7);
        } else if (dateRange === '30days') {
          date.setDate(date.getDate() - 30);
        }

        const response = await fetch(`/api/pos/transactions?date=${date.toISOString().split('T')[0]}&limit=1000`);
        if (response.ok) {
          const data = await response.json();
          setTransactions(data.data);

          // Calculate stats
          const totalSales = data.data.reduce((sum: number, t: any) => sum + t.total, 0);
          const totalTransactions = data.data.length;
          const uniqueCustomers = new Set(data.data.map((t: any) => t.customerId)).size;

          setStats({
            totalSales,
            totalTransactions,
            averageTransaction: totalTransactions > 0 ? totalSales / totalTransactions : 0,
            totalCustomers: uniqueCustomers,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  if (loading) return <Loader />;

  // Group transactions by hour for chart
  const hourlyData = Array.from({ length: 24 }, (_, i) => {
    const hour = i;
    const hourTransactions = transactions.filter(t => {
      const date = new Date(t.createdAt);
      return date.getHours() === hour;
    });
    const hourSales = hourTransactions.reduce((sum, t) => sum + t.total, 0);
    return {
      hour: `${hour}:00`,
      sales: hourSales,
      transactions: hourTransactions.length,
    };
  });

  // Services breakdown
  const servicesData: { [key: string]: number } = {};
  transactions.forEach(t => {
    t.items.forEach((item: any) => {
      if (item.service) {
        servicesData[item.service.name] = (servicesData[item.service.name] || 0) + item.amount;
      }
    });
  });

  const topServices = Object.entries(servicesData)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, amount]) => ({
      name,
      amount,
    }));

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">POS Reports</h1>

        {/* Date Range Filter */}
        <div className="flex gap-2 mb-6">
          {['today', '7days', '30days'].map(range => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded font-semibold ${
                dateRange === range
                  ? 'bg-pink-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              {range === 'today' ? 'Today' : range === '7days' ? 'Last 7 Days' : 'Last 30 Days'}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Sales</p>
                <p className="text-2xl font-bold text-green-600">₹{stats.totalSales.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Transactions</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalTransactions}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Avg Transaction</p>
                <p className="text-2xl font-bold text-purple-600">₹{stats.averageTransaction.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Customers</p>
                <p className="text-2xl font-bold text-orange-600">{stats.totalCustomers}</p>
              </div>
              <Users className="w-8 h-8 text-orange-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Hourly Sales */}
          <Card className="p-4">
            <h2 className="text-lg font-bold mb-4">Hourly Sales</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#ec4899" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Services */}
          <Card className="p-4">
            <h2 className="text-lg font-bold mb-4">Top Services by Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topServices}>
                <CartesianGrid />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Transaction Details */}
        <Card className="p-4">
          <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Invoice #</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Items</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 10).map(transaction => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">{transaction.transactionNo}</td>
                    <td className="px-4 py-2">{transaction.customerName}</td>
                    <td className="px-4 py-2">{transaction.items.length}</td>
                    <td className="px-4 py-2 text-right font-bold">₹{transaction.total.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        transaction.paymentStatus === 'PAID'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.paymentStatus}
                      </span>
                    </td>
                    <td className="px-4 py-2">{new Date(transaction.createdAt).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

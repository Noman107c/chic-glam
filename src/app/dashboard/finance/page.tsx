"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Download,
  Plus,
  Filter,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as PieChartComponent,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

interface FinanceRecord {
  id: string;
  date: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
  reference?: string;
}

interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  pendingPayments: number;
}

const mockFinanceRecords: FinanceRecord[] = [
  {
    id: "1",
    date: "2024-01-24",
    type: "income",
    category: "Salon Services",
    description: "Facial & Hair Services",
    amount: 15000,
    paymentMethod: "Cash",
  },
  {
    id: "2",
    date: "2024-01-24",
    type: "income",
    category: "Gym Membership",
    description: "Monthly membership fee",
    amount: 25000,
    paymentMethod: "Online",
  },
  {
    id: "3",
    date: "2024-01-24",
    type: "expense",
    category: "Supplies",
    description: "Beauty supplies purchase",
    amount: 8000,
    paymentMethod: "Cheque",
  },
  {
    id: "4",
    date: "2024-01-23",
    type: "income",
    category: "Products Sale",
    description: "Product sales",
    amount: 12000,
    paymentMethod: "Card",
  },
];

const chartData = [
  { month: "Jan", income: 120000, expense: 40000 },
  { month: "Feb", income: 150000, expense: 45000 },
  { month: "Mar", income: 180000, expense: 50000 },
  { month: "Apr", income: 160000, expense: 48000 },
];

const pieData = [
  { name: "Salon Services", value: 45 },
  { name: "Gym", value: 35 },
  { name: "Products", value: 20 },
];

const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4"];

export default function FinancePage() {
  const [records, setRecords] = useState<FinanceRecord[]>(mockFinanceRecords);
  const [activeTab, setActiveTab] = useState<
    "overview" | "records" | "reports"
  >("overview");
  const [showDetails, setShowDetails] = useState(false);
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">(
    "all",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<FinanceRecord>>({
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSaveRecord = () => {
    if (!formData.amount || !formData.category || !formData.description) {
      alert("Please fill all required fields");
      return;
    }

    const newRecord: FinanceRecord = {
      id: Math.random().toString(36).substr(2, 9),
      date: formData.date || new Date().toISOString().split("T")[0],
      type: formData.type || "expense",
      category: formData.category || "General",
      description: formData.description || "",
      amount: Number(formData.amount) || 0,
      paymentMethod: formData.paymentMethod || "Cash",
      reference: formData.reference,
    };
    setRecords([newRecord, ...records]);
    setIsModalOpen(false);
    setFormData({
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    });
  };

  // Calculate summary
  const summary: FinanceSummary = {
    totalIncome: records
      .filter((r) => r.type === "income")
      .reduce((sum, r) => sum + r.amount, 0),
    totalExpense: records
      .filter((r) => r.type === "expense")
      .reduce((sum, r) => sum + r.amount, 0),
    netProfit: 0,
    pendingPayments: 25000,
  };
  summary.netProfit = summary.totalIncome - summary.totalExpense;

  // Filter records
  const filteredRecords =
    filterType === "all"
      ? records
      : records.filter((r) => r.type === filterType);

  // Overview Tab
  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Income",
            value: summary.totalIncome,
            icon: TrendingUp,
            color: "green",
          },
          {
            label: "Total Expense",
            value: summary.totalExpense,
            icon: TrendingDown,
            color: "red",
          },
          {
            label: "Net Profit",
            value: summary.netProfit,
            icon: DollarSign,
            color: "blue",
          },
          {
            label: "Pending Payments",
            value: summary.pendingPayments,
            icon: Filter,
            color: "yellow",
          },
        ].map((card) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br from-${card.color}-50 to-${card.color}-100 p-6 rounded-lg border border-${card.color}-200`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-600 font-medium">
                  {card.label}
                </div>
                <div className="text-3xl font-bold text-gray-800 mt-2">
                  Rs {card.value.toLocaleString()}
                </div>
              </div>
              <card.icon
                className={`${card.color === "green" ? "text-green-600" : card.color === "red" ? "text-red-600" : card.color === "blue" ? "text-blue-600" : "text-yellow-600"}`}
                size={32}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Income vs Expense Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Income by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChartComponent>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChartComponent>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Monthly Performance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#8b5cf6" />
              <Bar dataKey="expense" fill="#ec4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  // Records Tab
  const RecordsTab = () => (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {(["all", "income", "expense"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize transition ${
              filterType === type
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-bold text-black border-r border-gray-200">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-black border-r border-gray-200">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-black border-r border-gray-200">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-black border-r border-gray-200">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-black border-r border-gray-200">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-black">
                  Payment Method
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                    {record.date}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        record.type === "income"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {record.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">
                    {record.category}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {record.description}
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">
                    Rs {record.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                    {record.paymentMethod}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Reports Tab
  const ReportsTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Summary Report */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Financial Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Total Income</span>
              <span className="text-green-600 font-bold">
                Rs {summary.totalIncome.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Total Expense</span>
              <span className="text-red-600 font-bold">
                Rs {summary.totalExpense.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center pt-3 bg-purple-50 p-3 rounded">
              <span className="text-gray-800 font-semibold">Net Profit</span>
              <span className="text-purple-600 font-bold text-lg">
                Rs {summary.netProfit.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Category Breakdown
          </h3>
          <div className="space-y-2">
            {pieData.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        COLORS[pieData.indexOf(item) % COLORS.length],
                    }}
                  />
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-bold text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Finance & Accounting
            </h1>
            <p className="text-gray-700 font-medium">
              Monitor income, expenses, and financial performance
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setFormData({
                  type: "expense",
                  date: new Date().toISOString().split("T")[0],
                });
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              <Plus size={18} />
              Add Expense
            </button>
            <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {(["overview", "records", "reports"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold capitalize border-b-2 transition ${
                activeTab === tab
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "records" && <RecordsTab />}
        {activeTab === "reports" && <ReportsTab />}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Add New ${formData.type === "income" ? "Income" : "Expense"}`}
          footer={
            <div className="flex gap-3 w-full">
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveRecord}
                className={`flex-1 ${formData.type === "income" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
              >
                Save {formData.type === "income" ? "Income" : "Expense"}
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Type"
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value as "income" | "expense",
                  })
                }
                options={[
                  { value: "income", label: "Income" },
                  { value: "expense", label: "Expense" },
                ]}
              />
              <Input
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Category"
                placeholder="e.g. Rent, Salary, Bill"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />
              <Input
                label="Amount (Rs)"
                type="number"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: parseFloat(e.target.value),
                  })
                }
              />
            </div>

            <Input
              label="Description"
              placeholder="Enter details..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <Select
              label="Payment Method"
              value={formData.paymentMethod}
              onChange={(e) =>
                setFormData({ ...formData, paymentMethod: e.target.value })
              }
              options={[
                { value: "Cash", label: "Cash" },
                { value: "Online", label: "Online" },
                { value: "Card", label: "Card" },
                { value: "Cheque", label: "Cheque" },
              ]}
            />

            <Input
              label="Reference (Optional)"
              placeholder="e.g. Transaction ID"
              value={formData.reference}
              onChange={(e) =>
                setFormData({ ...formData, reference: e.target.value })
              }
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Download,
  Plus,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Filter,
} from "lucide-react";
import {
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
} from "recharts";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

// Types
interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  status: "Paid" | "Unpaid";
  lastPaid: string;
}

interface PayrollRecord {
  id: string;
  month: string;
  totalAmount: number;
  employeesPaid: number;
  status: "Completed" | "Pending";
}

// Mock Data
const mockEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "Sarah Khan",
    role: "Senior Stylist",
    department: "Salon",
    baseSalary: 85000,
    bonus: 5000,
    deductions: 0,

    status: "Unpaid",
    lastPaid: "2023-12-31",
  },
  {
    id: "EMP002",
    name: "Ali Ahmed",
    role: "Manager",
    department: "Management",
    baseSalary: 120000,
    bonus: 10000,
    deductions: 2000,
    status: "Paid",
    lastPaid: "2024-01-25",
  },
  {
    id: "EMP003",
    name: "Zara Sheikh",
    role: "Makeup Artist",
    department: "Salon",
    baseSalary: 75000,
    bonus: 3000,
    deductions: 1500,
    status: "Unpaid",
    lastPaid: "2023-12-31",
  },
  {
    id: "EMP004",
    name: "Bilal Raza",
    role: "Marketing Lead",
    department: "Marketing",
    baseSalary: 95000,
    bonus: 0,
    deductions: 0,
    status: "Unpaid",
    lastPaid: "2023-12-31",
  },
  {
    id: "EMP005",
    name: "Ayesha Malik",
    role: "Junior Stylist",
    department: "Salon",
    baseSalary: 45000,
    bonus: 1000,
    deductions: 500,
    status: "Paid",
    lastPaid: "2024-01-25",
  },
];

const mockHistory: PayrollRecord[] = [
  {
    id: "PAY001",
    month: "January 2024",
    totalAmount: 425000,
    employeesPaid: 5,
    status: "Completed",
  },
  {
    id: "PAY002",
    month: "December 2023",
    totalAmount: 410000,
    employeesPaid: 5,
    status: "Completed",
  },
  {
    id: "PAY003",
    month: "November 2023",
    totalAmount: 405000,
    employeesPaid: 4,
    status: "Completed",
  },
];

const chartData = [
  { month: "Aug", payroll: 420000, bonus: 15000 },
  { month: "Sep", payroll: 425000, bonus: 12000 },
  { month: "Oct", payroll: 430000, bonus: 18000 },
  { month: "Nov", payroll: 428000, bonus: 14000 },
  { month: "Dec", payroll: 450000, bonus: 25000 },
  { month: "Jan", payroll: 445000, bonus: 20000 },
];

const deptData = [
  { name: "Salon", value: 65 },
  { name: "Management", value: 15 },
  { name: "Marketing", value: 20 },
];

const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4"];

export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "employees" | "history"
  >("overview");
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Paid" | "Unpaid">(
    "All",
  );
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [newEmployeeData, setNewEmployeeData] = useState<Partial<Employee>>({
    name: "",
    role: "",
    department: "",
    baseSalary: 0,
    bonus: 0,
    deductions: 0,

    status: "Unpaid",
  });

  //Stats
  const totalPayroll = employees.reduce(
    (sum, emp) => sum + emp.baseSalary + emp.bonus - emp.deductions,
    0,
  );
  const pendingAmount = employees
    .filter((emp) => emp.status === "Unpaid")
    .reduce((sum, emp) => sum + emp.baseSalary + emp.bonus - emp.deductions, 0);
  const paidCount = employees.filter((emp) => emp.status === "Paid").length;

  const handleStatusChange = (id: string, newStatus: "Paid" | "Unpaid") => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id
          ? {
              ...emp,
              status: newStatus,
              lastPaid:
                newStatus === "Paid"
                  ? new Date().toISOString().split("T")[0]
                  : emp.lastPaid,
            }
          : emp,
      ),
    );
  };
  const handleAddStaff = () => {
    if (
      newEmployeeData.name &&
      newEmployeeData.role &&
      newEmployeeData.baseSalary
    ) {
      const newEmployee: Employee = {
        id: `EMP${String(employees.length + 1).padStart(3, "0")}`,
        name: newEmployeeData.name!,
        role: newEmployeeData.role!,
        department: newEmployeeData.department || "General",
        baseSalary: Number(newEmployeeData.baseSalary),
        bonus: Number(newEmployeeData.bonus) || 0,
        deductions: Number(newEmployeeData.deductions) || 0,

        status: "Unpaid",
        lastPaid: "-",
      };
      setEmployees([...employees, newEmployee]);
      setIsAddStaffModalOpen(false);
      setNewEmployeeData({
        name: "",
        role: "",
        department: "",
        baseSalary: 0,
        bonus: 0,
        deductions: 0,

        status: "Unpaid",
      });
    } else {
      alert("Please fill in Name, Role and Base Salary");
    }
  };

  const handleProcessPayment = () => {
    if (selectedEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === selectedEmployee.id
            ? {
                ...emp,
                status: "Paid",
                lastPaid: new Date().toISOString().split("T")[0],
              }
            : emp,
        ),
      );
      setIsProcessModalOpen(false);
      setSelectedEmployee(null);
    }
  };

  const handleProcessAll = () => {
    setEmployees(
      employees.map((emp) => ({
        ...emp,
        status: "Paid",
        lastPaid: new Date().toISOString().split("T")[0],
      })),
    );
    // In a real app, this would show a summary modal first
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Monthly Payroll",
            value: totalPayroll,
            icon: DollarSign,
            color: "purple",
          },
          {
            label: "Pending Salaries",
            value: pendingAmount,
            icon: Clock,
            color: "yellow",
          },
          {
            label: "Employees Paid",
            value: `${paidCount}/${employees.length}`,
            icon: CheckCircle,
            color: "green",
          },
          {
            label: "Avg. Salary",
            value: Math.round(totalPayroll / employees.length),
            icon: Users,
            color: "blue",
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm text-gray-500 font-medium">
                  {card.label}
                </div>
                <div className="text-2xl font-bold text-gray-800 mt-2">
                  {typeof card.value === "number"
                    ? `Rs ${card.value.toLocaleString()}`
                    : card.value}
                </div>
              </div>
              <div className={`p-3 rounded-full bg-${card.color}-50`}>
                <card.icon className={`text-${card.color}-600`} size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Payroll Trends
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="payroll"
                  name="Base Salary"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="bonus"
                  name="Bonuses"
                  fill="#ec4899"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Cost by Department
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deptData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deptData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const EmployeesTab = () => (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3 relative w-full md:w-auto">
          <Button
            variant="outline"
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className={`flex items-center gap-2 whitespace-nowrap ${
              filterStatus !== "All"
                ? "border-purple-500 text-purple-600 bg-purple-50"
                : ""
            }`}
          >
            <Filter size={18} />
            {filterStatus === "All" ? "Filter" : filterStatus}
          </Button>

          {showFilterMenu && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
              {["All", "Paid", "Unpaid"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilterStatus(status as any);
                    setShowFilterMenu(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${filterStatus === status ? "text-purple-600 font-medium bg-purple-50" : "text-gray-700"}`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}

          <Button
            onClick={handleProcessAll}
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 whitespace-nowrap"
          >
            <DollarSign size={18} /> Pay All
          </Button>
        </div>
      </div>

      {/* Table */}
      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Role/Dept
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Base Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Adjustments
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Net Salary
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees
                .filter((emp) => {
                  const matchesSearch = emp.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                  const matchesFilter =
                    filterStatus === "All" || emp.status === filterStatus;
                  return matchesSearch && matchesFilter;
                })
                .map((emp) => {
                  const netSalary = emp.baseSalary + emp.bonus - emp.deductions;
                  return (
                    <tr
                      key={emp.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold mr-3">
                            {emp.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {emp.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {emp.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{emp.role}</div>
                        <div className="text-xs text-gray-500">
                          {emp.department}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        Rs {emp.baseSalary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs text-green-600">
                          + {emp.bonus}
                        </div>
                        <div className="text-xs text-red-600">
                          - {emp.deductions}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        Rs {netSalary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={emp.status}
                          onChange={(e) =>
                            handleStatusChange(
                              emp.id,
                              e.target.value as "Paid" | "Unpaid",
                            )
                          }
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer focus:ring-2 focus:ring-purple-500 outline-none
                             ${
                               emp.status === "Paid"
                                 ? "bg-green-100 text-green-800"
                                 : "bg-red-100 text-red-800"
                             }`}
                        >
                          <option value="Unpaid">Unpaid</option>
                          <option value="Paid">Paid</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {emp.status === "Paid" && (
                          <button className="text-gray-400 hover:text-gray-600">
                            <FileText size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {employees
          .filter((emp) => {
            const matchesSearch = emp.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
            const matchesFilter =
              filterStatus === "All" || emp.status === filterStatus;
            return matchesSearch && matchesFilter;
          })
          .map((emp) => {
            const netSalary = emp.baseSalary + emp.bonus - emp.deductions;
            return (
              <div
                key={emp.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {emp.name}
                      </div>
                      <div className="text-xs text-gray-500">{emp.role}</div>
                    </div>
                  </div>
                  <select
                    value={emp.status}
                    onChange={(e) =>
                      handleStatusChange(
                        emp.id,
                        e.target.value as "Paid" | "Unpaid",
                      )
                    }
                    className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer focus:ring-2 focus:ring-purple-500 outline-none
                             ${
                               emp.status === "Paid"
                                 ? "bg-green-100 text-green-800"
                                 : "bg-red-100 text-red-800"
                             }`}
                  >
                    <option value="Unpaid">Unpaid</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm border-t border-gray-50 pt-3">
                  <div>
                    <span className="text-gray-500 block text-xs">
                      Department
                    </span>
                    <span className="font-medium">{emp.department}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs">
                      Net Salary (Auto)
                    </span>
                    <span className="font-bold text-gray-900">
                      Rs {netSalary.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-[#392d22]">
              Payroll
            </h1>
            <p className="text-gray-600 mt-1">
              Manage employee salaries, bonuses, and payments.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={18} /> Report
            </Button>
            <Button
              onClick={() => setIsAddStaffModalOpen(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
            >
              <Plus size={18} /> Add Staff
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto pb-1 scrollbar-hide">
            {["overview", "employees", "history"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`
                  whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors
                  ${
                    activeTab === tab
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "employees" && <EmployeesTab />}
        {activeTab === "history" && (
          <div>
            <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Month
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Total Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Employees Paid
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockHistory.map((record) => (
                      <tr
                        key={record.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-gray-400" />
                            {record.month}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          Rs {record.totalAmount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {record.employeesPaid} Employees
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-purple-600 hover:text-purple-900 font-medium flex items-center justify-end gap-1">
                            <Download size={16} /> Slip
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards for History */}
            <div className="md:hidden space-y-4">
              {mockHistory.map((record) => (
                <div
                  key={record.id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar size={18} className="text-purple-500" />
                      <span className="font-semibold text-gray-900">
                        {record.month}
                      </span>
                    </div>
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {record.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Amount</span>
                      <span className="font-bold text-gray-900">
                        Rs {record.totalAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Employees Paid</span>
                      <span>{record.employeesPaid}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4 flex items-center justify-center gap-2"
                  >
                    <Download size={16} /> Download Slip
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Staff Modal */}
      <Modal
        isOpen={isAddStaffModalOpen}
        onClose={() => setIsAddStaffModalOpen(false)}
        title="Add New Staff Member"
        footer={
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => setIsAddStaffModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddStaff}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
            >
              Add Staff
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. John Doe"
            value={newEmployeeData.name}
            onChange={(e) =>
              setNewEmployeeData({ ...newEmployeeData, name: e.target.value })
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Role/Position"
              placeholder="e.g. Stylist"
              value={newEmployeeData.role}
              onChange={(e) =>
                setNewEmployeeData({ ...newEmployeeData, role: e.target.value })
              }
            />
            <Input
              label="Department"
              placeholder="e.g. Salon"
              value={newEmployeeData.department}
              onChange={(e) =>
                setNewEmployeeData({
                  ...newEmployeeData,
                  department: e.target.value,
                })
              }
            />
          </div>
          <Input
            label="Base Salary (Rs)"
            type="number"
            placeholder="0"
            value={newEmployeeData.baseSalary}
            onChange={(e) =>
              setNewEmployeeData({
                ...newEmployeeData,
                baseSalary: Number(e.target.value),
              })
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Initial Bonus (Optional)"
              type="number"
              placeholder="0"
              value={newEmployeeData.bonus}
              onChange={(e) =>
                setNewEmployeeData({
                  ...newEmployeeData,
                  bonus: Number(e.target.value),
                })
              }
            />
            <Input
              label="Initial Deductions (Optional)"
              type="number"
              placeholder="0"
              value={newEmployeeData.deductions}
              onChange={(e) =>
                setNewEmployeeData({
                  ...newEmployeeData,
                  deductions: Number(e.target.value),
                })
              }
            />
          </div>
        </div>
      </Modal>

      {/* Process Payment Modal */}
      <Modal
        isOpen={isProcessModalOpen}
        onClose={() => setIsProcessModalOpen(false)}
        title="Process Salary Payment"
        footer={
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={() => setIsProcessModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleProcessPayment}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              Confirm Payment
            </Button>
          </div>
        }
      >
        {selectedEmployee && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Employee</span>
                <span className="font-semibold text-gray-900">
                  {selectedEmployee.name}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Base Salary</span>
                <span>Rs {selectedEmployee.baseSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between mb-2 text-green-600">
                <span>Bonus</span>
                <span>+ Rs {selectedEmployee.bonus.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Deductions</span>
                <span>- Rs {selectedEmployee.deductions.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold text-lg">
                <span>Net Payable</span>
                <span>
                  Rs{" "}
                  {(
                    selectedEmployee.baseSalary +
                    selectedEmployee.bonus -
                    selectedEmployee.deductions
                  ).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <AlertCircle size={16} className="inline mr-1" />
              This action will mark the month's salary as paid and generate a
              payslip.
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

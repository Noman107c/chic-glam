"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, Search } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  department?: string;
  position?: string;
  salary?: number;
  shiftStart?: string;
  shiftEnd?: string;
  joinDate: string;
  status: "active" | "inactive";
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reason?: string;
}

interface AttendanceLog {
  id: string;
  employeeName: string;
  checkInTime: string;
  checkOutTime?: string;
  isLate: boolean;
  overtime: number;
  date: string;
}

const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "Aisha Khan",
    email: "aisha@example.com",
    phone: "0300-1234567",
    role: "BEAUTICIAN",
    department: "Beauty Services",
    position: "Senior Beautician",
    salary: 80000,
    shiftStart: "09:00",
    shiftEnd: "17:00",
    joinDate: "2023-01-15",
    status: "active",
  },
  {
    id: "2",
    name: "Fatima Ali",
    email: "fatima@example.com",
    phone: "0301-2345678",
    role: "STAFF",
    department: "Gym",
    position: "Fitness Trainer",
    salary: 70000,
    shiftStart: "08:00",
    shiftEnd: "16:00",
    joinDate: "2023-03-20",
    status: "active",
  },
];

const mockLeaves: LeaveRequest[] = [
  {
    id: "1",
    employeeId: "1",
    employeeName: "Aisha Khan",
    leaveType: "SICK",
    startDate: "2024-01-25",
    endDate: "2024-01-26",
    status: "PENDING",
    reason: "Medical appointment",
  },
];

const mockAttendance: AttendanceLog[] = [
  {
    id: "1",
    employeeName: "Aisha Khan",
    checkInTime: "09:15",
    checkOutTime: "17:30",
    isLate: true,
    overtime: 30,
    date: "2024-01-24",
  },
];

export default function EmployeeManagementPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(mockLeaves);
  const [attendance, setAttendance] = useState<AttendanceLog[]>(mockAttendance);
  const [activeTab, setActiveTab] = useState<
    "employees" | "leaves" | "attendance"
  >("employees");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Employee>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter employees by search
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Add/Edit employee
  const handleSaveEmployee = () => {
    if (editingId) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingId ? { ...emp, ...formData } : emp,
        ),
      );
      setEditingId(null);
    } else {
      const newEmployee: Employee = {
        id: Math.random().toString(),
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone,
        role: formData.role || "STAFF",
        department: formData.department,
        position: formData.position,
        salary: formData.salary,
        shiftStart: formData.shiftStart,
        shiftEnd: formData.shiftEnd,
        joinDate: formData.joinDate || new Date().toISOString().split("T")[0],
        status: "active",
      };
      setEmployees([...employees, newEmployee]);
    }
    setFormData({});
    setIsModalOpen(false);
  };

  // Delete employee
  const handleDeleteEmployee = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  // Approve leave
  const handleApproveLeave = (leaveId: string) => {
    setLeaves(
      leaves.map((leave) =>
        leave.id === leaveId
          ? { ...leave, status: "APPROVED" as const }
          : leave,
      ),
    );
  };

  // Employees Tab
  const EmployeesTab = () => (
    <div className="space-y-6">
      <div className="flex gap-3 flex-col sm:flex-row">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent text-gray-900"
          />
        </div>
        <Button
          onClick={() => {
            setFormData({});
            setEditingId(null);
            setIsModalOpen(true);
          }}
          style={{
            backgroundColor: "#392d22",
            color: "white",
          }}
          className="hover:opacity-90 transition-opacity font-medium px-5 py-2.5 shadow-md whitespace-nowrap"
        >
          <Plus size={18} className="inline mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Name
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Email
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Position
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Department
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Salary
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <motion.tr
                  key={emp.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    {emp.name}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {emp.email}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {emp.position || "-"}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {emp.department || "-"}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    Rs {emp.salary?.toLocaleString() || "-"}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setFormData(emp);
                          setEditingId(emp.id);
                          setIsModalOpen(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(emp.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Leaves Tab
  const LeavesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200 shadow-sm">
          <div className="text-3xl font-bold text-gray-900">
            {leaves.length}
          </div>
          <div className="text-sm font-medium text-gray-700 mt-1">
            Total Leave Requests
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-200 shadow-sm">
          <div className="text-3xl font-bold text-gray-900">
            {leaves.filter((l) => l.status === "PENDING").length}
          </div>
          <div className="text-sm font-medium text-gray-700 mt-1">Pending</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 shadow-sm">
          <div className="text-3xl font-bold text-gray-900">
            {leaves.filter((l) => l.status === "APPROVED").length}
          </div>
          <div className="text-sm font-medium text-gray-700 mt-1">Approved</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Employee
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Type
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Dates
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Status
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    {leave.employeeName}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {leave.leaveType}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {leave.startDate} to {leave.endDate}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        leave.status === "APPROVED"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : leave.status === "REJECTED"
                            ? "bg-red-100 text-red-800 border border-red-200"
                            : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {leave.status === "PENDING" && (
                      <button
                        onClick={() => handleApproveLeave(leave.id)}
                        className="px-3 py-1.5 text-sm font-semibold text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Attendance Tab
  const AttendanceTab = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Employee
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Date
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Check In
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Check Out
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Status
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Overtime (min)
                </th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    {log.employeeName}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {log.date}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {log.checkInTime}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {log.checkOutTime || "-"}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        log.isLate
                          ? "bg-red-100 text-red-800 border border-red-200"
                          : "bg-green-100 text-green-800 border border-green-200"
                      }`}
                    >
                      {log.isLate ? "Late" : "On Time"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    {log.overtime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">Employees</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Employee Management
            </h1>
            <p className="text-sm text-gray-600">
              Manage employees, leaves, and attendance records
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 sm:gap-4 border-b-2 border-gray-200 overflow-x-auto">
        {(["employees", "leaves", "attendance"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 sm:px-6 py-3 font-semibold capitalize border-b-2 transition whitespace-nowrap ${
              activeTab === tab
                ? "border-[#392d22] text-[#392d22]"
                : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "employees" && <EmployeesTab />}
      {activeTab === "leaves" && <LeavesTab />}
      {activeTab === "attendance" && <AttendanceTab />}

      {/* Employee Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setFormData({});
          setEditingId(null);
        }}
        title={editingId ? "Edit Employee" : "Add Employee"}
        footer={
          <div className="flex gap-3 w-full">
            <Button
              onClick={() => {
                setIsModalOpen(false);
                setFormData({});
                setEditingId(null);
              }}
              style={{
                backgroundColor: "white",
                color: "#392d22",
                border: "2px solid #392d22",
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEmployee}
              style={{
                backgroundColor: "#392d22",
                color: "white",
              }}
              className="flex-1"
            >
              {editingId ? "Update" : "Save"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Phone"
              type="text"
              placeholder="0300-1234567"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <Input
              label="Department"
              type="text"
              placeholder="e.g., Beauty Services"
              value={formData.department || ""}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Position"
              type="text"
              placeholder="e.g., Senior Beautician"
              value={formData.position || ""}
              onChange={(e) =>
                setFormData({ ...formData, position: e.target.value })
              }
            />
            <Input
              label="Salary (Rs)"
              type="number"
              placeholder="50000"
              value={formData.salary || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  salary: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Role
            </label>
            <select
              value={formData.role || "STAFF"}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent text-gray-900"
            >
              <option value="TRAINER">Trainer</option>
              <option value="BEAUTICIAN">Beautician</option>
              <option value="STAFF">Staff</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Shift Start
              </label>
              <input
                type="time"
                value={formData.shiftStart || ""}
                onChange={(e) =>
                  setFormData({ ...formData, shiftStart: e.target.value })
                }
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Shift End
              </label>
              <input
                type="time"
                value={formData.shiftEnd || ""}
                onChange={(e) =>
                  setFormData({ ...formData, shiftEnd: e.target.value })
                }
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent text-gray-900"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

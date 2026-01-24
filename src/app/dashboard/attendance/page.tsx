"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Calendar, Clock, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface AttendanceRecord {
  id: string;
  employeeName: string;
  employeeRole: string;
  checkInTime: string;
  checkOutTime?: string;
  date: string;
  status: "present" | "late" | "absent" | "active";
  hoursWorked?: number;
}

// Dummy Data - 20 records
const mockAttendanceData: AttendanceRecord[] = [
  {
    id: "1",
    employeeName: "Aisha Khan",
    employeeRole: "Senior Beautician",
    checkInTime: "09:00 AM",
    checkOutTime: "05:00 PM",
    date: "2024-01-24",
    status: "present",
    hoursWorked: 8,
  },
  {
    id: "2",
    employeeName: "Fatima Ali",
    employeeRole: "Fitness Trainer",
    checkInTime: "08:30 AM",
    checkOutTime: "04:30 PM",
    date: "2024-01-24",
    status: "present",
    hoursWorked: 8,
  },
  {
    id: "3",
    employeeName: "Sara Ahmed",
    employeeRole: "Receptionist",
    checkInTime: "09:15 AM",
    checkOutTime: "05:15 PM",
    date: "2024-01-24",
    status: "late",
    hoursWorked: 8,
  },
  {
    id: "4",
    employeeName: "Hina Malik",
    employeeRole: "Beautician",
    checkInTime: "09:00 AM",
    date: "2024-01-25",
    status: "active",
  },
  {
    id: "5",
    employeeName: "Zainab Hassan",
    employeeRole: "Fitness Trainer",
    checkInTime: "08:00 AM",
    date: "2024-01-25",
    status: "active",
  },
  {
    id: "6",
    employeeName: "Ayesha Tariq",
    employeeRole: "Manager",
    checkInTime: "08:30 AM",
    checkOutTime: "05:00 PM",
    date: "2024-01-23",
    status: "present",
    hoursWorked: 8.5,
  },
  {
    id: "7",
    employeeName: "Maria Siddiqui",
    employeeRole: "Beautician",
    checkInTime: "09:20 AM",
    checkOutTime: "05:20 PM",
    date: "2024-01-23",
    status: "late",
    hoursWorked: 8,
  },
  {
    id: "8",
    employeeName: "Kiran Nadeem",
    employeeRole: "Fitness Trainer",
    checkInTime: "07:45 AM",
    checkOutTime: "04:00 PM",
    date: "2024-01-23",
    status: "present",
    hoursWorked: 8.25,
  },
  {
    id: "9",
    employeeName: "Nida Riaz",
    employeeRole: "Receptionist",
    checkInTime: "09:00 AM",
    checkOutTime: "05:00 PM",
    date: "2024-01-22",
    status: "present",
    hoursWorked: 8,
  },
  {
    id: "10",
    employeeName: "Sana Iqbal",
    employeeRole: "Beautician",
    checkInTime: "09:30 AM",
    checkOutTime: "05:30 PM",
    date: "2024-01-22",
    status: "late",
    hoursWorked: 8,
  },
  {
    id: "11",
    employeeName: "Rabia Khan",
    employeeRole: "Fitness Trainer",
    checkInTime: "08:15 AM",
    checkOutTime: "04:45 PM",
    date: "2024-01-22",
    status: "present",
    hoursWorked: 8.5,
  },
  {
    id: "12",
    employeeName: "Uzma Zaidi",
    employeeRole: "Senior Beautician",
    checkInTime: "09:00 AM",
    checkOutTime: "05:00 PM",
    date: "2024-01-21",
    status: "present",
    hoursWorked: 8,
  },
  {
    id: "13",
    employeeName: "Amna Rashid",
    employeeRole: "Manager",
    checkInTime: "08:30 AM",
    checkOutTime: "05:30 PM",
    date: "2024-01-21",
    status: "present",
    hoursWorked: 9,
  },
  {
    id: "14",
    employeeName: "Bushra Noor",
    employeeRole: "Beautician",
    checkInTime: "09:25 AM",
    checkOutTime: "05:25 PM",
    date: "2024-01-21",
    status: "late",
    hoursWorked: 8,
  },
  {
    id: "15",
    employeeName: "Sadaf Ali",
    employeeRole: "Fitness Trainer",
    checkInTime: "08:00 AM",
    checkOutTime: "04:30 PM",
    date: "2024-01-20",
    status: "present",
    hoursWorked: 8.5,
  },
  {
    id: "16",
    employeeName: "Mehwish Baig",
    employeeRole: "Receptionist",
    checkInTime: "09:00 AM",
    checkOutTime: "05:00 PM",
    date: "2024-01-20",
    status: "present",
    hoursWorked: 8,
  },
  {
    id: "17",
    employeeName: "Farida Qureshi",
    employeeRole: "Beautician",
    checkInTime: "09:10 AM",
    checkOutTime: "05:10 PM",
    date: "2024-01-20",
    status: "late",
    hoursWorked: 8,
  },
  {
    id: "18",
    employeeName: "Samina Mirza",
    employeeRole: "Senior Beautician",
    checkInTime: "08:45 AM",
    checkOutTime: "05:15 PM",
    date: "2024-01-19",
    status: "present",
    hoursWorked: 8.5,
  },
  {
    id: "19",
    employeeName: "Rubina Shah",
    employeeRole: "Fitness Trainer",
    checkInTime: "08:00 AM",
    checkOutTime: "04:00 PM",
    date: "2024-01-19",
    status: "present",
    hoursWorked: 8,
  },
  {
    id: "20",
    employeeName: "Nazia Ahmed",
    employeeRole: "Manager",
    checkInTime: "08:30 AM",
    checkOutTime: "05:30 PM",
    date: "2024-01-19",
    status: "present",
    hoursWorked: 9,
  },
];

export default function AttendancePage() {
  const [attendanceRecords, setAttendanceRecords] =
    useState<AttendanceRecord[]>(mockAttendanceData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // Calculate stats
  const stats = {
    totalPresent: attendanceRecords.filter(
      (r) => r.status === "present" || r.status === "late",
    ).length,
    activeNow: attendanceRecords.filter((r) => r.status === "active").length,
    lateToday: attendanceRecords.filter((r) => r.status === "late").length,
    avgHours: (
      attendanceRecords.reduce((sum, r) => sum + (r.hoursWorked || 0), 0) /
      attendanceRecords.filter((r) => r.hoursWorked).length
    ).toFixed(1),
  };

  // Get unique roles for filter
  const uniqueRoles = Array.from(
    new Set(attendanceRecords.map((r) => r.employeeRole)),
  );

  // Filter records
  const filteredRecords = attendanceRecords.filter((record) => {
    const matchesSearch =
      !searchTerm ||
      record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.employeeRole.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = !selectedDate || record.date === selectedDate;
    const matchesStatus = !selectedStatus || record.status === selectedStatus;
    const matchesRole = !selectedRole || record.employeeRole === selectedRole;

    return matchesSearch && matchesDate && matchesStatus && matchesRole;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDate("");
    setSelectedStatus("");
    setSelectedRole("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">Attendance</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              Employee Attendance
            </h1>
            <p className="text-sm text-gray-600">
              Monitor and manage staff attendance records
            </p>
          </div>
          <Button
            style={{
              backgroundColor: "#392d22",
              color: "white",
            }}
            className="hover:opacity-90 transition-opacity font-medium px-5 py-2.5 shadow-md whitespace-nowrap"
          >
            <Download size={18} className="inline mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {stats.totalPresent}
              </div>
              <div className="text-sm font-medium text-gray-700 mt-1">
                Total Present
              </div>
            </div>
            <Clock className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {stats.activeNow}
              </div>
              <div className="text-sm font-medium text-gray-700 mt-1">
                Currently Active
              </div>
            </div>
            <Calendar className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-2 border-red-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {stats.lateToday}
              </div>
              <div className="text-sm font-medium text-gray-700 mt-1">
                Late Arrivals
              </div>
            </div>
            <Filter className="text-red-600" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {stats.avgHours}h
              </div>
              <div className="text-sm font-medium text-gray-700 mt-1">
                Avg Hours
              </div>
            </div>
            <Clock className="text-purple-600" size={32} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="text-gray-600" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search employee..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent text-gray-900"
            />
          </div>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent text-gray-900"
          />

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent text-gray-900"
          >
            <option value="">All Status</option>
            <option value="present">Present</option>
            <option value="late">Late</option>
            <option value="active">Active</option>
            <option value="absent">Absent</option>
          </select>

          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent text-gray-900"
          >
            <option value="">All Roles</option>
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>

          <Button
            onClick={clearFilters}
            style={{
              backgroundColor: "white",
              color: "#392d22",
              border: "2px solid #392d22",
            }}
            className="hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Employee
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Role
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
                  Hours
                </th>
                <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <motion.tr
                  key={record.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    {record.employeeName}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {record.employeeRole}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {record.date}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {record.checkInTime}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-700">
                    {record.checkOutTime || "-"}
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    {record.hoursWorked ? `${record.hoursWorked}h` : "-"}
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                        record.status === "present"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : record.status === "late"
                            ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            : record.status === "active"
                              ? "bg-blue-100 text-blue-800 border border-blue-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {record.status.toUpperCase()}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Clock size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No attendance records found</p>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <p className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {filteredRecords.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {attendanceRecords.length}
          </span>{" "}
          records
        </p>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit2, Search, Filter, Download, Clock, Calendar, User, Mail, Phone } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  position?: string;
  salary?: number;
  joinDate: string;
  status: 'active' | 'inactive';
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
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
    id: '1',
    name: 'Aisha Khan',
    email: 'aisha@example.com',
    phone: '0300-1234567',
    department: 'Beauty Services',
    position: 'Senior Beautician',
    salary: 80000,
    joinDate: '2023-01-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Fatima Ali',
    email: 'fatima@example.com',
    phone: '0301-2345678',
    department: 'Gym',
    position: 'Fitness Trainer',
    salary: 70000,
    joinDate: '2023-03-20',
    status: 'active',
  },
];

const mockLeaves: LeaveRequest[] = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'Aisha Khan',
    leaveType: 'SICK',
    startDate: '2024-01-25',
    endDate: '2024-01-26',
    status: 'PENDING',
    reason: 'Medical appointment',
  },
];

const mockAttendance: AttendanceLog[] = [
  {
    id: '1',
    employeeName: 'Aisha Khan',
    checkInTime: '09:15',
    checkOutTime: '17:30',
    isLate: true,
    overtime: 30,
    date: '2024-01-24',
  },
];

export default function EmployeeManagementPage() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(mockLeaves);
  const [attendance, setAttendance] = useState<AttendanceLog[]>(mockAttendance);
  const [activeTab, setActiveTab] = useState<'employees' | 'leaves' | 'attendance'>('employees');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Employee>>({});
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter employees by search
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add/Edit employee
  const handleSaveEmployee = () => {
    if (editingId) {
      setEmployees(employees.map((emp) => (emp.id === editingId ? { ...emp, ...formData } : emp)));
      setEditingId(null);
    } else {
      const newEmployee: Employee = {
        id: Math.random().toString(),
        name: formData.name || '',
        email: formData.email || '',
        phone: formData.phone,
        department: formData.department,
        position: formData.position,
        salary: formData.salary,
        joinDate: formData.joinDate || new Date().toISOString().split('T')[0],
        status: 'active',
      };
      setEmployees([...employees, newEmployee]);
    }
    setFormData({});
    setIsModalOpen(false);
  };

  // Delete employee
  const handleDeleteEmployee = (id: string) => {
    if (confirm('Are you sure?')) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

  // Approve leave
  const handleApproveLeave = (leaveId: string) => {
    setLeaves(
      leaves.map((leave) => (leave.id === leaveId ? { ...leave, status: 'APPROVED' } : leave))
    );
  };

  // Employees Tab
  const EmployeesTab = () => (
    <div className="space-y-4">
      <div className="flex gap-3 flex-col md:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search employees..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
        </div>
        <button
          onClick={() => {
            setFormData({});
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-purple-700"
        >
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Position</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Salary</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <motion.tr
                  key={emp.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm text-gray-800 font-medium">{emp.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{emp.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{emp.position || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{emp.department || '-'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">Rs {emp.salary || '-'}</td>
                  <td className="px-4 py-3 text-sm flex gap-2">
                    <button
                      onClick={() => {
                        setFormData(emp);
                        setEditingId(emp.id);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteEmployee(emp.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
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
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {[
          { label: 'Total Leave Requests', value: leaves.length, color: 'purple' },
          { label: 'Pending', value: leaves.filter((l) => l.status === 'PENDING').length, color: 'yellow' },
          { label: 'Approved', value: leaves.filter((l) => l.status === 'APPROVED').length, color: 'green' },
        ].map((card) => (
          <div
            key={card.label}
            className={`bg-gradient-to-br from-${card.color}-50 to-${card.color}-100 p-4 rounded-lg border border-${card.color}-200`}
          >
            <div className="text-3xl font-bold text-gray-800">{card.value}</div>
            <div className="text-sm text-gray-600">{card.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Employee</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Dates</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{leave.employeeName}</td>
                  <td className="px-4 py-3 text-sm">{leave.leaveType}</td>
                  <td className="px-4 py-3 text-sm">
                    {leave.startDate} to {leave.endDate}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        leave.status === 'APPROVED'
                          ? 'bg-green-100 text-green-800'
                          : leave.status === 'REJECTED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {leave.status === 'PENDING' && (
                      <button
                        onClick={() => handleApproveLeave(leave.id)}
                        className="text-green-600 hover:text-green-800 font-semibold"
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
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Employee</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Check In</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Check Out</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Overtime (min)</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((log) => (
                <tr key={log.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium">{log.employeeName}</td>
                  <td className="px-4 py-3 text-sm">{log.date}</td>
                  <td className="px-4 py-3 text-sm">{log.checkInTime}</td>
                  <td className="px-4 py-3 text-sm">{log.checkOutTime || '-'}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        log.isLate ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {log.isLate ? 'Late' : 'On Time'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{log.overtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Employee Management</h1>
          <p className="text-gray-600">Manage employees, leaves, and attendance records</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {(['employees', 'leaves', 'attendance'] as const).map((tab) => (
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
        {activeTab === 'employees' && <EmployeesTab />}
        {activeTab === 'leaves' && <LeavesTab />}
        {activeTab === 'attendance' && <AttendanceTab />}

        {/* Employee Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingId ? 'Edit Employee' : 'Add Employee'}>
          <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {editingId ? 'Edit Employee' : 'Add Employee'}
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Department"
              value={formData.department || ''}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Position"
              value={formData.position || ''}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            <input
              type="number"
              placeholder="Salary"
              value={formData.salary || ''}
              onChange={(e) => setFormData({ ...formData, salary: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEmployee}
                className="flex-1 bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { DataTable } from '@/components/tables/DataTable';
import { staffService } from '@/services/staff.service';
import { userService } from '@/services/user.service';
import { mockAttendanceRecords, mockUsers } from '@/utils/mockData';
import { Calendar, Clock, UserCheck, Search, Filter } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  user_id: string;
  check_in_time: string;
  check_out_time?: string;
  location_lat?: number;
  location_lng?: number;
  created_at: string;
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

export default function AttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [stats, setStats] = useState({
    totalCheckIns: 0,
    activeNow: 0,
    completedToday: 0,
    totalHours: 0,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load all users (staff)
      const usersData = await userService.getAllUsers();
      const staffUsers = usersData.filter((user: any) =>
        user.role === 'trainer' || user.role === 'beautician'
      );
      setUsers(staffUsers);

      // Load all attendance records from mock data
      const attendanceData = mockAttendanceRecords;
      setAttendanceRecords(attendanceData);

      // Calculate stats
      calculateStats(attendanceData);

    } catch (error) {
      console.error('Error loading attendance data:', error);
    } finally {
      setLoading(false);
    }
  };



  const calculateStats = (records: AttendanceRecord[]) => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecords = records.filter(record =>
      record.check_in_time.startsWith(today)
    );

    const totalCheckIns = todayRecords.length;
    const activeNow = todayRecords.filter(record => !record.check_out_time).length;
    const completedToday = todayRecords.filter(record => record.check_out_time).length;

    // Calculate total hours for completed shifts today
    const totalHours = todayRecords
      .filter(record => record.check_out_time)
      .reduce((sum, record) => {
        const checkIn = new Date(record.check_in_time);
        const checkOut = new Date(record.check_out_time!);
        const hours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
        return sum + hours;
      }, 0);

    setStats({
      totalCheckIns,
      activeNow,
      completedToday,
      totalHours: Math.round(totalHours * 100) / 100,
    });
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = !searchTerm ||
      (record.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (record.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesUser = !selectedUser || record.user_id === selectedUser;

    const matchesDate = !selectedDate ||
      record.check_in_time.startsWith(selectedDate);

    return matchesSearch && matchesUser && matchesDate;
  });

  const columns = [
    {
      key: 'id' as keyof AttendanceRecord,
      label: 'Employee',
      render: (value: any, record: AttendanceRecord) => (
        <div>
          <div className="font-medium text-gray-900">
            {record.user?.name || 'Unknown'}
          </div>
          <div className="text-sm text-gray-500">
            {record.user?.email}
          </div>
          <Badge
            label={record.user?.role || 'staff'}
            variant={record.user?.role === 'trainer' ? 'info' : 'success'}
          />
        </div>
      ),
    },
    {
      key: 'check_in_time' as keyof AttendanceRecord,
      label: 'Check In',
      render: (value: any, record: AttendanceRecord) => (
        <div className="text-sm">
          <div className="font-medium">
            {new Date(record.check_in_time).toLocaleDateString()}
          </div>
          <div className="text-gray-500">
            {new Date(record.check_in_time).toLocaleTimeString()}
          </div>
        </div>
      ),
    },
    {
      key: 'check_out_time' as keyof AttendanceRecord,
      label: 'Check Out',
      render: (value: any, record: AttendanceRecord) => (
        record.check_out_time ? (
          <div className="text-sm">
            <div className="font-medium">
              {new Date(record.check_out_time).toLocaleDateString()}
            </div>
            <div className="text-gray-500">
              {new Date(record.check_out_time).toLocaleTimeString()}
            </div>
          </div>
        ) : (
          <Badge label="Active" variant="info" />
        )
      ),
    },
    {
      key: 'created_at' as keyof AttendanceRecord,
      label: 'Duration',
      render: (value: any, record: AttendanceRecord) => {
        if (!record.check_out_time) {
          const checkIn = new Date(record.check_in_time);
          const now = new Date();
          const hours = (now.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
          return (
            <div className="text-sm">
              <span className="font-medium text-blue-600">
                {Math.round(hours * 100) / 100}h
              </span>
              <div className="text-gray-500">Active</div>
            </div>
          );
        }

        const checkIn = new Date(record.check_in_time);
        const checkOut = new Date(record.check_out_time);
        const hours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);

        return (
          <div className="text-sm">
            <span className="font-medium">
              {Math.round(hours * 100) / 100}h
            </span>
          </div>
        );
      },
    },
    {
      key: 'user_id' as keyof AttendanceRecord,
      label: 'Status',
      render: (value: any, record: AttendanceRecord) => (
        <Badge
          label={record.check_out_time ? 'Completed' : 'Active'}
          variant={record.check_out_time ? 'success' : 'info'}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Employee Attendance
          </h1>
          <p className="text-gray-700">
            Monitor and manage staff attendance records
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader title="Today's Check-ins" />
          <CardBody>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stats.totalCheckIns}
              </div>
              <p className="text-gray-600">Total check-ins today</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Currently Active" />
          <CardBody>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats.activeNow}
              </div>
              <p className="text-gray-600">Staff working now</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Completed Today" />
          <CardBody>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {stats.completedToday}
              </div>
              <p className="text-gray-600">Shifts completed</p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Total Hours Today" />
          <CardBody>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {stats.totalHours}h
              </div>
              <p className="text-gray-600">Hours worked today</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader title="Filters" />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              options={[
                { value: '', label: 'All Employees' },
                ...users.map((user: any) => ({
                  value: user.id,
                  label: `${user.name} (${user.role})`,
                })),
              ]}
            />

            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              placeholder="Select date"
            />

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedUser('');
                setSelectedDate('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader title="Attendance Records" />
        <CardBody>
          <DataTable
            columns={columns}
            data={filteredRecords}
            loading={loading}
          />
        </CardBody>
      </Card>
    </div>
  );
}

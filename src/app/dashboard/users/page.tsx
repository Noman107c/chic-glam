'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/utils/mockData';
import { formatDate } from '@/utils';

const MOCK_USERS: User[] = [
  ...mockUsers,
  {
    id: '3',
    name: 'Hassan Ali',
    firstName: 'Hassan',
    lastName: 'Ali',
    email: 'hassan@example.com',
    phone: '+92 300 2345678',
    role: 'SALON_MANAGER' as any,
    branchId: '1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Sara Khan',
    firstName: 'Sara',
    lastName: 'Khan',
    email: 'sara@example.com',
    phone: '+92 300 3456789',
    role: 'BEAUTICIAN' as any,
    branchId: '1',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Ali Raza',
    firstName: 'Ali',
    lastName: 'Raza',
    email: 'ali@example.com',
    phone: '+92 300 4567890',
    role: 'TRAINER' as any,
    branchId: '2',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
}

export default function UsersPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [form, setForm] = useState<UserForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'CUSTOMER' as UserRole,
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      (user.firstName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.lastName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const columns: Column<User>[] = [
    {
      key: 'firstName',
      label: 'Name',
      render: (_, user) => `${user.firstName || ''} ${user.lastName || ''}`.trim(),
    },
    {
      key: 'email',
      label: 'Email',
    },
    {
      key: 'phone',
      label: 'Phone',
    },
    {
      key: 'role',
      label: 'Role',
      render: (value: UserRole) => (
        <Badge label={value.replace(/_/g, ' ')} variant="info" size="sm" />
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (value: boolean) => (
        <Badge
          label={value ? 'Active' : 'Inactive'}
          variant={value ? 'success' : 'danger'}
          size="sm"
        />
      ),
    },
    {
      key: 'createdAt',
      label: 'Joined',
      render: (value: Date) => formatDate(value),
    },
  ];

  const handleCreateUser = () => {
    setSelectedUser(null);
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'CUSTOMER' as UserRole,
    });
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email,
      phone: user.phone || '',
      role: user.role as UserRole,
    });
    setIsModalOpen(true);
  };

  const handleSaveUser = () => {
    if (selectedUser) {
      // Update existing user
      setUsers(
        users.map(u =>
          u.id === selectedUser.id
            ? {
                ...u,
                ...form,
                updatedAt: new Date(),
              }
            : u
        )
      );
    } else {
      // Create new user
      setUsers([
        ...users,
        {
          id: String(users.length + 1),
          name: `${form.firstName} ${form.lastName}`,
          ...form,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteUser = (user: User) => {
    setUsers(users.filter(u => u.id !== user.id));
  };

  const handleToggleStatus = (user: User) => {
    setUsers(
      users.map(u =>
        u.id === user.id ? { ...u, isActive: !u.isActive, updatedAt: new Date() } : u
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900  mb-2">Users</h1>
          <p className="text-gray-600 ">Manage system users and permissions</p>
        </div>
        <Button variant="primary" onClick={handleCreateUser}>
          + Add User
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
        <Input
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          options={[
            { value: '', label: 'All Roles' },
            { value: 'SUPER_ADMIN', label: 'Super Admin' },
            { value: 'SALON_MANAGER', label: 'Salon Manager' },
            { value: 'GYM_MANAGER', label: 'Gym Manager' },
            { value: 'TRAINER', label: 'Trainer' },
            { value: 'BEAUTICIAN', label: 'Beautician' },
            { value: 'RECEPTIONIST', label: 'Receptionist' },
            { value: 'ACCOUNTANT', label: 'Accountant' },
            { value: 'CUSTOMER', label: 'Customer' },
          ]}
        />
        <div className="text-sm text-white flex items-center">
          {filteredUsers.length} users
        </div>
      </div>

      {/* Users Table */}
      <DataTable
        columns={columns}
        data={filteredUsers}
        title="All Users"
        actions={[
          {
            label: 'Edit',
            onClick: handleEditUser,
            variant: 'secondary',
          },
          {
            label: 'Delete',
            onClick: handleDeleteUser,
            variant: 'danger',
          },
        ]}
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        title={selectedUser ? 'Edit User' : 'Create New User'}
        onClose={() => setIsModalOpen(false)}
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveUser}
              disabled={!form.firstName || !form.email}
            >
              {selectedUser ? 'Update User' : 'Create User'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="First Name"
            value={form.firstName}
            onChange={e => setForm(prev => ({ ...prev, firstName: e.target.value }))}
            placeholder="John"
          />

          <Input
            label="Last Name"
            value={form.lastName}
            onChange={e => setForm(prev => ({ ...prev, lastName: e.target.value }))}
            placeholder="Doe"
          />

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            placeholder="john@example.com"
          />

          <Input
            label="Phone"
            value={form.phone}
            onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="+92 300 1234567"
          />

          <Select
            label="Role"
            value={form.role}
            onChange={e => setForm(prev => ({ ...prev, role: e.target.value as UserRole }))}
            options={[
              { value: 'SUPER_ADMIN', label: 'Super Admin' },
              { value: 'BRANCH_ADMIN', label: 'Branch Admin' },
              { value: 'SALON_MANAGER', label: 'Salon Manager' },
              { value: 'GYM_MANAGER', label: 'Gym Manager' },
              { value: 'TRAINER', label: 'Trainer' },
              { value: 'BEAUTICIAN', label: 'Beautician' },
              { value: 'RECEPTIONIST', label: 'Receptionist' },
              { value: 'ACCOUNTANT', label: 'Accountant' },
              { value: 'CUSTOMER', label: 'Customer' },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
}

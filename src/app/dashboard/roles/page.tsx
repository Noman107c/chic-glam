 'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Role, Permission, PERMISSION_LIST } from '@/types';

const MOCK_ROLES: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Full system access',
    permissions: PERMISSION_LIST.map(p => p.name),
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: '2',
    name: 'Branch Admin',
    description: 'Manage branch operations',
    permissions: ['user.read', 'user.update', 'finance.read'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
  {
    id: '3',
    name: 'Salon Manager',
    description: 'Manage salon operations',
    permissions: ['user.read', 'finance.read'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  },
];

interface RoleForm {
  name: string;
  description: string;
  permissions: string[];
}

export default function RolesPage() {
  const [roles, setRoles] = useState(MOCK_ROLES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [form, setForm] = useState<RoleForm>({
    name: '',
    description: '',
    permissions: [],
  });

  const columns: Column<Role>[] = [
    {
      key: 'name',
      label: 'Role Name',
      sortable: true,
    },
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'permissions',
      label: 'Permissions Count',
      render: (value: string[]) => (
        <Badge label={`${value.length} permissions`} variant="info" />
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (value: boolean) => (
        <Badge
          label={value ? 'Active' : 'Inactive'}
          variant={value ? 'success' : 'danger'}
        />
      ),
    },
  ];

  const handleCreateRole = () => {
    setSelectedRole(null);
    setForm({
      name: '',
      description: '',
      permissions: [],
    });
    setIsModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setForm({
      name: role.name,
      description: role.description || '',
      permissions: role.permissions,
    });
    setIsModalOpen(true);
  };

  const handleSaveRole = () => {
    if (selectedRole) {
      // Update existing role
      setRoles(
        roles.map(r =>
          r.id === selectedRole.id
            ? {
                ...r,
                name: form.name,
                description: form.description,
                permissions: form.permissions,
                updatedAt: new Date(),
              }
            : r
        )
      );
    } else {
      // Create new role
      setRoles([
        ...roles,
        {
          id: String(roles.length + 1),
          name: form.name,
          description: form.description,
          permissions: form.permissions,
          createdAt: new Date(),
          updatedAt: new Date(),
          isActive: true,
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteRole = (role: Role) => {
    setRoles(roles.filter(r => r.id !== role.id));
  };

  const handlePermissionToggle = (permission: string) => {
    setForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission],
    }));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Roles & Permissions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage system roles and permissions</p>
        </div>
        <Button variant="primary" onClick={handleCreateRole}>
          + Create Role
        </Button>
      </div>

      {/* Roles Table */}
      <DataTable
        columns={columns}
        data={roles}
        title="System Roles"
        actions={[
          {
            label: 'Edit',
            onClick: handleEditRole,
            variant: 'secondary',
          },
          {
            label: 'Delete',
            onClick: handleDeleteRole,
            variant: 'danger',
          },
        ]}
      />

      {/* Permissions Reference */}
      <Card>
        <CardHeader title="Available Permissions" subtitle="Complete list of system permissions" />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERMISSION_LIST.map(permission => (
              <div
                key={permission.id}
                className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
              >
                <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                  {permission.name}
                </code>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        title={selectedRole ? 'Edit Role' : 'Create New Role'}
        onClose={() => setIsModalOpen(false)}
        size="lg"
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveRole}
              disabled={!form.name || form.permissions.length === 0}
            >
              {selectedRole ? 'Update Role' : 'Create Role'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Role Name"
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Gym Manager"
          />

          <Input
            label="Description"
            value={form.description}
            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the role's purpose"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Permissions ({form.permissions.length} selected)
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
              {PERMISSION_LIST.map(permission => (
                <label key={permission.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.permissions.includes(permission.name)}
                    onChange={() => handlePermissionToggle(permission.name)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{permission.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

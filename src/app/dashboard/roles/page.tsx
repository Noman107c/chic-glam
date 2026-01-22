 'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Toast } from '@/components/ui/Toast';
import { Role, Permission, PERMISSION_LIST } from '@/types';

interface RoleForm {
  name: string;
  description: string;
  permissions: string[];
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [form, setForm] = useState<RoleForm>({
    name: '',
    description: '',
    permissions: [],
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Fetch roles from API on mount
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setPageLoading(true);
      const response = await fetch('/api/roles');
      if (!response.ok) throw new Error('Failed to fetch roles');
      const data = await response.json();
      setRoles(data.data || []);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setToast({ message: 'Failed to load roles', type: 'error' });
    } finally {
      setPageLoading(false);
    }
  }

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

  const handleSaveRole = async () => {
    if (!form.name || form.permissions.length === 0) {
      setToast({ message: 'Please fill in all required fields', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      const roleData = {
        name: form.name,
        description: form.description,
        permissions: form.permissions,
      };

      if (selectedRole) {
        // Update existing role
        const response = await fetch(`/api/roles/${selectedRole.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(roleData),
        });

        if (!response.ok) throw new Error('Failed to update role');
        const data = await response.json();
        
        setRoles(
          roles.map(r => (r.id === selectedRole.id ? data.data : r))
        );
        setToast({ message: 'Role updated successfully', type: 'success' });
      } else {
        // Create new role
        const response = await fetch('/api/roles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(roleData),
        });

        if (!response.ok) throw new Error('Failed to create role');
        const data = await response.json();
        setRoles([...roles, data.data]);
        setToast({ message: 'Role created successfully', type: 'success' });
      }

      setIsModalOpen(false);
      setForm({ name: '', description: '', permissions: [] });
      setSelectedRole(null);
    } catch (error) {
      console.error('Error saving role:', error);
      setToast({ message: error instanceof Error ? error.message : 'Failed to save role', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (role: Role) => {
    if (!confirm('Are you sure you want to delete this role?')) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/roles/${role.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete role');
      setRoles(roles.filter(r => r.id !== role.id));
      setToast({ message: 'Role deleted successfully', type: 'success' });
    } catch (error) {
      console.error('Error deleting role:', error);
      setToast({ message: error instanceof Error ? error.message : 'Failed to delete role', type: 'error' });
    } finally {
      setLoading(false);
    }
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
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {pageLoading ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-500">Loading roles...</div>
        </div>
      ) : (
        <>
          {/* Page Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Roles & Permissions
              </h1>
              <p className="text-gray-700">Manage system roles and permissions</p>
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
                  disabled={!form.name || form.permissions.length === 0 || loading}
                >
                  {loading ? '...' : selectedRole ? 'Update Role' : 'Create Role'}
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
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Permissions ({form.permissions.length} selected)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto p-3 bg-gray-50 rounded-lg border border-gray-200">
                  {PERMISSION_LIST.map(permission => (
                    <label key={permission.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.permissions.includes(permission.name)}
                        onChange={() => handlePermissionToggle(permission.name)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{permission.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}
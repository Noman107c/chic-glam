'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Select } from '@/components/ui/Select';
import { mockUsers } from '@/utils/mockData';


interface User {
  id: string;
  full_name: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    role: '',
    is_active: true,
  });
  const [roleFormData, setRoleFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser: User = {
        id: Date.now().toString(),
        full_name: formData.full_name,
        email: formData.email,
        is_active: formData.is_active,
        created_at: new Date().toISOString(),
      };
      setUsers([...users, newUser]);
      setFormData({ full_name: '', email: '', role: '', is_active: true });
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError('Failed to create user');
    }
  };

  useEffect(() => {
    // Use mock data directly
    setUsers(mockUsers.map(user => ({
      id: user.id,
      full_name: user.name,
      email: user.email,
      is_active: user.isActive,
      created_at: user.createdAt.toISOString(),
    })));
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-black mb-2">Users Management</h1>
        <div className="flex gap-2">
          <Button onClick={() => setShowRoleForm(true)}>
            Create Role
          </Button>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add User'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      <Modal
        isOpen={showForm}
        title="Create New User"
        onClose={() => setShowForm(false)}
        footer={
          <>
            <Button onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button type="submit" form="create-user-form">
              Create User
            </Button>
          </>
        }
      >
        <form id="create-user-form" onSubmit={handleCreateUser} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1 text-black">
              Full Name
            </label>
            <input
              type="text"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <Select
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'manager', label: 'Manager' },
              { value: 'trainer', label: 'Trainer' },
              { value: 'beautician', label: 'Beautician' },
              { value: 'receptionist', label: 'Receptionist' },
              { value: 'accountant', label: 'Accountant' },
            ]}
            required
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="is_active" className="ml-2 block text-sm text-black">
              Active
            </label>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showRoleForm}
        title="Create New Role"
        onClose={() => setShowRoleForm(false)}
        footer={
          <>
            <Button onClick={() => setShowRoleForm(false)}>
              Cancel
            </Button>
            <Button type="submit" form="create-role-form">
              Create Role
            </Button>
          </>
        }
      >
        <form id="create-role-form" className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Role Name
            </label>
            <input
              type="text"
              value={roleFormData.name}
              onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., supervisor, cleaner"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Description
            </label>
            <textarea
              value={roleFormData.description}
              onChange={(e) => setRoleFormData({ ...roleFormData, description: e.target.value })}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe the role responsibilities"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Permissions
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3">
              {[
                'users.create', 'users.read', 'users.update', 'users.delete',
                'roles.create', 'roles.read', 'roles.update', 'roles.delete',
                'attendance.create', 'attendance.read',
                'services.read', 'services.create',
                'booking.create', 'booking.read', 'booking.update',
                'payments.create', 'payments.read'
              ].map((permission) => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={roleFormData.permissions.includes(permission)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRoleFormData({
                          ...roleFormData,
                          permissions: [...roleFormData.permissions, permission]
                        });
                      } else {
                        setRoleFormData({
                          ...roleFormData,
                          permissions: roleFormData.permissions.filter(p => p !== permission)
                        });
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-black">{permission}</span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </Modal>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-black">{user.full_name}</h3>
                <p className="text-black">{user.email}</p>
                <p className="text-sm text-black">
                  Created: {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded text-sm font-semibold ${
                user.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-black'
              }`}>
                {user.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {users.length === 0 && !loading && (
        <Card className="text-center py-8 text-black">
          No users found
        </Card>
      )}
    </div>
  );
}

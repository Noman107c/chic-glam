'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Loader } from '@/components/ui/Loader';
import { Button } from '@/components/ui/Button';

interface Role {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/roles');
      if (!response.ok) throw new Error('Failed to fetch roles');
      const data = await response.json();
      setRoles(data.data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching roles');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create role');
      await fetchRoles();
      setFormData({ name: '', description: '' });
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating role');
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Roles Management</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Role'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <Card>
          <form onSubmit={handleCreateRole} className="space-y-4">
            <input
              type="text"
              placeholder="Role Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows={3}
            />
            <Button type="submit">Create Role</Button>
          </form>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id}>
            <h3 className="font-bold text-lg mb-2 capitalize">{role.name}</h3>
            {role.description && (
              <p className="text-gray-600 text-sm mb-3">{role.description}</p>
            )}
            <p className="text-xs text-gray-500">
              Created: {new Date(role.created_at).toLocaleDateString()}
            </p>
          </Card>
        ))}
      </div>

      {roles.length === 0 && !loading && (
        <Card className="text-center py-8 text-gray-500">
          No roles found
        </Card>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Loader } from "@/components/ui/Loader";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { mockUsers } from "@/utils/mockData";

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
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    is_active: true,
  });
  const [roleFormData, setRoleFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setCreating(true);

    try {
      // Create user in database
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          is_active: formData.is_active,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }

      const newUser = await response.json();

      // Add to local state
      setUsers([
        ...users,
        {
          id: newUser.id,
          full_name: newUser.full_name,
          email: newUser.email,
          is_active: newUser.is_active,
          created_at: newUser.created_at,
        },
      ]);

      // Reset form
      setFormData({
        full_name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        is_active: true,
      });
      setShowForm(false);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to create user");
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    // Use mock data directly
    setUsers(
      mockUsers.map((user) => ({
        id: user.id,
        full_name: user.name,
        email: user.email,
        is_active: user.isActive,
        created_at: user.createdAt.toISOString(),
      })),
    );
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-gray-900 font-medium">User Management</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              User Management
            </h1>
            <p className="text-sm text-gray-600">
              Create and manage user accounts
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowRoleForm(true)}
              style={{
                backgroundColor: "white",
                color: "#392d22",
                border: "2px solid #392d22",
              }}
              className="hover:bg-gray-50 transition-colors font-medium px-5 py-2.5"
            >
              <span className="text-lg mr-2">+</span>
              Create Role
            </Button>
            <Button
              onClick={() => setShowForm(!showForm)}
              style={{
                backgroundColor: "#392d22",
                color: "white",
                border: "none",
              }}
              className="hover:opacity-90 transition-opacity font-medium px-5 py-2.5 shadow-md"
            >
              <span className="text-lg mr-2">+</span>
              Add User
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      <Modal
        isOpen={showForm}
        title="Create New User"
        onClose={() => {
          setShowForm(false);
          setError(null);
          setFormData({
            full_name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
            is_active: true,
          });
        }}
        footer={
          <>
            <Button
              onClick={() => {
                setShowForm(false);
                setError(null);
              }}
              disabled={creating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="create-user-form"
              disabled={creating}
              style={{
                backgroundColor: creating ? "#9ca3af" : "#392d22",
                color: "white",
              }}
            >
              {creating ? "Creating..." : "Create User"}
            </Button>
          </>
        }
      >
        <form
          id="create-user-form"
          onSubmit={handleCreateUser}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              value={formData.full_name}
              onChange={(e) =>
                setFormData({ ...formData, full_name: e.target.value })
              }
              placeholder="John Doe"
              required
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Minimum 6 characters"
              required
              helper="Must be at least 6 characters"
            />

            <Input
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Re-enter password"
              required
              error={
                formData.password !== formData.confirmPassword &&
                formData.confirmPassword
                  ? "Passwords do not match"
                  : ""
              }
            />
          </div>

          <Select
            label="Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            options={[
              { value: "admin", label: "Admin" },
              { value: "manager", label: "Manager" },
              { value: "trainer", label: "Trainer" },
              { value: "beautician", label: "Beautician" },
              { value: "receptionist", label: "Receptionist" },
              { value: "accountant", label: "Accountant" },
            ]}
            required
          />

          <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
              className="h-4 w-4 text-[#392d22] focus:ring-[#392d22] border-gray-300 rounded"
            />
            <label
              htmlFor="is_active"
              className="text-sm font-medium text-gray-900"
            >
              Active User
            </label>
            <span className="text-xs text-gray-500 ml-2">
              (User can login immediately)
            </span>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={showRoleForm}
        title="Create New Role"
        onClose={() => setShowRoleForm(false)}
        footer={
          <>
            <Button onClick={() => setShowRoleForm(false)}>Cancel</Button>
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
              onChange={(e) =>
                setRoleFormData({ ...roleFormData, name: e.target.value })
              }
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
              onChange={(e) =>
                setRoleFormData({
                  ...roleFormData,
                  description: e.target.value,
                })
              }
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
                "users.create",
                "users.read",
                "users.update",
                "users.delete",
                "roles.create",
                "roles.read",
                "roles.update",
                "roles.delete",
                "attendance.create",
                "attendance.read",
                "services.read",
                "services.create",
                "booking.create",
                "booking.read",
                "booking.update",
                "payments.create",
                "payments.read",
              ].map((permission) => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={roleFormData.permissions.includes(permission)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRoleFormData({
                          ...roleFormData,
                          permissions: [
                            ...roleFormData.permissions,
                            permission,
                          ],
                        });
                      } else {
                        setRoleFormData({
                          ...roleFormData,
                          permissions: roleFormData.permissions.filter(
                            (p) => p !== permission,
                          ),
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
                <h3 className="font-bold text-lg text-black">
                  {user.full_name}
                </h3>
                <p className="text-black">{user.email}</p>
                <p className="text-sm text-black">
                  Created: {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded text-sm font-semibold ${
                  user.is_active
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-black"
                }`}
              >
                {user.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {users.length === 0 && !loading && (
        <Card className="text-center py-8 text-black">No users found</Card>
      )}
    </div>
  );
}

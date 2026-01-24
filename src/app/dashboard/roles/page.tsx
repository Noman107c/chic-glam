"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DataTable, Column } from "@/components/tables/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Toast } from "@/components/ui/Toast";
import { Role, Permission, PERMISSION_LIST } from "@/types";
import { mockRoles } from "@/utils/mockData";

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
    name: "",
    description: "",
    permissions: [],
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Fetch roles from API on mount
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setPageLoading(true);
      // Use mock data instead of API call
      setRoles(mockRoles);
    } catch (error) {
      console.error("Error fetching roles:", error);
      setToast({ message: "Failed to load roles", type: "error" });
    } finally {
      setPageLoading(false);
    }
  };

  const columns: Column<Role>[] = [
    {
      key: "name",
      label: "Role Name",
      sortable: true,
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "permissions",
      label: "Permissions Count",
      render: (value: string[]) => (
        <Badge label={`${value.length} permissions`} variant="info" />
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (value: boolean) => (
        <Badge
          label={value ? "Active" : "Inactive"}
          variant={value ? "success" : "danger"}
        />
      ),
    },
  ];

  const handleCreateRole = () => {
    setSelectedRole(null);
    setForm({
      name: "",
      description: "",
      permissions: [],
    });
    setIsModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setForm({
      name: role.name,
      description: role.description || "",
      permissions: role.permissions,
    });
    setIsModalOpen(true);
  };

  const handleSaveRole = async () => {
    if (!form.name) {
      setToast({
        message: "Please fill in all required fields",
        type: "error",
      });
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
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(roleData),
        });

        if (!response.ok) throw new Error("Failed to update role");
        const data = await response.json();

        setRoles(roles.map((r) => (r.id === selectedRole.id ? data.data : r)));
        setToast({ message: "Role updated successfully", type: "success" });
      } else {
        // Create new role
        const response = await fetch("/api/roles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(roleData),
        });

        if (!response.ok) throw new Error("Failed to create role");
        const data = await response.json();
        setRoles([...roles, data.data]);
        setToast({ message: "Role created successfully", type: "success" });
      }

      setIsModalOpen(false);
      setForm({ name: "", description: "", permissions: [] });
      setSelectedRole(null);
    } catch (error) {
      console.error("Error saving role:", error);
      setToast({
        message: error instanceof Error ? error.message : "Failed to save role",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (role: Role) => {
    if (!confirm("Are you sure you want to delete this role?")) return;

    try {
      setLoading(true);
      // Delete role from localStorage
      const updatedRoles = roles.filter((r) => r.id !== role.id);
      localStorage.setItem("chic_glam_roles", JSON.stringify(updatedRoles));
      setRoles(updatedRoles);
      setToast({ message: "Role deleted successfully", type: "success" });
    } catch (error) {
      console.error("Error deleting role:", error);
      setToast({
        message:
          error instanceof Error ? error.message : "Failed to delete role",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionToggle = (permission: string) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
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
          <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>Dashboard</span>
                  <span>/</span>
                  <span className="text-gray-900 font-medium">User Roles</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  User Roles
                </h1>
                <p className="text-sm text-gray-600">
                  Manage system roles and permissions
                </p>
              </div>
              <Button
                variant="primary"
                onClick={handleCreateRole}
                style={{
                  backgroundColor: "#392d22",
                  color: "white",
                  border: "none",
                }}
                className="hover:opacity-90 transition-opacity font-medium px-5 py-2.5 shadow-md"
              >
                <span className="text-lg mr-2">+</span>
                Create Role
              </Button>
            </div>
          </div>

          {/* Roles Table */}
          <DataTable
            columns={columns}
            data={roles}
            title="System Roles"
            actions={[
              {
                label: "Edit",
                onClick: handleEditRole,
                variant: "secondary",
              },
              {
                label: "Delete",
                onClick: handleDeleteRole,
                variant: "danger",
              },
            ]}
          />

          {/* Create/Edit Modal */}
          <Modal
            isOpen={isModalOpen}
            title={selectedRole ? "Edit Role" : "Create New Role"}
            onClose={() => setIsModalOpen(false)}
            size="lg"
            footer={
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    backgroundColor: "white",
                    color: "#392d22",
                    border: "2px solid #392d22",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSaveRole}
                  disabled={!form.name || loading}
                  style={{
                    backgroundColor: loading ? "#9ca3af" : "#392d22",
                    color: "white",
                  }}
                >
                  {loading
                    ? "Saving..."
                    : selectedRole
                      ? "Update Role"
                      : "Create Role"}
                </Button>
              </>
            }
          >
            <div className="space-y-4">
              <Input
                label="Role Name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="e.g., Gym Manager, Beautician, Receptionist"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="w-full text-gray-900 px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent text-sm"
                  placeholder="Describe the role responsibilities..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Permissions
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto border-2 border-gray-200 rounded-lg p-4 bg-gray-50">
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
                    "attendance.update",
                    "services.read",
                    "services.create",
                    "services.update",
                    "booking.create",
                    "booking.read",
                    "booking.update",
                    "booking.delete",
                    "payments.create",
                    "payments.read",
                    "payments.update",
                    "inventory.create",
                    "inventory.read",
                    "inventory.update",
                    "inventory.delete",
                  ].map((permission) => (
                    <label
                      key={permission}
                      className="flex items-center gap-3 p-2 hover:bg-white rounded-md transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={form.permissions.includes(permission)}
                        onChange={() => handlePermissionToggle(permission)}
                        className="h-4 w-4 text-[#392d22] focus:ring-[#392d22] border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700 font-medium">
                        {permission}
                      </span>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {form.permissions.length} permission
                  {form.permissions.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}

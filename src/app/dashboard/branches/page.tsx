'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { DataTable, Column } from '@/components/tables/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Branch } from '@/types';
import { mockBranches } from '@/utils/mockData';

interface BranchForm {
  name: string;
  type: 'SALON' | 'GYM' | 'BOTH';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
}

export default function BranchesPage() {
  const [branches, setBranches] = useState(mockBranches);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [form, setForm] = useState<BranchForm>({
    name: '',
    type: 'SALON',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
  });

  const filteredBranches = branches.filter(branch => !typeFilter || branch.type === typeFilter);

  const columns: Column<Branch>[] = [
    {
      key: 'name',
      label: 'Branch Name',
      sortable: true,
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: string) => (
        <Badge label={value} variant="info" size="sm" />
      ),
    },
    {
      key: 'city',
      label: 'City',
    },
    {
      key: 'phone',
      label: 'Phone',
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
  ];

  const handleCreateBranch = () => {
    setSelectedBranch(null);
    setForm({
      name: '',
      type: 'SALON',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      email: '',
    });
    setIsModalOpen(true);
  };

  const handleEditBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setForm({
      name: branch.name,
      type: branch.type,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      zipCode: branch.zipCode,
      phone: branch.phone,
      email: branch.email,
    });
    setIsModalOpen(true);
  };

  const handleSaveBranch = () => {
    if (selectedBranch) {
      setBranches(
        branches.map(b =>
          b.id === selectedBranch.id
            ? {
                ...b,
                ...form,
                updatedAt: new Date(),
              }
            : b
        )
      );
    } else {
      setBranches([
        ...branches,
        {
          id: String(branches.length + 1),
          ...form,
          managerId: '1',
          workingHours: {
            monday: { open: '10:00', close: '22:00', isClosed: false },
            tuesday: { open: '10:00', close: '22:00', isClosed: false },
            wednesday: { open: '10:00', close: '22:00', isClosed: false },
            thursday: { open: '10:00', close: '22:00', isClosed: false },
            friday: { open: '10:00', close: '23:00', isClosed: false },
            saturday: { open: '09:00', close: '23:00', isClosed: false },
            sunday: { open: '09:00', close: '22:00', isClosed: false },
          },
          services: [],
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteBranch = (branch: Branch) => {
    setBranches(branches.filter(b => b.id !== branch.id));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Branches</h1>
          <p className="text-gray-700">Manage all salons and gym locations</p>
        </div>
        <Button variant="primary" onClick={handleCreateBranch}>
          + Add Branch
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {branches.filter(b => b.type === 'SALON').length}
              </p>
              <p className="text-sm text-gray-700">Salons</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {branches.filter(b => b.type === 'GYM').length}
              </p>
              <p className="text-sm text-gray-700">Gyms</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {branches.filter(b => b.isActive).length}
              </p>
              <p className="text-sm text-gray-700">Active</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          options={[
            { value: '', label: 'All Types' },
            { value: 'SALON', label: 'Salons' },
            { value: 'GYM', label: 'Gyms' },
            { value: 'BOTH', label: 'Both' },
          ]}
        />
      </div>

      {/* Branches Table */}
      <DataTable
        columns={columns}
        data={filteredBranches}
        title="All Branches"
        actions={[
          {
            label: 'Edit',
            onClick: handleEditBranch,
            variant: 'secondary',
          },
          {
            label: 'Delete',
            onClick: handleDeleteBranch,
            variant: 'danger',
          },
        ]}
      />

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        title={selectedBranch ? 'Edit Branch' : 'Create New Branch'}
        onClose={() => setIsModalOpen(false)}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveBranch}
              disabled={!form.name || !form.city}
            >
              {selectedBranch ? 'Update Branch' : 'Create Branch'}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Branch Name"
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Downtown Salon"
          />

          <Select
            label="Type"
            value={form.type}
            onChange={e => setForm(prev => ({ ...prev, type: e.target.value as 'SALON' | 'GYM' | 'BOTH' }))}
            options={[
              { value: 'SALON', label: 'Salon' },
              { value: 'GYM', label: 'Gym' },
              { value: 'BOTH', label: 'Both' },
            ]}
          />

          <Input
            label="Address"
            value={form.address}
            onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
            placeholder="Street address"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              value={form.city}
              onChange={e => setForm(prev => ({ ...prev, city: e.target.value }))}
              placeholder="City"
            />
            <Input
              label="State"
              value={form.state}
              onChange={e => setForm(prev => ({ ...prev, state: e.target.value }))}
              placeholder="State"
            />
          </div>

          <Input
            label="Zip Code"
            value={form.zipCode}
            onChange={e => setForm(prev => ({ ...prev, zipCode: e.target.value }))}
            placeholder="12345"
          />

          <Input
            label="Phone"
            value={form.phone}
            onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="+92 21 1234567"
          />

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
            placeholder="branch@example.com"
          />
        </div>
      </Modal>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/Card';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'Chic Glam',
    email: 'admin@chicglam.com',
    phone: '+92 21 1234567',
    website: 'https://chicglam.com',
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    timezone: 'Asia/Karachi',
    currency: 'PKR',
    language: 'en',
    emailNotifications: true,
    smsNotifications: true,
    dataBackupDaily: true,
    autoLogoutMinutes: 30,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value,
    }));
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    // Save settings to backend
    setUnsavedChanges(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUnsavedChanges(false);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900   mb-2">Settings</h1>
        <p className="text-gray-600  ">Manage system configuration and preferences</p>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader
          title="Company Information"
          action={
            !isEditing && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )
          }
        />
        <CardBody>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                value={settings.companyName}
                onChange={e => handleChange('companyName', e.target.value)}
                disabled={!isEditing}
              />
              <Input
                label="Website"
                value={settings.website}
                onChange={e => handleChange('website', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email"
                type="email"
                value={settings.email}
                onChange={e => handleChange('email', e.target.value)}
                disabled={!isEditing}
              />
              <Input
                label="Phone"
                value={settings.phone}
                onChange={e => handleChange('phone', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </CardBody>
        {isEditing && (
          <CardFooter>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave} disabled={!unsavedChanges}>
                Save Changes
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader title="Appearance & Theme" />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={e => handleChange('primaryColor', e.target.value)}
                  disabled={!isEditing}
                  className="w-12 h-12 rounded-lg cursor-pointer"
                />
                <span className="text-gray-600">{settings.primaryColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={e => handleChange('secondaryColor', e.target.value)}
                  disabled={!isEditing}
                  className="w-12 h-12 rounded-lg cursor-pointer"
                />
                <span className="text-gray-600">{settings.secondaryColor}</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Regional Settings */}
      <Card>
        <CardHeader title="Regional Settings" />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              label="Timezone"
              value={settings.timezone}
              onChange={e => handleChange('timezone', e.target.value)}
              options={[
                { value: 'Asia/Karachi', label: 'Asia/Karachi (PKT)' },
                { value: 'Asia/Dubai', label: 'Asia/Dubai (GST)' },
                { value: 'Europe/London', label: 'Europe/London (GMT)' },
                { value: 'America/New_York', label: 'America/New_York (EST)' },
              ]}
            />
            <Select
              label="Currency"
              value={settings.currency}
              onChange={e => handleChange('currency', e.target.value)}
              options={[
                { value: 'PKR', label: 'Pakistani Rupee (PKR)' },
                { value: 'USD', label: 'US Dollar (USD)' },
                { value: 'EUR', label: 'Euro (EUR)' },
                { value: 'AED', label: 'UAE Dirham (AED)' },
              ]}
            />
            <Select
              label="Language"
              value={settings.language}
              onChange={e => handleChange('language', e.target.value)}
              options={[
                { value: 'en', label: 'English' },
                { value: 'ur', label: 'Urdu' },
                { value: 'fr', label: 'French' },
              ]}
            />
          </div>
        </CardBody>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader title="Notification Preferences" />
        <CardBody>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={e => handleChange('emailNotifications', e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={e => handleChange('smsNotifications', e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <div>
                <p className="font-medium text-gray-900">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive alerts via SMS</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.dataBackupDaily}
                onChange={e => handleChange('dataBackupDaily', e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <div>
                <p className="font-medium text-gray-900">Daily Data Backup</p>
                <p className="text-sm text-gray-500">Automatically backup data daily</p>
              </div>
            </label>
          </div>
        </CardBody>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader title="Security Settings" />
        <CardBody>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto Logout (minutes)
              </label>
              <input
                type="number"
                min="5"
                max="120"
                value={settings.autoLogoutMinutes}
                onChange={e => handleChange('autoLogoutMinutes', parseInt(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-gray-900"
              />
              <p className="text-sm text-gray-500 mt-1">
                User will be logged out after this period of inactivity
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader title="Data Management" />
        <CardBody>
          <div className="space-y-3">
            <Button variant="outline" className="w-full">
              📥 Export All Data
            </Button>
            <Button variant="outline" className="w-full">
              📤 Import Data
            </Button>
            <Button variant="danger" className="w-full">
              🗑️ Clear Cache
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader title="System Information" />
        <CardBody>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600  ">Application Version</span>
              <span className="font-medium text-gray-900  ">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 ">Database Version</span>

              <span className="font-medium text-gray-900  ">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600  ">Last Updated</span>
              <span className="font-medium text-gray-900  ">Jan 21, 2026</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

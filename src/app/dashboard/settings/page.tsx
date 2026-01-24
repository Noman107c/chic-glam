"use client";

import React, { useState, useEffect } from "react";
import {
  User as UserIcon,
  Lock,
  Bell,
  Palette,
  Shield,
  Mail,
  Phone,
  Globe,
  Camera,
  Save,
  LogOut,
  ChevronRight,
  UserCheck,
  Building,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Toast } from "@/components/ui/Toast";

export default function SettingsPage() {
  const { user, role, updateProfile, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("account");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "warning" | "info";
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    language: "English",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (key: keyof typeof formData.notifications) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProfile({ name: formData.name });
      // In a real app, you'd save other fields too
      setToast({ message: "Settings saved successfully!", type: "success" });
    } catch (error) {
      console.error("Error saving settings:", error);
      setToast({ message: "Failed to save settings", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: "account", label: "Account", icon: UserIcon },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#392d22] to-[#d4af37] flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg overflow-hidden">
              {user?.name?.charAt(0) || "U"}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={16} className="text-[#392d22]" />
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user?.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                label={role?.replace("_", " ").toUpperCase() || "USER"}
                variant={role === "super_admin" ? "success" : "info"}
              />
              <span className="text-sm text-gray-500">{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={loading}
            className="bg-[#392d22] hover:bg-[#2a2119] text-white px-6"
          >
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 group ${
                  activeTab === tab.id
                    ? "bg-[#392d22] text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-transparent"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${activeTab === tab.id ? "text-[#d4af37]" : "group-hover:text-[#392d22]"}`}
                />
                <span className="font-semibold">{tab.label}</span>
                <ChevronRight
                  className={`ml-auto h-4 w-4 transition-transform ${activeTab === tab.id ? "rotate-90 text-[#d4af37]" : "text-gray-300"}`}
                />
              </button>
            );
          })}

          <div className="pt-4 mt-4 border-t border-gray-100">
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-semibold">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <Card className="border-none shadow-sm overflow-hidden bg-white">
            <CardBody className="p-0">
              {activeTab === "account" && (
                <div className="divide-y divide-gray-100">
                  <div className="p-8 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-4">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <Input
                          value={formData.email}
                          disabled
                          className="bg-gray-50 text-gray-500 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400">
                          Email cannot be changed directly.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+1 (555) 000-0000"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Language
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <select className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-10 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:ring-offset-2">
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>Urdu</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 border-b pb-4 flex items-center gap-2">
                      <Building className="h-5 w-5 text-[#392d22]" />
                      Business Details
                    </h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Office Address
                        </label>
                        <Input
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="123 Luxury Lane, Glam City"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="p-8 space-y-8">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      Security Settings
                    </h2>
                    <Badge label="Enhanced" variant="success" />
                  </div>

                  <div className="space-y-6">
                    <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex gap-4">
                      <Shield className="h-6 w-6 text-orange-500 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-orange-800">
                          Two-Factor Authentication
                        </h4>
                        <p className="text-sm text-orange-700 mt-1">
                          Add an extra layer of security to your account by
                          enabling 2FA.
                        </p>
                        <Button className="mt-3 bg-orange-500 hover:bg-orange-600 border-none text-white text-sm">
                          Enable 2FA
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-800">
                        Change Password
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">
                            Current Password
                          </label>
                          <Input type="password" placeholder="••••••••" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              New Password
                            </label>
                            <Input type="password" placeholder="••••••••" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Confirm New Password
                            </label>
                            <Input type="password" placeholder="••••••••" />
                          </div>
                        </div>
                        <Button className="w-fit bg-[#392d22] text-white">
                          Update Password
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="p-8 space-y-8">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">
                    Notification Preferences
                  </h2>

                  <div className="space-y-4">
                    {[
                      {
                        id: "email",
                        label: "Email Notifications",
                        desc: "Receive updates about appointments via email.",
                        icon: Mail,
                      },
                      {
                        id: "push",
                        label: "Push Notifications",
                        desc: "Get instant alerts on your mobile device or desktop.",
                        icon: Bell,
                      },
                      {
                        id: "sms",
                        label: "SMS Alerts",
                        desc: "Critical alerts sent directly to your phone.",
                        icon: Phone,
                      },
                    ].map((pref) => (
                      <div
                        key={pref.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <pref.icon className="h-5 w-5 text-[#392d22]" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {pref.label}
                            </p>
                            <p className="text-sm text-gray-500">{pref.desc}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={
                              formData.notifications[
                                pref.id as keyof typeof formData.notifications
                              ]
                            }
                            onChange={() =>
                              handleToggleChange(
                                pref.id as keyof typeof formData.notifications,
                              )
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#d4af37]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "appearance" && (
                <div className="p-8 space-y-8">
                  <h2 className="text-xl font-bold text-gray-900 border-b pb-4">
                    Appearance Settings
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-4">
                        Theme Mode
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button
                          onClick={() => theme === "dark" && toggleTheme()}
                          className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${theme === "light" ? "border-[#392d22] bg-gray-50" : "border-gray-100 hover:border-gray-200"}`}
                        >
                          <Sun
                            className={`h-8 w-8 ${theme === "light" ? "text-[#d4af37]" : "text-gray-400"}`}
                          />
                          <span
                            className={`font-semibold ${theme === "light" ? "text-[#392d22]" : "text-gray-500"}`}
                          >
                            Light Mode
                          </span>
                        </button>
                        <button
                          onClick={() => theme === "light" && toggleTheme()}
                          className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all ${theme === "dark" ? "border-[#392d22] bg-gray-800" : "border-gray-100 hover:border-gray-200"}`}
                        >
                          <Moon
                            className={`h-8 w-8 ${theme === "dark" ? "text-[#d4af37]" : "text-gray-400"}`}
                          />
                          <span
                            className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-500"}`}
                          >
                            Dark Mode
                          </span>
                        </button>
                        <button className="flex flex-col items-center gap-3 p-6 rounded-2xl border-2 border-gray-100 opacity-50 cursor-not-allowed">
                          <Monitor className="h-8 w-8 text-gray-400" />
                          <span className="font-semibold text-gray-500">
                            System
                          </span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800 mb-4">
                        Sidebar Layout
                      </h3>
                      <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-600">
                          Sidebar visibility can be toggled using the menu icon
                          at the top of the screen. Your preference will be
                          saved for this device.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          <div className="mt-8 p-8 bg-red-50 rounded-2xl border border-red-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-red-800">Delete Account</h3>
              <p className="text-sm text-red-700 mt-1">
                Permanently remove your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white border-none shrink-0"
              onClick={() =>
                setToast({
                  message: "Account termination is disabled for this version.",
                  type: "warning",
                })
              }
            >
              Terminate Account
            </Button>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

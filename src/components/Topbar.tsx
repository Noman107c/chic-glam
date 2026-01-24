"use client";

import React, { useState } from "react";
import {
  Menu,
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/hooks";
import { Button } from "@/components/ui/Button";

interface TopbarProps {
  onMenuClick: () => void;
  title?: string;
  subtitle?: string;
  handleLogout?: () => void;
  isSidebarOpen?: boolean;
}

export const Topbar: React.FC<TopbarProps> = ({
  onMenuClick,
  title = "Dashboard",
  subtitle,
  handleLogout,
  isSidebarOpen = true,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const onLogout = () => {
    if (handleLogout) {
      handleLogout();
    } else {
      console.log("Logout clicked");
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 h-16 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            {subtitle && <p className="text-sm text-gray-600 ">{subtitle}</p>}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 bg-[#FAF9F6] border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#392d22] focus:border-transparent"
              />
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-200 group">
            <Bell className="h-5 w-5 text-gray-600 group-hover:text-[#392d22] transition-colors" />
            <span className="absolute top-1 right-1 h-5 w-5 bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center shadow-sm">
              23
            </span>
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-8 w-px bg-gray-200"></div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#392d22] via-[#4a3a2a] to-[#5d4d3d] flex items-center justify-center ring-2 ring-gray-100 shadow-sm">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-gray-900 leading-tight">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 leading-tight mt-0.5">
                  Super Admin
                </p>
              </div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3.5 bg-gradient-to-br from-[#FAF9F6] to-white border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#392d22] via-[#4a3a2a] to-[#5d4d3d] flex items-center justify-center ring-2 ring-white shadow-md">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        Admin User
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        admin@chicglam.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-1.5">
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="font-medium">Profile</span>
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
                      <Settings className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="font-medium">Settings</span>
                  </button>
                  <div className="my-1 h-px bg-gray-200"></div>
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50">
                      <LogOut className="h-4 w-4 text-red-600" />
                    </div>
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

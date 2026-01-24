"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  Moon,
  Sun,
  X,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
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

const notifications = [
  {
    id: 1,
    type: "booking",
    title: "New Booking",
    message: "Sarah K. booked 'Bridal Makeup' for Jan 28",
    time: "2 mins ago",
    read: false,
    icon: Calendar,
    color: "purple",
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Received",
    message: "Emily R. paid $120 for Hydra Facial",
    time: "15 mins ago",
    read: false,
    icon: CreditCard,
    color: "green",
  },
  {
    id: 3,
    type: "alert",
    title: "Low Stock Alert",
    message: "Facial Kit stock is running low (5 items left)",
    time: "1 hour ago",
    read: false,
    icon: AlertCircle,
    color: "orange",
  },
  {
    id: 4,
    type: "success",
    title: "Service Completed",
    message: "John D.'s appointment completed successfully",
    time: "2 hours ago",
    read: true,
    icon: CheckCircle,
    color: "blue",
  },
  {
    id: 5,
    type: "booking",
    title: "Appointment Reminder",
    message: "Michael B. has an appointment in 30 minutes",
    time: "3 hours ago",
    read: true,
    icon: Clock,
    color: "purple",
  },
];

export const Topbar: React.FC<TopbarProps> = ({
  onMenuClick,
  title = "Dashboard",
  subtitle,
  handleLogout,
  isSidebarOpen = true,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationList, setNotificationList] = useState(notifications);

  const markAllAsRead = () => {
    setNotificationList(
      notificationList.map((notif) => ({ ...notif, read: true })),
    );
  };

  const unreadCount = notificationList.filter((n) => !n.read).length;

  // Prevent body scroll when notification panel is open
  useEffect(() => {
    if (showNotifications) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showNotifications]);

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
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
            >
              <Bell className="h-5 w-5 text-gray-600 group-hover:text-[#392d22] transition-colors" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 h-5 w-5 bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showNotifications && (
              <>
                {/* Invisible Backdrop - prevents scroll issues */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowNotifications(false)}
                  style={{ backgroundColor: "transparent" }}
                ></div>

                {/* Panel */}
                <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                  {/* Header */}
                  <div className="px-5 py-4 bg-gradient-to-br from-[#FAF9F6] to-white border-b border-gray-100">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Bell className="h-5 w-5 text-[#392d22]" />
                        Notifications
                      </h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {unreadCount} unread notification
                        {unreadCount !== 1 ? "s" : ""}
                      </p>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs font-semibold text-[#392d22] hover:text-[#2a2119] transition-colors"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-[28rem] overflow-y-auto">
                    {notificationList.length === 0 ? (
                      <div className="text-center py-16 px-4">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                          <Bell className="h-8 w-8 text-gray-300" />
                        </div>
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          No notifications yet
                        </p>
                        <p className="text-xs text-gray-500">
                          We'll notify you when something arrives!
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-50">
                        {notificationList.map((notification) => {
                          const Icon = notification.icon;
                          const colorClasses = {
                            purple:
                              "bg-purple-50 text-purple-600 border-purple-100",
                            green:
                              "bg-green-50 text-green-600 border-green-100",
                            orange:
                              "bg-orange-50 text-orange-600 border-orange-100",
                            blue: "bg-blue-50 text-blue-600 border-blue-100",
                          };

                          return (
                            <div
                              key={notification.id}
                              className={`px-4 py-3 transition-all hover:bg-gray-50 cursor-pointer relative ${
                                !notification.read ? "bg-blue-50/30" : ""
                              }`}
                            >
                              <div className="flex gap-3">
                                <div
                                  className={`mt-0.5 p-2.5 rounded-xl shrink-0 border ${
                                    colorClasses[
                                      notification.color as keyof typeof colorClasses
                                    ]
                                  }`}
                                >
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <h4 className="text-sm font-semibold text-gray-900 leading-tight">
                                      {notification.title}
                                    </h4>
                                    {!notification.read && (
                                      <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0 mt-1"></span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 leading-relaxed mb-2">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                    <Clock size={10} />
                                    <span>{notification.time}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {notificationList.length > 0 && (
                    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-center">
                      <button className="text-xs font-semibold text-[#392d22] hover:text-[#2a2119] transition-colors">
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

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
                    onClick={() => {
                      if (handleLogout) {
                        handleLogout();
                      }
                    }}
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

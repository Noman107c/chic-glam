"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Building,
  Users,
  Lock,
  DollarSign,
  Settings,
  Calendar,
  CreditCard,
  UserCheck,
  Scissors,
  Clock,
  X,
  Menu,
  LogOut,
  Sparkles,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  widthClass?: string;
  handleLogout: () => void;
}

const MENU_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },

  { label: "Salon Supplies", href: "/dashboard/stock", icon: Scissors },
  { label: "Service Catalog", href: "/dashboard/services", icon: Sparkles },
  { label: "Employees", href: "/dashboard/employees", icon: UserCheck },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Attendance", href: "/dashboard/attendance", icon: Clock },
  { label: "Finance", href: "/dashboard/finance", icon: DollarSign },
  { label: "Payroll", href: "/dashboard/payroll", icon: CreditCard },
  { label: "User Management", href: "/dashboard/users", icon: Users },
  { label: "User Roles", href: "/dashboard/roles", icon: Lock },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  widthClass,
  handleLogout,
}) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 md:relative md:translate-x-0 transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 md:translate-x-0 md:w-20"} 
          bg-white text-[#392d22] flex flex-col overflow-hidden border-r border-gray-100
        `}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
          <Link href="/dashboard" className="flex items-center">
            <div className="flex items-center justify-center">
              <img
                src="/chic-logo.jpg"
                alt="Chic Glam Logo"
                className={`object-contain transition-all duration-300 ${
                  isOpen ? "h-12 w-auto" : "h-10 w-10"
                }`}
              />
            </div>
          </Link>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                    flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "bg-[#FAF9F6] text-[#392d22]"
                        : "text-gray-600 hover:bg-[#FAF9F6] hover:text-[#392d22]"
                    }
                  `}
                  >
                    <Icon className="h-5 w-5" />
                    {isOpen && item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors text-red-600 hover:text-red-700 font-light"
            title={!isOpen ? "Logout" : ""}
          >
            <LogOut size={20} />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

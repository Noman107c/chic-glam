'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Moon, Sun, LogOut } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

const SIDEBAR_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/users', label: 'Users', icon: '👥' },
  { href: '/dashboard/roles', label: 'Roles', icon: '🔐' },
  { href: '/dashboard/branches', label: 'Branches', icon: '🏢' },
  { href: '/dashboard/finance', label: 'Finance', icon: '💰' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: '📈' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    router.push('/auth/login');
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-100 text-gray-900 transition-all duration-300 flex flex-col overflow-hidden border-r border-gray-200`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-300 flex items-center justify-between bg-white">
          {sidebarOpen && <h1 className="text-xl font-bold text-gray-900">Chic Glam</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {SIDEBAR_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors group text-gray-700 hover:text-gray-900"
              title={!sidebarOpen ? item.label : ''}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-300 space-y-2 bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-red-600 hover:text-red-700"
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900">Admin Dashboard</h2>
          <div className="text-sm text-gray-600">
            Admin User
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">{children}</div>
      </main>
    </div>
  );
}

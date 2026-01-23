'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Moon, Sun, LogOut, Home, BarChart3, Clock, DollarSign, Users, Settings, ShoppingCart, Package, FileText } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';

const POS_MENU_ITEMS = [
  { label: 'POS System', href: '/', icon: ShoppingCart },
  { label: 'Inventory', href: '/inventory', icon: Package },
  { label: 'Reports', href: '/pos-reports', icon: FileText },
  { label: 'Dashboard', href: '/dashboard', icon: BarChart3 },
];

export default function POSLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    router.push('/auth/login');
  };

  return (
    <div className="flex h-screen bg-[#FAF9F6]">
      {/* Custom POS Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? 'w-64' : 'w-20'} bg-white text-[#392d22] transition-all duration-300 flex flex-col overflow-hidden border-r border-gray-100
        `}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-gray-100 px-4">
          <Link href="/" className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg">
              <img
                src="/chic.png"
                alt="Chic Glam Logo"
                className="h-18 w-18 object-contain"
              />
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors ml-auto"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {POS_MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = window.location.pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors
                      ${isActive
                        ? 'bg-[#FAF9F6] text-[#392d22]'
                        : 'text-gray-600 hover:bg-[#FAF9F6] hover:text-[#392d22]'
                      }
                    `}
                  >
                    <Icon className="h-5 w-5" />
                    {sidebarOpen && item.label}
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
            title={!sidebarOpen ? 'Logout' : ''}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} title="POS System" subtitle="Point of Sale" handleLogout={handleLogout} isSidebarOpen={sidebarOpen} />
        <main className="flex-1 overflow-y-auto bg-[#FAF9F6]">{children}</main>
      </div>
    </div>
  );
}

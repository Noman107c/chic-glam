'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Moon, Sun, LogOut, Home, BarChart3, Clock, DollarSign, Users, Settings } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
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
    <div className="flex h-screen bg-[#FAF9F6]">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} title="Admin Dashboard" subtitle="Admin User" handleLogout={handleLogout} isSidebarOpen={sidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6 bg-[#FAF9F6]">{children}</main>
      </div>
    </div>
  );
}

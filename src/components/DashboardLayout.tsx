'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../components/Sidebar';
import { Topbar } from '../components/Topbar';
import { supabaseClient } from '@/lib/supabaseClient';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title = "Dashboard",
  subtitle
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();



  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} handleLogout={handleLogout} />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar
          onMenuClick={toggleSidebar}
          title={title}
          subtitle={subtitle}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-[#FAF9F6] p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

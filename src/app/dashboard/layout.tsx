"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Moon,
  Sun,
  LogOut,
  Home,
  BarChart3,
  Clock,
  DollarSign,
  Users,
  Settings,
} from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/auth/login");
    }

    // Set initial sidebar state based on screen size
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    router.push("/auth/login");
  };

  return (
    <div className="flex h-screen bg-[#FAF9F6] overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
          title="Admin Dashboard"
          subtitle="Admin User"
          handleLogout={handleLogout}
          isSidebarOpen={sidebarOpen}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#FAF9F6] relative">
          {children}
        </main>
      </div>
    </div>
  );
}

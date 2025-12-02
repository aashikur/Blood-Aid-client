import { useState } from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "@/pages/_dashboard/DashboardSidebar";
import DashboardHeader from "@/pages/_dashboard/DashboardHeader";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-[#0B0B15]">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
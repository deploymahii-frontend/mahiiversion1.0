import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MobileSidebar from "../components/MobileSidebar";
import BottomNavigation from "../components/BottomNavigation";

export default function CustomerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:ml-72">
        <Header onMenu={() => setSidebarOpen(true)} />

        <main className="min-h-screen px-4 py-6 pb-24 lg:px-8 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>

      <BottomNavigation />
    </div>
  );
}

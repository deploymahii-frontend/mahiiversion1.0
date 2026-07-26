import AdminSidebar from "@/modules/admin/components/AdminSidebar";
import AdminTopbar from "@/modules/admin/components/AdminTopbar";
import DashboardCards from "@/modules/admin/components/DashboardCards";
import Charts from "@/modules/admin/components/Charts";
import RecentActivity from "@/modules/admin/components/RecentActivity";
import SystemStatus from "@/modules/admin/components/SystemStatus";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminTopbar />

        <main className="p-6 space-y-6">

          <DashboardCards />

          <Charts />

          <RecentActivity />

          <SystemStatus />

        </main>

      </div>

    </div>
  );
}

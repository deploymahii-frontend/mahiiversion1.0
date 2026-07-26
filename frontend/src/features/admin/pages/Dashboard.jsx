import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import AdminStatCards from "../components/AdminStatCards";
import AdminRevenueChart from "../components/AdminRevenueChart";
import RecentShops from "../components/RecentShops";
import RecentUsers from "../components/RecentUsers";
import PlatformOverview from "../components/PlatformOverview";

import useAdminDashboard from "../hooks/useAdminDashboard";

export default function Dashboard() {
  const {
    dashboard,
    loading,
    refresh,
  } = useAdminDashboard();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <main className="space-y-6 p-6">

          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-3xl font-bold">
                Admin Dashboard
              </h1>

              <p className="mt-1 text-gray-500">
                Monitor the entire Mahii platform.
              </p>
            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Refresh
            </button>

          </div>

          <AdminStatCards data={dashboard} />

          <AdminRevenueChart data={dashboard} />

          <div className="grid gap-6 xl:grid-cols-2">

            <RecentShops data={dashboard.recentShops} />

            <RecentUsers data={dashboard.recentUsers} />

          </div>

          <PlatformOverview data={dashboard} />

        </main>

      </div>

    </div>
  );
}

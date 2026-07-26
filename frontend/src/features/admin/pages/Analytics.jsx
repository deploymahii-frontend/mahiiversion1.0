import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

import AnalyticsOverview from "../components/AnalyticsOverview";
import RevenueChart from "../components/RevenueChart";
import OrdersChart from "../components/OrdersChart";
import UsersChart from "../components/UsersChart";
import ShopsChart from "../components/ShopsChart";

import useAnalytics from "../hooks/useAnalytics";

export default function Analytics() {
  const {
    analytics,
    loading,
    refresh,
  } = useAnalytics();

  return (
    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar />

      <div className="flex-1">

        <AdminHeader />

        <main className="space-y-6 p-6">

          <div className="flex items-center justify-between">

            <div>
              <h1 className="text-3xl font-bold">
                Analytics
              </h1>

              <p className="mt-1 text-gray-500">
                Platform performance overview.
              </p>
            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Refresh
            </button>

          </div>

          <AnalyticsOverview
            data={analytics}
            loading={loading}
          />

          <div className="grid gap-6 xl:grid-cols-2">

            <RevenueChart data={analytics} />

            <OrdersChart data={analytics} />

            <UsersChart data={analytics} />

            <ShopsChart data={analytics} />

          </div>

        </main>

      </div>

    </div>
  );
}

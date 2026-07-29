import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AnalyticsCards from "../components/AnalyticsCards";
import RevenueChart from "../components/RevenueChart";
import OrdersChart from "../components/OrdersChart";
import TopSellingProducts from "../components/TopSellingProducts";
import CategoryPerformance from "../components/CategoryPerformance";
import DateRangeFilter from "../components/DateRangeFilter";
import useAnalytics from "../hooks/useAnalytics";

export default function Analytics() {
  const { analytics, loading, refresh } = useAnalytics();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="mt-1 text-gray-500">Revenue, orders and business insights.</p>
            </div>

            <button
              onClick={refresh}
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Refresh
            </button>
          </div>

          <DateRangeFilter />

          <AnalyticsCards data={analytics} />

          <div className="grid gap-6 xl:grid-cols-2">
            <RevenueChart data={analytics} />
            <OrdersChart data={analytics} />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <TopSellingProducts data={analytics} />
            <CategoryPerformance data={analytics} />
          </div>
        </main>
      </div>
    </div>
  );
}

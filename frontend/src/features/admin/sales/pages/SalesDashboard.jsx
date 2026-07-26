import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiTrendingUp,
  FiRefreshCw,
  FiDownload,
  FiCalendar,
  FiActivity,
} from "react-icons/fi";

export default function SalesDashboard({
  loading,
  dashboard = {},
  onRefresh,
  onExport,
  onDateRange,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[750px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const cards = [
    {
      title: "Today's Revenue",
      value: dashboard.todayRevenue ?? "₹0",
      icon: FiDollarSign,
    },
    {
      title: "Orders",
      value: dashboard.orders ?? 0,
      icon: FiShoppingBag,
    },
    {
      title: "Customers",
      value: dashboard.customers ?? 0,
      icon: FiUsers,
    },
    {
      title: "Growth",
      value: dashboard.growth ?? "0%",
      icon: FiTrendingUp,
    },
    {
      title: "Average Order",
      value: dashboard.averageOrder ?? "₹0",
      icon: FiActivity,
    },
    {
      title: "Refunds",
      value: dashboard.refunds ?? "₹0",
      icon: FiDollarSign,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sales Dashboard</h2>

          <p className="text-gray-500">
            Real-time business performance and revenue overview.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onRefresh} className="border rounded-lg p-3">
            <FiRefreshCw />
          </button>

          <button onClick={onDateRange} className="border rounded-lg px-5">
            <FiCalendar className="mr-2 inline" />
            Date Range
          </button>

          <button onClick={onExport} className="rounded-lg bg-green-600 px-5 text-white">
            <FiDownload className="mr-2 inline" />
            Export
          </button>
        </div>
      </div>

      {/* KPI */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div key={card.title} className="rounded-2xl bg-white shadow-sm p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>

                  <h3 className="mt-3 text-3xl font-bold">{card.value}</h3>
                </div>

                <Icon className="text-3xl text-indigo-600" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue */}

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Revenue Trend Chart
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Orders Trend Chart
        </div>
      </div>

      {/* Bottom */}

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl bg-white shadow-sm p-6">
          <h3 className="font-bold text-lg mb-4">Top Products</h3>

          <div className="text-gray-500">Product performance table</div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <h3 className="font-bold text-lg mb-4">Recent Orders</h3>

          <div className="text-gray-500">Latest sales list</div>
        </div>
      </div>
    </div>
  );
}

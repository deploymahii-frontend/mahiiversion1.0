import {
  FiBarChart2,
  FiTrendingUp,
  FiDollarSign,
  FiTruck,
  FiUsers,
  FiPackage,
  FiRefreshCw,
  FiDownload,
  FiCalendar,
} from "react-icons/fi";

export default function ProcurementAnalyticsDashboard({
  loading,
  analytics = {},
  onRefresh,
  onExport,
  onDateRange,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[780px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Procurement Spend",
      value: analytics.totalSpend ?? "₹0",
      icon: FiDollarSign,
    },
    {
      title: "Purchase Orders",
      value: analytics.purchaseOrders ?? 0,
      icon: FiPackage,
    },
    {
      title: "Active Suppliers",
      value: analytics.activeSuppliers ?? 0,
      icon: FiUsers,
    },
    {
      title: "On-Time Deliveries",
      value: analytics.onTimeDelivery ?? "0%",
      icon: FiTruck,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiBarChart2 />
            Procurement Analytics
          </h2>

          <p className="text-gray-500">
            Executive procurement insights and supplier analytics.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="rounded-lg border p-3"
          >
            <FiRefreshCw />
          </button>

          <button
            onClick={onDateRange}
            className="rounded-lg border px-5"
          >
            <FiCalendar className="mr-2 inline" />
            Date Range
          </button>

          <button
            onClick={onExport}
            className="rounded-lg bg-green-600 px-5 text-white"
          >
            <FiDownload className="mr-2 inline" />
            Export
          </button>

        </div>

      </div>

      {/* KPI Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white shadow-sm p-6"
            >

              <div className="flex justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold">
                    {card.value}
                  </h3>

                </div>

                <Icon className="text-3xl text-indigo-600" />

              </div>

            </div>
          );
        })}

      </div>

      {/* Charts */}

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Procurement Spend Trend
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Monthly Purchase Orders
        </div>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Top Suppliers Analysis
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Delivery Performance
        </div>

      </div>

      {/* Executive Summary */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h3 className="font-bold text-lg mb-4">
            Cost Saving
          </h3>

          <div className="text-gray-500">
            Procurement savings compared with previous period.
          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h3 className="font-bold text-lg mb-4">
            Supplier Risk
          </h3>

          <div className="text-gray-500">
            High-risk suppliers requiring attention.
          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h3 className="font-bold text-lg mb-4">
            Executive Summary
          </h3>

          <div className="text-gray-500">
            Procurement KPIs for management review.
          </div>

        </div>

      </div>

    </div>
  );
}

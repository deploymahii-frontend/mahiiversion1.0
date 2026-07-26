import {
  FiBarChart2,
  FiRefreshCw,
  FiDownload,
  FiCalendar,
  FiPackage,
  FiTrendingUp,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

export default function WarehouseAnalyticsDashboard({
  loading,
  dashboard = {},
  onRefresh,
  onExport,
  onDateRange,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const cards = [
    {
      title: "Inventory Value",
      value: dashboard.inventoryValue ?? "₹0",
      icon: FiPackage,
    },
    {
      title: "Warehouse Utilization",
      value: dashboard.utilization ?? "0%",
      icon: FiTrendingUp,
    },
    {
      title: "Dispatch Success",
      value: dashboard.dispatchRate ?? "0%",
      icon: FiTruck,
    },
    {
      title: "Picker Productivity",
      value: dashboard.productivity ?? "0%",
      icon: FiUsers,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiBarChart2 />
            Warehouse Analytics
          </h2>

          <p className="text-gray-500">
            Executive warehouse performance dashboard with operational KPIs.
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

      {/* Analytics */}

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Inventory Turnover Trend
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Warehouse Utilization Chart
        </div>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Dispatch Performance
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Picker Productivity
        </div>

      </div>

      {/* Bottom */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <h3 className="font-semibold mb-3">
            Slow Moving Inventory
          </h3>

          <p className="text-gray-500">
            Products requiring promotional clearance.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <h3 className="font-semibold mb-3">
            Fast Moving Inventory
          </h3>

          <p className="text-gray-500">
            High demand products requiring replenishment.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <h3 className="font-semibold mb-3">
            Executive KPI Summary
          </h3>

          <p className="text-gray-500">
            Warehouse health score and operational insights.
          </p>
        </div>

      </div>

    </div>
  );
}
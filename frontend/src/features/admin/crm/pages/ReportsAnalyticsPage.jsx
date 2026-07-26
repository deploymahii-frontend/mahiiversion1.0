import {
  FiBarChart2,
  FiTrendingUp,
  FiUsers,
  FiTarget,
  FiDollarSign,
  FiRefreshCw,
  FiDownload,
  FiCalendar,
  FiPieChart,
} from "react-icons/fi";

export default function ReportsAnalyticsPage({
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
      title: "Lead Conversion",
      value: dashboard.leadConversion ?? "0%",
      icon: FiTarget,
    },
    {
      title: "Revenue Generated",
      value: dashboard.revenue ?? "₹0",
      icon: FiDollarSign,
    },
    {
      title: "Active Customers",
      value: dashboard.customers ?? 0,
      icon: FiUsers,
    },
    {
      title: "Sales Growth",
      value: dashboard.growth ?? "0%",
      icon: FiTrendingUp,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiBarChart2 />
            CRM Reports & Analytics
          </h2>

          <p className="text-gray-500">
            Business intelligence and customer relationship insights.
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
          Sales Performance Chart
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Lead Conversion Funnel
        </div>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Revenue Forecast Chart
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Customer Segmentation
        </div>

      </div>

      {/* Bottom */}

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <h3 className="mb-4 text-lg font-bold">
            Top Sales Executives
          </h3>

          <div className="text-gray-500">
            Monthly sales leaderboard...
          </div>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <h3 className="mb-4 text-lg font-bold">
            Top Customers
          </h3>

          <div className="text-gray-500">
            Highest revenue generating customers...
          </div>

        </div>

      </div>

    </div>
  );
}

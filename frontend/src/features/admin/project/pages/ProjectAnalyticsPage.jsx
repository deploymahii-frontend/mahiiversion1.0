import {
  FiBarChart2,
  FiTrendingUp,
  FiTrendingDown,
  FiUsers,
  FiDollarSign,
  FiClock,
  FiRefreshCw,
  FiDownload,
  FiPieChart,
} from "react-icons/fi";

export default function ProjectAnalyticsPage({
  loading,
  dashboard = {},
  onRefresh,
  onExport,
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
      title: "Active Projects",
      value: dashboard.projects ?? 0,
      icon: FiBarChart2,
    },

    {
      title: "Budget Utilization",
      value: dashboard.budget ?? "0%",
      icon: FiDollarSign,
    },

    {
      title: "Resource Utilization",
      value: dashboard.resources ?? "0%",
      icon: FiUsers,
    },

    {
      title: "Schedule Performance",
      value: dashboard.spi ?? "0%",
      icon: FiClock,
    },

    {
      title: "Cost Performance",
      value: dashboard.cpi ?? "0%",
      icon: FiTrendingUp,
    },

    {
      title: "Project Success Rate",
      value: dashboard.successRate ?? "0%",
      icon: FiPieChart,
    },

  ];

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">

            <FiBarChart2 />

            Project Analytics

          </h2>

          <p className="text-gray-500">

            Executive dashboard for enterprise project performance.

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
            onClick={onExport}
            className="rounded-lg bg-green-600 px-5 py-3 text-white"
          >
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
          Budget vs Actual Analytics
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Resource Utilization Analytics
        </div>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Schedule Performance Index (SPI)
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Cost Performance Index (CPI)
        </div>

      </div>

      {/* Bottom */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiTrendingUp
            className="mb-3 text-green-600"
            size={24}
          />

          <h3 className="font-semibold">
            Portfolio Health
          </h3>

          <p className="mt-2 text-gray-500">
            Overall project health monitoring.
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiTrendingDown
            className="mb-3 text-red-600"
            size={24}
          />

          <h3 className="font-semibold">
            Risk Analytics
          </h3>

          <p className="mt-2 text-gray-500">
            Delays and risk indicators.
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiPieChart
            className="mb-3 text-blue-600"
            size={24}
          />

          <h3 className="font-semibold">
            Executive Reports
          </h3>

          <p className="mt-2 text-gray-500">
            Portfolio KPIs and management reports.
          </p>

        </div>

      </div>

    </div>

  );
}

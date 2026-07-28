import {
  FiBarChart2,
  FiTrendingUp,
  FiActivity,
  FiCpu,
  FiClock,
  FiDollarSign,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";

export default function ManufacturingAnalyticsPage({
  loading,
  analytics = {},
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
      title: "OEE",
      value: analytics.oee ?? "0%",
      icon: FiActivity,
    },
    {
      title: "Machine Utilization",
      value: analytics.machineUtilization ?? "0%",
      icon: FiCpu,
    },
    {
      title: "Production Efficiency",
      value: analytics.productionEfficiency ?? "0%",
      icon: FiTrendingUp,
    },
    {
      title: "Labor Productivity",
      value: analytics.laborProductivity ?? "0%",
      icon: FiBarChart2,
    },
    {
      title: "Downtime",
      value: analytics.downtime ?? "0 hrs",
      icon: FiClock,
    },
    {
      title: "Manufacturing Cost",
      value: analytics.manufacturingCost ?? "₹0",
      icon: FiDollarSign,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiBarChart2 />
            Manufacturing Analytics
          </h2>

          <p className="text-gray-500">
            Production performance, OEE, quality and cost analytics.
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

      {/* KPI Cards */}

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

      {/* Charts */}

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          OEE Trend Chart
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Machine Utilization Chart
        </div>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Downtime Analysis
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Manufacturing Cost Trend
        </div>

      </div>

    </div>
  );
}

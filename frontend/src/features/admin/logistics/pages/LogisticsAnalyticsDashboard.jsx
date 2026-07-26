import {
  FiBarChart2,
  FiTruck,
  FiMap,
  FiTrendingUp,
  FiDollarSign,
  FiRefreshCw,
  FiDownload,
  FiActivity,
} from "react-icons/fi";

export default function LogisticsAnalyticsDashboard({
  loading,
  dashboard = {},
  onRefresh,
  onExport,
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
      title: "Fleet Utilization",
      value: dashboard.fleetUtilization ?? "0%",
      icon: FiTruck,
    },
    {
      title: "On-Time Deliveries",
      value: dashboard.onTimeDeliveries ?? "0%",
      icon: FiTrendingUp,
    },
    {
      title: "Transport Cost",
      value: dashboard.transportCost ?? "₹0",
      icon: FiDollarSign,
    },
    {
      title: "Fuel Efficiency",
      value: dashboard.fuelEfficiency ?? "0 KM/L",
      icon: FiActivity,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiBarChart2 />
            Logistics Analytics
          </h2>

          <p className="text-gray-500">
            Executive transportation performance and logistics intelligence.
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
            Export Report
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
          Fleet Utilization Trend
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Transportation Cost Trend
        </div>

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Delivery Performance Analytics
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Route Optimization Analytics
        </div>

      </div>

      {/* AI Section */}

      <div className="rounded-2xl bg-white shadow-sm p-6">

        <h3 className="flex items-center gap-2 text-xl font-bold">
          <FiMap />
          AI Logistics Insights
        </h3>

        <p className="mt-4 text-gray-500">
          Predict delivery delays, recommend optimal routes,
          forecast transportation demand, detect abnormal fuel usage,
          estimate freight costs, and optimize fleet utilization.
        </p>

      </div>

    </div>
  );
}
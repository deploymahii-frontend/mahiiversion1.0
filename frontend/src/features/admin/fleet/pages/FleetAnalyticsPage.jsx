import {
  FiBarChart2,
  FiTruck,
  FiUsers,
  FiTool,
  FiDroplet,
  FiNavigation,
  FiDollarSign,
  FiTrendingUp,
  FiDownload,
  FiRefreshCw,
} from "react-icons/fi";

export default function FleetAnalyticsPage({
  loading,
  metrics = {},
  onRefresh,
  onExport,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] rounded-xl bg-gray-100 animate-pulse"/>
      </div>
    );
  }

  const cards = [
    {
      icon: FiTruck,
      title: "Fleet Utilization",
      value: metrics.utilization || "91%",
    },
    {
      icon: FiDroplet,
      title: "Fuel Efficiency",
      value: metrics.fuelEfficiency || "16.8 km/L",
    },
    {
      icon: FiUsers,
      title: "Driver Performance",
      value: metrics.driverScore || "94%",
    },
    {
      icon: FiTool,
      title: "Maintenance Cost",
      value: metrics.maintenance || "₹4.2L",
    },
    {
      icon: FiNavigation,
      title: "Route Efficiency",
      value: metrics.routes || "97%",
    },
    {
      icon: FiDollarSign,
      title: "Operating Cost",
      value: metrics.cost || "₹12.6L",
    },
  ];

  return (
    <div className="space-y-6">

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiBarChart2 />
            Fleet Analytics
          </h2>

          <p className="text-gray-500">
            Executive dashboards, KPIs, predictive insights, and operational intelligence.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="border rounded-lg p-3"
          >
            <FiRefreshCw />
          </button>

          <button
            onClick={onExport}
            className="bg-green-600 text-white px-5 rounded-lg"
          >
            <FiDownload className="inline mr-2"/>
            Export Report
          </button>

        </div>

      </div>

      <div className="grid gap-6 xl:grid-cols-3">

        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white shadow-sm p-6"
          >
            <card.icon size={28} />
            <h3 className="mt-4 font-semibold">
              {card.title}
            </h3>
            <p className="mt-2 text-3xl font-bold">
              {card.value}
            </p>
          </div>
        ))}

      </div>

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6 h-[380px] flex items-center justify-center">
          Vehicle Utilization Chart
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6 h-[380px] flex items-center justify-center">
          Fuel Consumption Trend
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6 h-[380px] flex items-center justify-center">
          Maintenance Cost Analysis
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6 h-[380px] flex items-center justify-center">
          AI Fleet Insights
        </div>

      </div>

      <div className="rounded-2xl bg-white shadow-sm p-6">

        <div className="flex items-center gap-2 mb-4">
          <FiTrendingUp />
          <h3 className="font-semibold">
            AI Recommendations
          </h3>
        </div>

        <ul className="space-y-2 text-gray-600 list-disc pl-5">
          <li>Optimize Route R-104 to reduce fuel consumption by 9%.</li>
          <li>Vehicle MH12AB1234 requires preventive maintenance within 5 days.</li>
          <li>Driver performance improved by 6% this month.</li>
          <li>Fleet utilization increased by 11% compared to last month.</li>
        </ul>

      </div>

    </div>
  );
}

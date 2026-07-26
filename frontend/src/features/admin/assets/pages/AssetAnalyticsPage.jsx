import {
  FiBarChart2,
  FiActivity,
  FiTrendingUp,
  FiDollarSign,
  FiTool,
  FiClock,
  FiPackage,
  FiDownload,
  FiRefreshCw,
} from "react-icons/fi";

export default function AssetAnalyticsPage({
  loading,
  kpis = {},
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
      title: "Asset Utilization",
      value: kpis.utilization ?? "92%",
      icon: <FiActivity size={24} />,
    },
    {
      title: "Maintenance Cost",
      value: kpis.maintenanceCost ?? "₹2.8M",
      icon: <FiTool size={24} />,
    },
    {
      title: "MTBF",
      value: kpis.mtbf ?? "640 hrs",
      icon: <FiClock size={24} />,
    },
    {
      title: "Asset Value",
      value: kpis.assetValue ?? "₹85.6M",
      icon: <FiDollarSign size={24} />,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiBarChart2 />
            Asset Analytics
          </h2>

          <p className="text-gray-500">
            Enterprise insights for utilization, maintenance, lifecycle, and asset performance.
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

      {/* KPI Cards */}

      <div className="grid gap-6 xl:grid-cols-4">

        {cards.map((card) => (

          <div
            key={card.title}
            className="rounded-2xl bg-white shadow-sm p-6"
          >
            {card.icon}
            <p className="mt-4 text-gray-500">{card.title}</p>
            <h3 className="mt-2 text-3xl font-bold">{card.value}</h3>
          </div>

        ))}

      </div>

      {/* Analytics Panels */}

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp size={24}/>
          <h3 className="mt-4 font-semibold">
            Lifecycle Performance
          </h3>
          <div className="mt-6 h-72 rounded-lg bg-gray-100 flex items-center justify-center">
            Lifecycle Trend Chart
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiPackage size={24}/>
          <h3 className="mt-4 font-semibold">
            Asset Distribution
          </h3>
          <div className="mt-6 h-72 rounded-lg bg-gray-100 flex items-center justify-center">
            Distribution Chart
          </div>
        </div>

      </div>

      {/* Executive Summary */}

      <div className="rounded-2xl bg-white shadow-sm p-6">

        <h3 className="text-lg font-semibold">
          Executive Summary
        </h3>

        <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-600">
          <li>Total enterprise asset portfolio</li>
          <li>Maintenance efficiency trends</li>
          <li>Upcoming replacement recommendations</li>
          <li>Downtime impact analysis</li>
          <li>Total cost of ownership (TCO)</li>
          <li>Asset health score</li>
        </ul>

      </div>

    </div>
  );
}

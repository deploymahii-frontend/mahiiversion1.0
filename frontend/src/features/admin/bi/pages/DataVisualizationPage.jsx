import {
  FiBarChart2,
  FiPieChart,
  FiTrendingUp,
  FiActivity,
  FiRefreshCw,
  FiDownload,
  FiFilter,
  FiGlobe,
} from "react-icons/fi";

export default function DataVisualizationPage({
  loading,
  charts = [],
  filters = {},
  onRefresh,
  onExport,
  onFilterChange,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] rounded-xl bg-gray-100 animate-pulse"/>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiBarChart2 />
            Interactive Charts
          </h2>

          <p className="text-gray-500">
            Real-time enterprise dashboards and visual analytics.
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
            Export Dashboard
          </button>

        </div>

      </div>

      {/* Filters */}

      <div className="rounded-2xl bg-white shadow-sm p-4 flex gap-4 items-center">

        <FiFilter />

        <select
          className="border rounded-lg px-4 py-2"
          value={filters.period || ""}
          onChange={(e)=>onFilterChange?.("period", e.target.value)}
        >
          <option value="">Select Period</option>
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
          <option>This Quarter</option>
          <option>This Year</option>
        </select>

      </div>

      {/* Visualization Widgets */}

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6 h-80">

          <div className="flex items-center gap-2 font-semibold mb-4">
            <FiTrendingUp />
            Revenue Trend
          </div>

          <div className="h-56 flex items-center justify-center text-gray-400">
            Line Chart Component
          </div>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6 h-80">

          <div className="flex items-center gap-2 font-semibold mb-4">
            <FiPieChart />
            Sales Distribution
          </div>

          <div className="h-56 flex items-center justify-center text-gray-400">
            Pie Chart Component
          </div>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6 h-80">

          <div className="flex items-center gap-2 font-semibold mb-4">
            <FiActivity />
            KPI Trend
          </div>

          <div className="h-56 flex items-center justify-center text-gray-400">
            Area Chart Component
          </div>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6 h-80">

          <div className="flex items-center gap-2 font-semibold mb-4">
            <FiGlobe />
            Geographic Analytics
          </div>

          <div className="h-56 flex items-center justify-center text-gray-400">
            Interactive Map Component
          </div>

        </div>

      </div>

    </div>
  );

}

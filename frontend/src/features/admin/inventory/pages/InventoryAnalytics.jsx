import {
  FiTrendingUp,
  FiRefreshCw,
  FiDownload,
  FiCalendar,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiPackage,
} from "react-icons/fi";

export default function InventoryAnalytics({
  loading,
  analytics = {},
  onRefresh,
  onExport,
  onDateRange,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[720px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const kpis = [
    {
      title: "Inventory Value",
      value: analytics.inventoryValue ?? "₹0",
    },
    {
      title: "Turnover Ratio",
      value: analytics.turnoverRatio ?? "0",
    },
    {
      title: "Stock Accuracy",
      value: analytics.stockAccuracy ?? "0%",
    },
    {
      title: "Fill Rate",
      value: analytics.fillRate ?? "0%",
    },
    {
      title: "Carrying Cost",
      value: analytics.carryingCost ?? "₹0",
    },
    {
      title: "Forecast Accuracy",
      value: analytics.forecastAccuracy ?? "0%",
    },
  ];

  const reports = [
    "ABC Analysis",
    "Inventory Aging",
    "Warehouse Performance",
    "Stock Turnover",
    "Demand Forecast",
    "Procurement Performance",
    "Supplier Lead Time",
    "Dead Stock",
  ];

  return (
    <div className="space-y-6">

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiTrendingUp />
            Inventory Analytics
          </h2>

          <p className="text-gray-500">
            Executive insights and inventory intelligence.
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
            onClick={onDateRange}
            className="border rounded-lg px-5"
          >
            <FiCalendar className="mr-2 inline" />
            Date Range
          </button>

          <button
            onClick={onExport}
            className="bg-green-600 text-white rounded-lg px-5"
          >
            <FiDownload className="mr-2 inline" />
            Export
          </button>

        </div>

      </div>

      {/* KPI */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {kpis.map((item) => (

          <div
            key={item.title}
            className="rounded-2xl bg-white shadow-sm p-5"
          >

            <p className="text-sm text-gray-500">
              {item.title}
            </p>

            <h3 className="mt-3 text-3xl font-bold">
              {item.value}
            </h3>

          </div>

        ))}

      </div>

      {/* Graph Area */}

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6 h-[380px] flex items-center justify-center text-gray-400">
          <div className="text-center">
            <FiBarChart2 className="mx-auto text-5xl mb-3" />
            Inventory Trend Chart
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6 h-[380px] flex items-center justify-center text-gray-400">
          <div className="text-center">
            <FiPieChart className="mx-auto text-5xl mb-3" />
            ABC Analysis
          </div>
        </div>

      </div>

      {/* Reports */}

      <div className="rounded-2xl bg-white shadow-sm p-6">

        <h3 className="text-xl font-bold mb-5">
          Available Analytics
        </h3>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

          {reports.map((report) => (

            <div
              key={report}
              className="rounded-xl border p-5 hover:bg-gray-50 cursor-pointer"
            >
              <FiActivity className="mb-3 text-indigo-600" />

              <h4 className="font-semibold">
                {report}
              </h4>
            </div>

          ))}

        </div>

      </div>

      {/* Footer */}

      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">

        <FiPackage className="mx-auto mb-3 text-3xl" />

        AI Forecasting • Inventory KPIs • Warehouse Intelligence • Executive Dashboards • Business Insights

      </div>

    </div>
  );
}

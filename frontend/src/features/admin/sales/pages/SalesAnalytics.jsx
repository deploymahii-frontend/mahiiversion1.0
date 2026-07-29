import {
  FiTrendingUp,
  FiRefreshCw,
  FiDownload,
  FiCalendar,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiDollarSign,
} from "react-icons/fi";

export default function SalesAnalytics({
  loading,
  analytics = {},
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

  const kpis = [
    {
      title: "Gross Revenue",
      value: analytics.grossRevenue ?? "₹0",
    },
    {
      title: "Net Revenue",
      value: analytics.netRevenue ?? "₹0",
    },
    {
      title: "Average Order Value",
      value: analytics.averageOrderValue ?? "₹0",
    },
    {
      title: "Customer Lifetime Value",
      value: analytics.customerLifetimeValue ?? "₹0",
    },
    {
      title: "Conversion Rate",
      value: analytics.conversionRate ?? "0%",
    },
    {
      title: "Sales Growth",
      value: analytics.salesGrowth ?? "0%",
    },
  ];

  const reports = [
    "Revenue Trends",
    "Sales Forecast",
    "Customer Behavior",
    "Product Performance",
    "Conversion Funnel",
    "Profitability",
    "Regional Sales",
    "Executive Summary",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiTrendingUp />
            Sales Analytics
          </h2>

          <p className="text-gray-500">
            Executive insights, forecasting, and strategic business intelligence.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onRefresh} className="rounded-lg border p-3">
            <FiRefreshCw />
          </button>

          <button onClick={onDateRange} className="rounded-lg border px-5">
            <FiCalendar className="mr-2 inline" />
            Date Range
          </button>

          <button onClick={onExport} className="rounded-lg bg-green-600 px-5 text-white">
            <FiDownload className="mr-2 inline" />
            Export
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {kpis.map((item) => (
          <div key={item.title} className="rounded-2xl bg-white shadow-sm p-5">
            <p className="text-sm text-gray-500">{item.title}</p>
            <h3 className="mt-3 text-3xl font-bold">{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl bg-white shadow-sm p-6 h-[380px] flex items-center justify-center text-gray-400">
          <div className="text-center">
            <FiBarChart2 className="mx-auto mb-3 text-5xl" />
            Revenue Trend
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6 h-[380px] flex items-center justify-center text-gray-400">
          <div className="text-center">
            <FiPieChart className="mx-auto mb-3 text-5xl" />
            Sales Distribution
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <h3 className="mb-5 text-xl font-bold">Business Insights</h3>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reports.map((report) => (
            <div key={report} className="cursor-pointer rounded-xl border p-5 hover:bg-gray-50">
              <FiActivity className="mb-3 text-indigo-600" />
              <h4 className="font-semibold">{report}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Executive Summary */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        <FiDollarSign className="mx-auto mb-3 text-3xl" />
        Revenue • Forecasting • Profitability • Customer Intelligence • Growth
      </div>
    </div>
  );
}

import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiRefreshCw,
  FiDownload,
  FiCalendar,
} from "react-icons/fi";

export default function FinancialAnalytics({
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
      title: "Revenue",
      value: analytics.revenue ?? "₹0",
      icon: FiTrendingUp,
    },
    {
      title: "Expenses",
      value: analytics.expenses ?? "₹0",
      icon: FiTrendingDown,
    },
    {
      title: "Net Profit",
      value: analytics.netProfit ?? "₹0",
      icon: FiDollarSign,
    },
    {
      title: "Operating Margin",
      value: analytics.operatingMargin ?? "0%",
      icon: FiActivity,
    },
    {
      title: "Cash Flow",
      value: analytics.cashFlow ?? "₹0",
      icon: FiBarChart2,
    },
    {
      title: "Working Capital",
      value: analytics.workingCapital ?? "₹0",
      icon: FiPieChart,
    },
  ];

  const reports = [
    "Revenue Trend",
    "Expense Analysis",
    "Profitability",
    "Cash Flow Forecast",
    "Budget vs Actual",
    "Financial Ratios",
    "Department Performance",
    "Executive Dashboard",
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiTrendingUp />
            Financial Analytics
          </h2>

          <p className="text-gray-500">
            Executive financial insights, forecasting, and business performance.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onRefresh} className="rounded-lg border p-3">
            <FiRefreshCw />
          </button>

          <button onClick={onDateRange} className="rounded-lg border px-5">
            <FiCalendar className="mr-2 inline" />
            Reporting Period
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

      {/* KPI */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {kpis.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="rounded-2xl bg-white shadow-sm p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>

                  <h3 className="mt-3 text-3xl font-bold">{item.value}</h3>
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
          Revenue, Expense & Profit Trend
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Cash Flow & Liquidity Analysis
        </div>
      </div>

      {/* Reports */}
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <h3 className="mb-5 text-xl font-bold">Executive Analytics</h3>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reports.map((report) => (
            <div
              key={report}
              className="cursor-pointer rounded-xl border p-5 hover:bg-gray-50"
            >
              <FiBarChart2 className="mb-3 text-indigo-600" />
              <h4 className="font-semibold">{report}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        General Ledger • Cash Flow • Budgets • Financial Ratios • Executive Insights
      </div>
    </div>
  );
}

import {
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiPieChart,
  FiRefreshCw,
  FiDownload,
  FiCalendar,
  FiActivity,
} from "react-icons/fi";

export default function FinanceDashboard({
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
      title: "Total Revenue",
      value: dashboard.totalRevenue ?? "₹0",
      icon: FiTrendingUp,
    },
    {
      title: "Total Expenses",
      value: dashboard.totalExpenses ?? "₹0",
      icon: FiTrendingDown,
    },
    {
      title: "Net Profit",
      value: dashboard.netProfit ?? "₹0",
      icon: FiDollarSign,
    },
    {
      title: "Cash Balance",
      value: dashboard.cashBalance ?? "₹0",
      icon: FiPieChart,
    },
    {
      title: "Accounts Receivable",
      value: dashboard.accountsReceivable ?? "₹0",
      icon: FiActivity,
    },
    {
      title: "Accounts Payable",
      value: dashboard.accountsPayable ?? "₹0",
      icon: FiActivity,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiDollarSign />
            Finance Dashboard
          </h2>

          <p className="text-gray-500">
            Real-time financial overview and key accounting metrics.
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
          Revenue vs Expense Trend
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[380px] flex items-center justify-center text-gray-400">
          Cash Flow Overview
        </div>

      </div>

      {/* Bottom */}
      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <h3 className="text-lg font-bold mb-4">
            Recent Financial Activity
          </h3>

          <div className="text-gray-500">
            Journal entries, payments, receipts, adjustments...
          </div>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <h3 className="text-lg font-bold mb-4">
            Financial Alerts
          </h3>

          <div className="text-gray-500">
            Outstanding receivables, overdue payables, low cash balance...
          </div>

        </div>

      </div>

    </div>
  );
}

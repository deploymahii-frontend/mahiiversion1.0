import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiPieChart,
  FiRefreshCw,
  FiCalendar,
  FiDownload,
  FiBarChart2,
} from "react-icons/fi";

export default function ProfitLoss({
  loading,
  overview = {},
  statements = [],
  onRefresh,
  onExportPDF,
  onExportExcel,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[700px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const cards = [
    {
      title: "Gross Revenue",
      value: overview.grossRevenue ?? "₹0",
      icon: FiDollarSign,
      color: "bg-green-500",
    },
    {
      title: "Total Expenses",
      value: overview.expenses ?? "₹0",
      icon: FiTrendingDown,
      color: "bg-red-500",
    },
    {
      title: "Net Profit",
      value: overview.netProfit ?? "₹0",
      icon: FiTrendingUp,
      color: "bg-blue-500",
    },
    {
      title: "Profit Margin",
      value: `${overview.margin ?? 0}%`,
      icon: FiPieChart,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              Profit & Loss
            </h2>

            <p className="text-gray-500">
              Revenue, expenses and profitability overview.
            </p>
          </div>

          <button
            onClick={onRefresh}
            className="rounded-lg border p-3 hover:bg-gray-100"
          >
            <FiRefreshCw />
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
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold">
                    {card.value}
                  </h3>
                </div>

                <div className={`${card.color} rounded-xl p-3 text-white`}>
                  <Icon size={22} />
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Statements */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Period</th>
              <th className="p-4 text-left">Revenue</th>
              <th className="p-4 text-left">Expenses</th>
              <th className="p-4 text-left">Net Profit</th>
              <th className="p-4 text-left">Margin</th>
            </tr>
          </thead>

          <tbody>
            {statements.map((item) => (
              <tr
                key={item.id}
                className="border-t"
              >
                <td className="p-4 flex items-center gap-2">
                  <FiCalendar />
                  {item.period}
                </td>

                <td className="p-4">{item.revenue}</td>
                <td className="p-4">{item.expenses}</td>
                <td className="p-4">{item.netProfit}</td>
                <td className="p-4">{item.margin}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* Export */}
      <div className="flex flex-wrap gap-3">

        <button
          onClick={onExportPDF}
          className="rounded-lg bg-red-600 px-5 py-3 text-white"
        >
          <FiDownload className="mr-2 inline" />
          Export PDF
        </button>

        <button
          onClick={onExportExcel}
          className="rounded-lg bg-green-600 px-5 py-3 text-white"
        >
          <FiDownload className="mr-2 inline" />
          Export Excel
        </button>

      </div>

      {/* Charts */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">

        <FiBarChart2
          className="mx-auto mb-3"
          size={30}
        />

        Revenue vs Expenses • Gross Profit • Net Profit • Margin Trends

      </div>

    </div>
  );
}

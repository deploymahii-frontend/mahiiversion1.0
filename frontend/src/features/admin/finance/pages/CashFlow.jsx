import {
  FiActivity,
  FiArrowDownCircle,
  FiArrowUpCircle,
  FiDollarSign,
  FiCalendar,
  FiRefreshCw,
  FiDownload,
  FiBarChart2,
} from "react-icons/fi";

export default function CashFlow({
  loading,
  overview = {},
  cashFlows = [],
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
      title: "Cash Inflow",
      value: overview.cashIn ?? "₹0",
      icon: FiArrowDownCircle,
      color: "bg-green-500",
    },
    {
      title: "Cash Outflow",
      value: overview.cashOut ?? "₹0",
      icon: FiArrowUpCircle,
      color: "bg-red-500",
    },
    {
      title: "Net Cash Flow",
      value: overview.netCash ?? "₹0",
      icon: FiDollarSign,
      color: "bg-blue-500",
    },
    {
      title: "Closing Balance",
      value: overview.closingBalance ?? "₹0",
      icon: FiActivity,
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
              Cash Flow
            </h2>

            <p className="text-gray-500">
              Monitor inflows, outflows, and cash balances.
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

      {/* Cash Flow Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Period</th>
              <th className="p-4 text-left">Opening</th>
              <th className="p-4 text-left">Inflow</th>
              <th className="p-4 text-left">Outflow</th>
              <th className="p-4 text-left">Closing</th>
            </tr>
          </thead>

          <tbody>
            {cashFlows.map((item) => (
              <tr
                key={item.id}
                className="border-t"
              >
                <td className="p-4 flex items-center gap-2">
                  <FiCalendar />
                  {item.period}
                </td>

                <td className="p-4">{item.opening}</td>
                <td className="p-4">{item.inflow}</td>
                <td className="p-4">{item.outflow}</td>
                <td className="p-4">{item.closing}</td>
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

      {/* Analytics */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">

        <FiBarChart2
          className="mx-auto mb-3"
          size={30}
        />

        Operating • Investing • Financing • Cash Balance Trends

      </div>

    </div>
  );
}

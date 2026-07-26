import {
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiRefreshCw,
  FiSearch,
  FiFilter,
  FiBarChart2,
} from "react-icons/fi";

export default function SettlementCenter({
  loading,
  overview = {},
  settlements = [],
  search = "",
  onSearch,
  onRefresh,
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
      title: "Completed",
      value: overview.completed ?? 0,
      icon: FiCheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Pending",
      value: overview.pending ?? 0,
      icon: FiClock,
      color: "bg-yellow-500",
    },
    {
      title: "Failed",
      value: overview.failed ?? 0,
      icon: FiXCircle,
      color: "bg-red-500",
    },
    {
      title: "Total Settled",
      value: overview.totalSettled ?? "₹0",
      icon: FiDollarSign,
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Settlement Center
            </h2>

            <p className="text-gray-500">
              Manage merchant settlements and payout reconciliation.
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
                  <p className="text-sm text-gray-500">{card.title}</p>
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

      {/* Search */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">

          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search Merchant / Settlement ID..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5 py-2 hover:bg-gray-100">
            <FiFilter className="mr-2 inline" />
            Filters
          </button>

        </div>
      </div>

      {/* Settlement Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Settlement ID</th>
              <th className="p-4 text-left">Merchant</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Schedule</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {settlements.map((item) => (
              <tr
                key={item.id}
                className="border-t"
              >
                <td className="p-4">{item.settlementId}</td>
                <td className="p-4">{item.merchant}</td>
                <td className="p-4">{item.amount}</td>
                <td className="p-4">{item.schedule}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium
                    ${
                      item.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : item.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* Analytics */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
        <FiBarChart2
          size={30}
          className="mx-auto mb-3"
        />
        Settlement Trends • Batch Processing • Payout Success • Reconciliation
      </div>

    </div>
  );
}

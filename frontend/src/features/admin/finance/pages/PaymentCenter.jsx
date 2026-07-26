import {
  FiCreditCard,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiBarChart2,
} from "react-icons/fi";

export default function PaymentCenter({
  loading,
  overview = {},
  transactions = [],
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
      title: "Successful",
      value: overview.success ?? 0,
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
      title: "Total Volume",
      value: overview.totalAmount ?? "₹0",
      icon: FiCreditCard,
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
              Payment Center
            </h2>

            <p className="text-gray-500">
              Monitor and manage all payment transactions.
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

      {/* Search & Filter */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">

          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search Transaction ID, Customer, Merchant..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5 py-2 hover:bg-gray-100">
            <FiFilter className="mr-2 inline" />
            Filters
          </button>

        </div>
      </div>

      {/* Transaction Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Transaction</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Method</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-t"
              >
                <td className="p-4">{tx.transactionId}</td>
                <td className="p-4">{tx.customer}</td>
                <td className="p-4">{tx.method}</td>
                <td className="p-4">{tx.amount}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium
                      ${
                        tx.status === "SUCCESS"
                          ? "bg-green-100 text-green-700"
                          : tx.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* Analytics Placeholder */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">

        <FiBarChart2
          size={30}
          className="mx-auto mb-3"
        />

        Payment Trends • Method Distribution • Success Rate • Failure Analysis

      </div>

    </div>
  );
}

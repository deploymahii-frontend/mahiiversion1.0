import {
  FiCreditCard,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiRotateCcw,
  FiCheckCircle,
} from "react-icons/fi";

export default function PaymentManagement({
  loading,
  overview = {},
  payments = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onView,
  onRefund,
  onReconcile,
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
      title: "Payments Received",
      value: overview.received ?? "₹0",
    },
    {
      title: "Pending",
      value: overview.pending ?? "₹0",
    },
    {
      title: "Refunded",
      value: overview.refunded ?? "₹0",
    },
    {
      title: "Settlement Pending",
      value: overview.settlementPending ?? "₹0",
    },
  ];

  const statusColor = {
    Success: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Failed: "bg-red-100 text-red-700",
    Refunded: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiCreditCard />
            Payment Management
          </h2>

          <p className="text-gray-500">
            Track collections, refunds, settlements, and reconciliation.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onRefresh} className="rounded-lg border p-3">
            <FiRefreshCw />
          </button>

          <button onClick={onExport} className="rounded-lg bg-green-600 px-5 text-white">
            <FiDownload className="mr-2 inline" />
            Export
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.title} className="rounded-2xl bg-white shadow-sm p-5">
            <p className="text-sm text-gray-500">{card.title}</p>
            <h3 className="mt-3 text-3xl font-bold">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search transaction..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Transaction</th>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Method</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t">
                <td className="p-4">{payment.transactionId}</td>
                <td className="p-4">{payment.orderNumber}</td>
                <td className="p-4">{payment.method}</td>
                <td className="p-4">{payment.amount}</td>

                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-sm ${statusColor[payment.status]}`}>
                    {payment.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => onView?.(payment)} className="rounded border p-2">
                      <FiEye />
                    </button>

                    <button onClick={() => onRefund?.(payment)} className="rounded border p-2 text-red-600">
                      <FiRotateCcw />
                    </button>

                    <button onClick={() => onReconcile?.(payment)} className="rounded border p-2 text-green-600">
                      <FiCheckCircle />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Workflow */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        Payment Initiated → Authorized → Captured → Settled → Reconciled → Accounting
      </div>
    </div>
  );
}

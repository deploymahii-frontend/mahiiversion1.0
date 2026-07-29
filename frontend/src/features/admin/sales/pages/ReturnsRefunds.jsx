import {
  FiRotateCcw,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiTruck,
} from "react-icons/fi";

export default function ReturnsRefunds({
  loading,
  overview = {},
  returns = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onView,
  onApprove,
  onReject,
  onSchedulePickup,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[700px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const cards = [
    { title: "Return Requests", value: overview.requests ?? 0 },
    { title: "Approved", value: overview.approved ?? 0 },
    { title: "Pending", value: overview.pending ?? 0 },
    { title: "Refund Amount", value: overview.refundAmount ?? "₹0" },
  ];

  const statusColor = {
    Requested: "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Picked: "bg-blue-100 text-blue-700",
    Refunded: "bg-indigo-100 text-indigo-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiRotateCcw />
            Returns & Refunds
          </h2>
          <p className="text-gray-500">
            Manage product returns, pickups, approvals, and refunds.
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
              placeholder="Search return..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>
        </div>
      </div>

      {/* Return Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Return ID</th>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Reason</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {returns.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4">{item.returnNumber}</td>
                <td className="p-4">{item.orderNumber}</td>
                <td className="p-4">{item.customer}</td>
                <td className="p-4">{item.reason}</td>

                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-sm ${statusColor[item.status]}`}>
                    {item.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => onView?.(item)} className="rounded border p-2">
                      <FiEye />
                    </button>

                    <button onClick={() => onApprove?.(item)} className="rounded border p-2 text-green-600">
                      <FiCheckCircle />
                    </button>

                    <button onClick={() => onReject?.(item)} className="rounded border p-2 text-red-600">
                      <FiXCircle />
                    </button>

                    <button onClick={() => onSchedulePickup?.(item)} className="rounded border p-2 text-blue-600">
                      <FiTruck />
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
        Return Requested → Review → Pickup → Inspection → Restock / Dispose → Refund Completed
      </div>
    </div>
  );
}

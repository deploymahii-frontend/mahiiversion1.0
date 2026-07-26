import {
  FiPackage,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiTruck,
  FiXCircle,
} from "react-icons/fi";

export default function OrdersManagement({
  loading,
  overview = {},
  orders = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onView,
  onUpdateStatus,
  onCancel,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[700px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const cards = [
    { title: "Today's Orders", value: overview.todayOrders ?? 0 },
    { title: "Pending", value: overview.pending ?? 0 },
    { title: "Delivered", value: overview.delivered ?? 0 },
    { title: "Cancelled", value: overview.cancelled ?? 0 },
  ];

  const statusColor = {
    Pending: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Packed: "bg-purple-100 text-purple-700",
    Shipped: "bg-indigo-100 text-indigo-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiPackage />
            Orders Management
          </h2>
          <p className="text-gray-500">Track, process and manage customer orders.</p>
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
              placeholder="Search order..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>
        </div>
      </div>

      {/* Orders */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Shop</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Payment</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-4">{order.number}</td>
                <td className="p-4">{order.customer}</td>
                <td className="p-4">{order.shop}</td>
                <td className="p-4">{order.amount}</td>
                <td className="p-4">{order.paymentStatus}</td>

                <td className="p-4">
                  <span className={`rounded-full px-3 py-1 text-sm ${statusColor[order.status]}`}>
                    {order.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => onView?.(order)} className="rounded border p-2">
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onUpdateStatus?.(order)}
                      className="rounded border p-2 text-green-600"
                    >
                      <FiTruck />
                    </button>

                    <button onClick={() => onCancel?.(order)} className="rounded border p-2 text-red-600">
                      <FiXCircle />
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
        Pending → Confirmed → Packed → Shipped → Delivered
        <br />
        Cancelled / Returned handled through separate workflows.
      </div>
    </div>
  );
}

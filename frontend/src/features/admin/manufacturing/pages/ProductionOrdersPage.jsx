import {
  FiTool,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiPlay,
  FiCheckCircle,
} from "react-icons/fi";

export default function ProductionOrdersPage({
  loading,
  productionOrders = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onStart,
  onComplete,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const badge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Planned":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiTool />
            Production Orders
          </h2>

          <p className="text-gray-500">
            Schedule, execute and monitor manufacturing jobs.
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
            onClick={onExport}
            className="rounded-lg bg-green-600 px-5 py-3 text-white"
          >
            <FiDownload className="mr-2 inline" />
            Export
          </button>

          <button
            onClick={onCreate}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
          >
            <FiPlus className="mr-2 inline" />
            New Production Order
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="flex gap-4">

          <div className="relative flex-1">

            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search production order..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Order No.</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-center">Qty</th>
              <th className="p-4 text-center">Planned Date</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {productionOrders.map((order) => (

              <tr
                key={order.id}
                className="border-t"
              >

                <td className="p-4 font-mono">{order.number}</td>

                <td className="p-4">{order.product}</td>

                <td className="p-4 text-center">{order.quantity}</td>

                <td className="p-4 text-center">{order.date}</td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(order.status)}`}>
                    {order.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(order)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    {order.status === "Planned" && (
                      <button
                        onClick={() => onStart?.(order)}
                        className="rounded border p-2"
                      >
                        <FiPlay />
                      </button>
                    )}

                    {order.status === "In Progress" && (
                      <button
                        onClick={() => onComplete?.(order)}
                        className="rounded border p-2"
                      >
                        <FiCheckCircle />
                      </button>
                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        Planned → Material Reserved → Production Started → Quality Check → Finished Goods
      </div>

    </div>
  );
}
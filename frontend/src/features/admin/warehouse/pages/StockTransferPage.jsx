import {
  FiRepeat,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";

export default function StockTransferPage({
  loading,
  transfers = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onApprove,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const statusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Transit":
        return "bg-blue-100 text-blue-700";
      case "Pending":
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
            <FiRepeat />
            Stock Transfers
          </h2>

          <p className="text-gray-500">
            Transfer inventory between warehouses and storage bins.
          </p>
        </div>

        <div className="flex gap-3">

          <button onClick={onRefresh} className="rounded-lg border p-3">
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
            New Transfer
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
              placeholder="Search transfer..."
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
              <th className="p-4 text-left">Transfer No.</th>
              <th className="p-4 text-left">From</th>
              <th className="p-4 text-left">To</th>
              <th className="p-4 text-center">Items</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {transfers.map((transfer) => (

              <tr
                key={transfer.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {transfer.number}
                </td>

                <td className="p-4">
                  {transfer.fromWarehouse}
                </td>

                <td className="p-4">
                  {transfer.toWarehouse}
                </td>

                <td className="p-4 text-center">
                  {transfer.items}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusColor(transfer.status)}`}>
                    {transfer.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(transfer)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    {transfer.status !== "Completed" && (
                      <button
                        onClick={() => onApprove?.(transfer)}
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

      {/* Summary */}

      <div className="rounded-2xl bg-white shadow-sm p-6">

        <div className="flex items-center gap-3">

          <FiTruck className="text-2xl text-blue-600" />

          <div>

            <h3 className="font-semibold">
              Inventory Movement Tracking
            </h3>

            <p className="text-gray-500">
              Every stock transfer is tracked from source warehouse to destination warehouse.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

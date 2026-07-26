import {
  FiTruck,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiCheckCircle,
  FiPackage,
  FiAlertTriangle,
} from "react-icons/fi";

export default function GoodsReceiptNotesPage({
  loading,
  receipts = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onVerify,
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
      case "Verified":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
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
            <FiTruck />
            Goods Receipt Notes (GRN)
          </h2>

          <p className="text-gray-500">
            Verify supplier deliveries and update warehouse inventory.
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
            New GRN
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
              placeholder="Search GRN..."
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
              <th className="p-4 text-left">GRN No.</th>
              <th className="p-4 text-left">PO No.</th>
              <th className="p-4 text-left">Vendor</th>
              <th className="p-4 text-left">Warehouse</th>
              <th className="p-4 text-left">Received Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {receipts.map((grn) => (

              <tr
                key={grn.id}
                className="border-t"
              >

                <td className="p-4 font-mono">{grn.number}</td>

                <td className="p-4">{grn.poNumber}</td>

                <td className="p-4">{grn.vendor}</td>

                <td className="p-4">{grn.warehouse}</td>

                <td className="p-4">{grn.receivedDate}</td>

                <td className="p-4">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusColor(grn.status)}`}>
                    {grn.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(grn)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onVerify?.(grn)}
                      className="rounded border p-2"
                    >
                      <FiCheckCircle />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Summary */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <FiPackage className="mb-3 text-green-600" size={22} />

          <h4 className="font-semibold">
            Inventory Updated
          </h4>

          <p className="mt-2 text-gray-500">
            Automatically increases warehouse stock after verification.
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <FiAlertTriangle className="mb-3 text-orange-600" size={22} />

          <h4 className="font-semibold">
            Damage Reporting
          </h4>

          <p className="mt-2 text-gray-500">
            Record damaged or missing items during receipt.
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <FiTruck className="mb-3 text-blue-600" size={22} />

          <h4 className="font-semibold">
            Warehouse Allocation
          </h4>

          <p className="mt-2 text-gray-500">
            Assign received products to warehouse locations.
          </p>

        </div>

      </div>

    </div>
  );
}

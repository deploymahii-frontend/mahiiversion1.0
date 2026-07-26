import {
  FiCornerUpLeft,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiEdit,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

export default function PurchaseReturnsPage({
  loading,
  returns = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onEdit,
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
      case "Approved":
        return "bg-blue-100 text-blue-700";
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
            <FiCornerUpLeft />
            Purchase Returns
          </h2>

          <p className="text-gray-500">
            Manage supplier returns, credit notes and inventory adjustments.
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
            New Return
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
              placeholder="Search purchase return..."
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
              <th className="p-4 text-left">Return No.</th>
              <th className="p-4 text-left">Vendor</th>
              <th className="p-4 text-left">Reason</th>
              <th className="p-4 text-right">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {returns.map((item) => (

              <tr
                key={item.id}
                className="border-t"
              >

                <td className="p-4 font-mono">{item.number}</td>

                <td className="p-4">{item.vendor}</td>

                <td className="p-4">{item.reason}</td>

                <td className="p-4 text-right">{item.amount}</td>

                <td className="p-4">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusColor(item.status)}`}>
                    {item.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(item)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(item)}
                      className="rounded border p-2"
                    >
                      <FiEdit />
                    </button>

                    <button
                      onClick={() => onApprove?.(item)}
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

      {/* Footer */}

      <div className="rounded-2xl bg-white shadow-sm p-6">

        <div className="flex items-center gap-3">

          <FiAlertTriangle className="text-2xl text-orange-600" />

          <div>

            <h3 className="font-semibold">
              Automatic Inventory Adjustment
            </h3>

            <p className="text-gray-500">
              Approved returns automatically reduce inventory and generate supplier credit notes.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

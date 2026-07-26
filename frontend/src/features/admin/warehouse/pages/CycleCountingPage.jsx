import {
  FiClipboard,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiCheckCircle,
  FiPackage,
} from "react-icons/fi";

export default function CycleCountingPage({
  loading,
  counts = [],
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

  const badge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
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
            <FiClipboard />
            Cycle Counting
          </h2>

          <p className="text-gray-500">
            Schedule and verify inventory counts without stopping warehouse operations.
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
            Schedule Count
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
              placeholder="Search cycle count..."
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
              <th className="p-4 text-left">Count No.</th>
              <th className="p-4 text-left">Warehouse</th>
              <th className="p-4 text-left">Assigned To</th>
              <th className="p-4 text-center">Items</th>
              <th className="p-4 text-center">Variance</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {counts.map((count) => (

              <tr
                key={count.id}
                className="border-t"
              >

                <td className="p-4 font-mono">{count.number}</td>

                <td className="p-4">{count.warehouse}</td>

                <td className="p-4">{count.assignedTo}</td>

                <td className="p-4 text-center">{count.items}</td>

                <td className="p-4 text-center">{count.variance}</td>

                <td className="p-4 text-center">
                  <span className={`rounded-full px-3 py-1 text-sm ${badge(count.status)}`}>
                    {count.status}
                  </span>
                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(count)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    {count.status !== "Completed" && (
                      <button
                        onClick={() => onApprove?.(count)}
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

      {/* Bottom */}

      <div className="rounded-2xl bg-white shadow-sm p-6">

        <div className="flex items-center gap-3">

          <FiPackage className="text-2xl text-indigo-600" />

          <div>

            <h3 className="font-semibold">
              Continuous Inventory Verification
            </h3>

            <p className="text-gray-500">
              Cycle counting improves stock accuracy without interrupting warehouse operations.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

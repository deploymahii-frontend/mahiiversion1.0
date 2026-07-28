import {
  FiClipboard,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiPlay,
  FiPause,
  FiCheckCircle,
  FiUser,
  FiTool,
} from "react-icons/fi";

export default function WorkOrdersPage({
  loading,
  workOrders = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onStart,
  onPause,
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
      case "Running":
        return "bg-blue-100 text-blue-700";
      case "Paused":
        return "bg-orange-100 text-orange-700";
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
            Work Orders
          </h2>

          <p className="text-gray-500">
            Manage shop-floor operations, machines and operator assignments.
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
            New Work Order
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
              placeholder="Search work order..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Work Order Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Work Order</th>
              <th className="p-4 text-left">Operation</th>
              <th className="p-4 text-left">Operator</th>
              <th className="p-4 text-left">Machine</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {workOrders.map((work) => (

              <tr key={work.id} className="border-t">

                <td className="p-4 font-mono">
                  {work.number}
                </td>

                <td className="p-4">
                  {work.operation}
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FiUser />
                    {work.operator}
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FiTool />
                    {work.machine}
                  </div>
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(work.status)}`}>
                    {work.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(work)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    {work.status === "Pending" && (
                      <button
                        onClick={() => onStart?.(work)}
                        className="rounded border p-2"
                      >
                        <FiPlay />
                      </button>
                    )}

                    {work.status === "Running" && (
                      <>
                        <button
                          onClick={() => onPause?.(work)}
                          className="rounded border p-2"
                        >
                          <FiPause />
                        </button>

                        <button
                          onClick={() => onComplete?.(work)}
                          className="rounded border p-2"
                        >
                          <FiCheckCircle />
                        </button>
                      </>
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
        Operation → Machine → Operator → Production → Quality → Completion
      </div>

    </div>
  );
}

import {
  FiPackage,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiCheckCircle,
  FiUser,
  FiBox,
} from "react-icons/fi";

export default function PickingPackingPage({
  loading,
  pickLists = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onComplete,
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
      case "Packed":
        return "bg-green-100 text-green-700";
      case "Picking":
        return "bg-blue-100 text-blue-700";
      case "Assigned":
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
            <FiPackage />
            Picking & Packing
          </h2>

          <p className="text-gray-500">
            Manage warehouse picking operations and packing workflow.
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
            Create Pick List
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
              placeholder="Search pick list..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Pick List Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Pick No.</th>
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Picker</th>
              <th className="p-4 text-center">Items</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {pickLists.map((pick) => (

              <tr
                key={pick.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {pick.number}
                </td>

                <td className="p-4">
                  {pick.orderNumber}
                </td>

                <td className="p-4">

                  <div className="flex items-center gap-2">
                    <FiUser />
                    {pick.picker}
                  </div>

                </td>

                <td className="p-4 text-center">
                  {pick.items}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusColor(pick.status)}`}>
                    {pick.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(pick)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    {pick.status !== "Packed" && (
                      <button
                        onClick={() => onComplete?.(pick)}
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

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiPackage className="mb-3 text-indigo-600" size={22} />

          <h3 className="font-semibold">
            Pick List Management
          </h3>

          <p className="mt-2 text-gray-500">
            Generate optimized pick lists based on warehouse bin locations.
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiBox className="mb-3 text-green-600" size={22} />

          <h3 className="font-semibold">
            Packing Verification
          </h3>

          <p className="mt-2 text-gray-500">
            Verify picked items using barcode scanning before packing and dispatch.
          </p>

        </div>

      </div>

    </div>
  );
}

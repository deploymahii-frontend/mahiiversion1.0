import {
  FiShield,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiCamera,
} from "react-icons/fi";

export default function QualityControlPage({
  loading,
  inspections = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onApprove,
  onReject,
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
      case "Passed":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
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
            <FiShield />
            Quality Control
          </h2>

          <p className="text-gray-500">
            Inspect raw materials, work-in-progress and finished products.
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
            New Inspection
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
              placeholder="Search inspection..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Inspection Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Inspection No.</th>
              <th className="p-4 text-left">Item</th>
              <th className="p-4 text-left">Inspection Type</th>
              <th className="p-4 text-center">Inspector</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {inspections.map((inspection) => (

              <tr
                key={inspection.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {inspection.number}
                </td>

                <td className="p-4">
                  {inspection.item}
                </td>

                <td className="p-4">
                  {inspection.type}
                </td>

                <td className="p-4 text-center">
                  {inspection.inspector}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(inspection.status)}`}>
                    {inspection.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(inspection)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    {inspection.status === "Pending" && (
                      <>
                        <button
                          onClick={() => onApprove?.(inspection)}
                          className="rounded border p-2"
                        >
                          <FiCheckCircle />
                        </button>

                        <button
                          onClick={() => onReject?.(inspection)}
                          className="rounded border p-2"
                        >
                          <FiXCircle />
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

      {/* Widgets */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiCamera
            className="mb-3 text-indigo-600"
            size={24}
          />

          <h3 className="font-semibold">
            Inspection Evidence
          </h3>

          <p className="mt-2 text-gray-500">
            Attach photos, reports and quality documents.
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiShield
            className="mb-3 text-green-600"
            size={24}
          />

          <h3 className="font-semibold">
            Quality Standards
          </h3>

          <p className="mt-2 text-gray-500">
            Verify products against predefined inspection checklists.
          </p>

        </div>

      </div>

    </div>
  );
}
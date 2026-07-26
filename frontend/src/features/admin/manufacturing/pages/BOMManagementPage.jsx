import {
  FiLayers,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiEdit,
  FiCopy,
} from "react-icons/fi";

export default function BOMManagementPage({
  loading,
  boms = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onEdit,
  onDuplicate,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiLayers />
            Bill of Materials (BOM)
          </h2>

          <p className="text-gray-500">
            Define components, quantities and production structure for manufactured products.
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
            New BOM
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
              placeholder="Search BOM..."
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
              <th className="p-4 text-left">BOM No.</th>
              <th className="p-4 text-left">Finished Product</th>
              <th className="p-4 text-center">Components</th>
              <th className="p-4 text-center">Version</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {boms.map((bom) => (

              <tr key={bom.id} className="border-t">

                <td className="p-4 font-mono">{bom.number}</td>

                <td className="p-4">{bom.product}</td>

                <td className="p-4 text-center">{bom.components}</td>

                <td className="p-4 text-center">{bom.version}</td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(bom)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(bom)}
                      className="rounded border p-2"
                    >
                      <FiEdit />
                    </button>

                    <button
                      onClick={() => onDuplicate?.(bom)}
                      className="rounded border p-2"
                    >
                      <FiCopy />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
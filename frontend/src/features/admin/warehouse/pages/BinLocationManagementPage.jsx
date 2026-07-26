import {
  FiMapPin,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiEdit,
  FiPackage,
  FiGrid,
} from "react-icons/fi";

export default function BinLocationManagementPage({
  loading,
  bins = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onEdit,
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
      case "Available":
        return "bg-green-100 text-green-700";
      case "Occupied":
        return "bg-blue-100 text-blue-700";
      case "Reserved":
        return "bg-yellow-100 text-yellow-700";
      case "Blocked":
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
            <FiMapPin />
            Bin & Location Management
          </h2>

          <p className="text-gray-500">
            Manage warehouse zones, racks, shelves and storage bins.
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
            Add Bin
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
              placeholder="Search bin location..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Bin Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Bin Code</th>
              <th className="p-4 text-left">Warehouse</th>
              <th className="p-4 text-left">Zone / Rack / Shelf</th>
              <th className="p-4 text-center">Capacity</th>
              <th className="p-4 text-center">Used</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {bins.map((bin) => (

              <tr
                key={bin.id}
                className="border-t"
              >

                <td className="p-4 font-mono">{bin.code}</td>

                <td className="p-4">{bin.warehouse}</td>

                <td className="p-4">{bin.location}</td>

                <td className="p-4 text-center">{bin.capacity}</td>

                <td className="p-4 text-center">{bin.used}</td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusColor(bin.status)}`}>
                    {bin.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(bin)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(bin)}
                      className="rounded border p-2"
                    >
                      <FiEdit />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Bottom Cards */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiPackage className="mb-3 text-indigo-600" size={22} />

          <h3 className="font-semibold">
            Bin Utilization
          </h3>

          <p className="mt-2 text-gray-500">
            Monitor storage utilization across all warehouse bins.
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiGrid className="mb-3 text-green-600" size={22} />

          <h3 className="font-semibold">
            Warehouse Layout
          </h3>

          <p className="mt-2 text-gray-500">
            Organize warehouse into zones, aisles, racks and shelves.
          </p>

        </div>

      </div>

    </div>
  );
}

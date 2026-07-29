import {
  FiHome,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiEdit,
  FiMapPin,
  FiPackage,
} from "react-icons/fi";

export default function WarehouseManagementPage({
  loading,
  warehouses = [],
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
      case "Active":
        return "bg-green-100 text-green-700";
      case "Inactive":
        return "bg-gray-100 text-gray-700";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiHome />
            Warehouse Management
          </h2>

          <p className="text-gray-500">
            Manage warehouses, storage locations and inventory facilities.
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
            Add Warehouse
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
              placeholder="Search warehouse..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Warehouse Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Code</th>
              <th className="p-4 text-left">Warehouse</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-center">Capacity</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {warehouses.map((warehouse) => (

              <tr
                key={warehouse.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {warehouse.code}
                </td>

                <td className="p-4">
                  {warehouse.name}
                </td>

                <td className="p-4">

                  <div className="flex items-center gap-2">
                    <FiMapPin />
                    {warehouse.location}
                  </div>

                </td>

                <td className="p-4 text-center">
                  {warehouse.capacity}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusColor(warehouse.status)}`}>
                    {warehouse.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(warehouse)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(warehouse)}
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

      {/* Summary */}

      <div className="rounded-2xl bg-white shadow-sm p-6">

        <div className="flex items-center gap-3">

          <FiPackage className="text-2xl text-indigo-600" />

          <div>

            <h3 className="font-semibold">
              Central Warehouse Repository
            </h3>

            <p className="text-gray-500">
              Every inventory movement references a warehouse and storage location.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

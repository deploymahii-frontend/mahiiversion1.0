import {
  FiUsers,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiEdit,
  FiCheckCircle,
  FiTruck,
} from "react-icons/fi";

export default function DriverManagementPage({
  loading,
  drivers = [],
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

  const badge = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";
      case "On Trip":
        return "bg-blue-100 text-blue-700";
      case "Leave":
        return "bg-yellow-100 text-yellow-700";
      case "Inactive":
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
            <FiUsers />
            Driver Management
          </h2>

          <p className="text-gray-500">
            Manage drivers, licenses, assignments and availability.
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
            Add Driver
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
              placeholder="Search driver..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Driver Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Driver ID</th>
              <th className="p-4 text-left">Driver</th>
              <th className="p-4 text-left">License</th>
              <th className="p-4 text-center">Vehicle</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>

            {drivers.map((driver) => (

              <tr
                key={driver.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {driver.code}
                </td>

                <td className="p-4">
                  {driver.name}
                </td>

                <td className="p-4">
                  {driver.license}
                </td>

                <td className="p-4 text-center">
                  <FiTruck className="inline mr-2" />
                  {driver.vehicle}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(driver.status)}`}>
                    {driver.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(driver)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(driver)}
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

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiCheckCircle
            className="mb-3 text-green-600"
            size={24}
          />

          <h3 className="font-semibold">
            License Compliance
          </h3>

          <p className="mt-2 text-gray-500">
            Monitor license validity and renewal schedules.
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiTruck
            className="mb-3 text-indigo-600"
            size={24}
          />

          <h3 className="font-semibold">
            Driver Assignments
          </h3>

          <p className="mt-2 text-gray-500">
            View assigned vehicles and active delivery trips.
          </p>

        </div>

      </div>

    </div>
  );
}
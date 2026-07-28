import {
  FiTruck,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiEdit,
  FiMapPin,
  FiTool,
} from "react-icons/fi";

export default function VehicleFleetPage({
  loading,
  vehicles = [],
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
      case "Maintenance":
        return "bg-orange-100 text-orange-700";
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
            <FiTruck />
            Vehicle Fleet
          </h2>

          <p className="text-gray-500">
            Manage company vehicles, registrations, insurance and maintenance.
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
            Add Vehicle
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
              placeholder="Search vehicle..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Vehicle Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Vehicle No.</th>
              <th className="p-4 text-left">Model</th>
              <th className="p-4 text-center">Capacity</th>
              <th className="p-4 text-center">GPS</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {vehicles.map((vehicle) => (

              <tr
                key={vehicle.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {vehicle.number}
                </td>

                <td className="p-4">
                  {vehicle.model}
                </td>

                <td className="p-4 text-center">
                  {vehicle.capacity}
                </td>

                <td className="p-4 text-center">

                  <FiMapPin className="inline mr-1" />

                  {vehicle.gps ? "Installed" : "Not Installed"}

                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(vehicle.status)}`}>
                    {vehicle.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(vehicle)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(vehicle)}
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

      {/* Widgets */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiTool
            className="mb-3 text-orange-600"
            size={24}
          />

          <h3 className="font-semibold">
            Maintenance Schedule
          </h3>

          <p className="mt-2 text-gray-500">
            Track preventive maintenance and service history.
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiMapPin
            className="mb-3 text-indigo-600"
            size={24}
          />

          <h3 className="font-semibold">
            GPS Tracking
          </h3>

          <p className="mt-2 text-gray-500">
            Monitor live vehicle location and route history.
          </p>

        </div>

      </div>

    </div>
  );
}

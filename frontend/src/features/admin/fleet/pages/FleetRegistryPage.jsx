import {
  FiTruck,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiEye,
  FiMapPin,
  FiTool,
} from "react-icons/fi";

export default function FleetRegistryPage({
  loading,
  vehicles = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateVehicle,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] rounded-xl bg-gray-100 animate-pulse"/>
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
        return "bg-yellow-100 text-yellow-700";
      case "Out of Service":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiTruck />
            Fleet Registry
          </h2>

          <p className="text-gray-500">
            Manage enterprise vehicles, ownership, assignments, and operational status.
          </p>

        </div>

        <div className="flex gap-3">

          <button onClick={onRefresh} className="border rounded-lg p-3">
            <FiRefreshCw />
          </button>

          <button
            onClick={onExport}
            className="bg-green-600 text-white px-5 rounded-lg"
          >
            <FiDownload className="inline mr-2"/>
            Export
          </button>

          <button
            onClick={onCreateVehicle}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Vehicle
          </button>

        </div>

      </div>

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            className="w-full rounded-lg border py-2 pl-10"
            placeholder="Search vehicles..."
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
          />

        </div>

      </div>

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Vehicle</th>
              <th className="text-center">Registration</th>
              <th className="text-center">Location</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {vehicles.map(vehicle => (

              <tr key={vehicle.id} className="border-t">

                <td className="p-4 font-medium">
                  {vehicle.name}
                </td>

                <td className="text-center">
                  {vehicle.registration}
                </td>

                <td className="text-center">
                  <FiMapPin className="inline mr-1"/>
                  {vehicle.location}
                </td>

                <td className="text-center">
                  <span className={`rounded-full px-3 py-1 ${badge(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </td>

                <td className="text-center">

                  <button
                    onClick={() => onView?.(vehicle)}
                    className="border rounded p-2"
                  >
                    <FiEye />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTruck size={24}/>
          <h3 className="mt-4 font-semibold">Fleet Size</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiMapPin size={24}/>
          <h3 className="mt-4 font-semibold">Active Trips</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTool size={24}/>
          <h3 className="mt-4 font-semibold">Maintenance Due</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTruck size={24}/>
          <h3 className="mt-4 font-semibold">Vehicle Availability</h3>
        </div>

      </div>

    </div>
  );
}

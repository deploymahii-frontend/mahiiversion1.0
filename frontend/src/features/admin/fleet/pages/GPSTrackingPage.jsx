import {
  FiMapPin,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiEye,
  FiNavigation,
  FiTruck,
  FiClock,
  FiAlertTriangle,
} from "react-icons/fi";

export default function GPSTrackingPage({
  loading,
  vehicles = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
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
      case "Moving":
        return "bg-green-100 text-green-700";
      case "Idle":
        return "bg-yellow-100 text-yellow-700";
      case "Stopped":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiMapPin />
            GPS Tracking & Telematics
          </h2>

          <p className="text-gray-500">
            Monitor live fleet location, trips, speed, geofences, and telematics.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="border rounded-lg p-3"
          >
            <FiRefreshCw />
          </button>

          <button
            onClick={onExport}
            className="bg-green-600 text-white px-5 rounded-lg"
          >
            <FiDownload className="inline mr-2"/>
            Export
          </button>

        </div>

      </div>

      {/* Search */}

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

      {/* Live Map Placeholder */}

      <div className="rounded-2xl bg-white shadow-sm p-6">

        <h3 className="font-semibold mb-4">
          Live Fleet Map
        </h3>

        <div className="h-[420px] rounded-xl bg-gray-100 flex items-center justify-center">
          Interactive GPS Map
        </div>

      </div>

      {/* Vehicle Status */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Vehicle</th>
              <th className="text-center">Driver</th>
              <th className="text-center">Speed</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {vehicles.map(vehicle => (

              <tr key={vehicle.id} className="border-t">

                <td className="p-4 font-medium">
                  <FiTruck className="inline mr-2"/>
                  {vehicle.name}
                </td>

                <td className="text-center">
                  {vehicle.driver}
                </td>

                <td className="text-center">
                  {vehicle.speed} km/h
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

      {/* KPI Cards */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiNavigation size={24}/>
          <h3 className="mt-4 font-semibold">Moving Vehicles</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock size={24}/>
          <h3 className="mt-4 font-semibold">Idle Vehicles</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiMapPin size={24}/>
          <h3 className="mt-4 font-semibold">Active Trips</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiAlertTriangle size={24}/>
          <h3 className="mt-4 font-semibold">Alerts</h3>
        </div>

      </div>

    </div>
  );
}

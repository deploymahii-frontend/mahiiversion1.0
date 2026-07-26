import {
  FiMap,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiEye,
  FiNavigation,
  FiClock,
  FiTruck,
} from "react-icons/fi";

export default function RoutePlanningPage({
  loading,
  routes = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateRoute,
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
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      case "In Transit":
        return "bg-green-100 text-green-700";
      case "Completed":
        return "bg-gray-100 text-gray-700";
      case "Delayed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiMap />
            Route Planning & Optimization
          </h2>

          <p className="text-gray-500">
            Create, optimize, and monitor enterprise delivery routes.
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

          <button
            onClick={onCreateRoute}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Route
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            className="w-full rounded-lg border py-2 pl-10"
            placeholder="Search routes..."
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
          />

        </div>

      </div>

      {/* Routes */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Route</th>
              <th className="text-center">Vehicle</th>
              <th className="text-center">ETA</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {routes.map(route => (

              <tr key={route.id} className="border-t">

                <td className="p-4 font-medium">
                  {route.name}
                </td>

                <td className="text-center">
                  <FiTruck className="inline mr-1"/>
                  {route.vehicle}
                </td>

                <td className="text-center">
                  <FiClock className="inline mr-1"/>
                  {route.eta}
                </td>

                <td className="text-center">
                  <span className={`rounded-full px-3 py-1 ${badge(route.status)}`}>
                    {route.status}
                  </span>
                </td>

                <td className="text-center">

                  <button
                    onClick={() => onView?.(route)}
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
          <h3 className="mt-4 font-semibold">Active Routes</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTruck size={24}/>
          <h3 className="mt-4 font-semibold">Assigned Vehicles</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock size={24}/>
          <h3 className="mt-4 font-semibold">Average ETA</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiMap size={24}/>
          <h3 className="mt-4 font-semibold">Optimized Routes</h3>
        </div>

      </div>

    </div>
  );
}

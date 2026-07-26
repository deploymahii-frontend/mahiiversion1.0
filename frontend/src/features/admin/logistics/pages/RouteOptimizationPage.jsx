import {
  FiMap,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlay,
  FiEye,
  FiNavigation,
  FiClock,
} from "react-icons/fi";

export default function RouteOptimizationPage({
  loading,
  routes = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onOptimize,
  onView,
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
      case "Optimized":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-emerald-100 text-emerald-700";
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
            <FiMap />
            Route Optimization
          </h2>

          <p className="text-gray-500">
            Optimize delivery routes for maximum efficiency and minimum cost.
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
            onClick={onOptimize}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
          >
            <FiPlay className="mr-2 inline" />
            Optimize Routes
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
              placeholder="Search route..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Routes Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Route ID</th>
              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-center">Stops</th>
              <th className="p-4 text-center">Distance</th>
              <th className="p-4 text-center">ETA</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {routes.map((route) => (

              <tr
                key={route.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {route.code}
                </td>

                <td className="p-4">
                  {route.vehicle}
                </td>

                <td className="p-4 text-center">
                  {route.stops}
                </td>

                <td className="p-4 text-center">
                  <FiNavigation className="inline mr-2" />
                  {route.distance}
                </td>

                <td className="p-4 text-center">
                  <FiClock className="inline mr-2" />
                  {route.eta}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(route.status)}`}>
                    {route.status}
                  </span>

                </td>

                <td className="p-4">

                  <button
                    onClick={() => onView?.(route)}
                    className="rounded border p-2"
                  >
                    <FiEye />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Dashboard Widgets */}

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm h-[320px] flex items-center justify-center text-gray-400">
          Interactive Route Map
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[320px] flex items-center justify-center text-gray-400">
          Route Performance Analytics
        </div>

      </div>

    </div>
  );
}
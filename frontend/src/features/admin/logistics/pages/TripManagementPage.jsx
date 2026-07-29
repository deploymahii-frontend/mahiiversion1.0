import {
  FiTruck,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiEdit,
  FiPlay,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

export default function TripManagementPage({
  loading,
  trips = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onEdit,
  onStart,
  onComplete,
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
      case "Planned":
        return "bg-blue-100 text-blue-700";
      case "Running":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
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
            Trip Management
          </h2>

          <p className="text-gray-500">
            Monitor dispatch, trip execution and transportation lifecycle.
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
            New Trip
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
              placeholder="Search trip..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Trips */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Trip No.</th>
              <th className="p-4 text-left">Driver</th>
              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-center">Shipment</th>
              <th className="p-4 text-center">ETA</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {trips.map((trip) => (

              <tr
                key={trip.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {trip.number}
                </td>

                <td className="p-4">
                  {trip.driver}
                </td>

                <td className="p-4">
                  {trip.vehicle}
                </td>

                <td className="p-4 text-center">
                  {trip.shipment}
                </td>

                <td className="p-4 text-center">

                  <FiClock className="inline mr-2" />

                  {trip.eta}

                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(trip.status)}`}>
                    {trip.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(trip)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(trip)}
                      className="rounded border p-2"
                    >
                      <FiEdit />
                    </button>

                    {trip.status === "Planned" && (
                      <button
                        onClick={() => onStart?.(trip)}
                        className="rounded border p-2"
                      >
                        <FiPlay />
                      </button>
                    )}

                    {trip.status === "Running" && (
                      <button
                        onClick={() => onComplete?.(trip)}
                        className="rounded border p-2"
                      >
                        <FiCheckCircle />
                      </button>
                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Widgets */}

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm h-[320px] flex items-center justify-center text-gray-400">
          Live Trip Timeline
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[320px] flex items-center justify-center text-gray-400">
          Active Trips Map
        </div>

      </div>

    </div>
  );
}

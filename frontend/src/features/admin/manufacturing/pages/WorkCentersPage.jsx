import {
  FiCpu,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiEdit,
  FiTool,
  FiSettings,
} from "react-icons/fi";

export default function WorkCentersPage({
  loading,
  workCenters = [],
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

  const statusBadge = (status) => {
    switch (status) {
      case "Running":
        return "bg-green-100 text-green-700";
      case "Maintenance":
        return "bg-orange-100 text-orange-700";
      case "Breakdown":
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
            <FiCpu />
            Work Centers & Machines
          </h2>

          <p className="text-gray-500">
            Manage production work centers, machine capacity and maintenance.
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
            New Work Center
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
              placeholder="Search work center..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Work Center Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Center Code</th>
              <th className="p-4 text-left">Machine</th>
              <th className="p-4 text-center">Capacity</th>
              <th className="p-4 text-center">Utilization</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {workCenters.map((center) => (

              <tr
                key={center.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {center.code}
                </td>

                <td className="p-4">
                  {center.machine}
                </td>

                <td className="p-4 text-center">
                  {center.capacity}
                </td>

                <td className="p-4 text-center">
                  {center.utilization}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusBadge(center.status)}`}>
                    {center.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(center)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(center)}
                      className="rounded border p-2"
                    >
                      <FiEdit />
                    </button>

                    <button className="rounded border p-2">
                      <FiSettings />
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

          <FiTool className="mb-3 text-orange-600" size={24} />

          <h3 className="font-semibold">
            Preventive Maintenance
          </h3>

          <p className="mt-2 text-gray-500">
            Schedule regular maintenance to minimize production downtime.
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiCpu className="mb-3 text-indigo-600" size={24} />

          <h3 className="font-semibold">
            Machine Performance
          </h3>

          <p className="mt-2 text-gray-500">
            Monitor machine utilization, availability and efficiency.
          </p>

        </div>

      </div>

    </div>
  );
}
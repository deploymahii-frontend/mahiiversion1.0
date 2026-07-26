import {
  FiPackage,
  FiCalendar,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

export default function ProductionPlanningPage({
  loading,
  plans = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
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
      case "Planned":
        return "bg-blue-100 text-blue-700";
      case "Released":
        return "bg-yellow-100 text-yellow-700";
      case "Running":
        return "bg-indigo-100 text-indigo-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiPackage />
            Production Planning
          </h2>

          <p className="text-gray-500">
            Plan manufacturing orders based on demand forecasts and sales.
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
            New Plan
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
              placeholder="Search production plan..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Plan No.</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-center">Quantity</th>
              <th className="p-4 text-center">Planned Date</th>
              <th className="p-4 text-center">Priority</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {plans.map((plan) => (

              <tr
                key={plan.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {plan.number}
                </td>

                <td className="p-4">
                  {plan.product}
                </td>

                <td className="p-4 text-center">
                  {plan.quantity}
                </td>

                <td className="p-4 text-center">

                  <FiCalendar className="inline mr-2" />

                  {plan.date}

                </td>

                <td className="p-4 text-center">
                  {plan.priority}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(plan.status)}`}>
                    {plan.status}
                  </span>

                </td>

                <td className="p-4">

                  <button
                    onClick={() => onView?.(plan)}
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

      {/* Analytics */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiClock className="mb-3 text-blue-600" size={24} />

          <h3 className="font-semibold">
            Production Schedule
          </h3>

          <p className="mt-2 text-gray-500">
            Upcoming manufacturing schedule.
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiTrendingUp className="mb-3 text-green-600" size={24} />

          <h3 className="font-semibold">
            Capacity Planning
          </h3>

          <p className="mt-2 text-gray-500">
            Machine and labor utilization.
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiPackage className="mb-3 text-indigo-600" size={24} />

          <h3 className="font-semibold">
            Material Requirement
          </h3>

          <p className="mt-2 text-gray-500">
            Required raw materials for planned production.
          </p>

        </div>

      </div>

    </div>

  );

}
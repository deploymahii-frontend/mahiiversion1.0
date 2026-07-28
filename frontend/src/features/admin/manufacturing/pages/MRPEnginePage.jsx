import {
  FiCpu,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlay,
  FiEye,
  FiAlertTriangle,
  FiShoppingCart,
} from "react-icons/fi";

export default function MRPEnginePage({
  loading,
  plans = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onRunMRP,
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
      case "Purchase":
        return "bg-orange-100 text-orange-700";
      case "Production":
        return "bg-blue-100 text-blue-700";
      case "Available":
        return "bg-green-100 text-green-700";
      case "Shortage":
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
            Material Requirements Planning (MRP)
          </h2>

          <p className="text-gray-500">
            Automatically calculate material requirements based on production demand.
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
            onClick={onRunMRP}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
          >
            <FiPlay className="mr-2 inline" />
            Run MRP
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
              placeholder="Search material..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* MRP Results */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Material</th>
              <th className="p-4 text-right">Required</th>
              <th className="p-4 text-right">Available</th>
              <th className="p-4 text-right">Shortage</th>
              <th className="p-4 text-center">Action</th>
              <th className="p-4 text-left">View</th>
            </tr>

          </thead>

          <tbody>

            {plans.map((plan) => (

              <tr
                key={plan.id}
                className="border-t"
              >

                <td className="p-4 font-medium">
                  {plan.material}
                </td>

                <td className="p-4 text-right">
                  {plan.required}
                </td>

                <td className="p-4 text-right">
                  {plan.available}
                </td>

                <td className="p-4 text-right">
                  {plan.shortage}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(plan.action)}`}>
                    {plan.action}
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

      {/* Recommendation Cards */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiShoppingCart
            className="mb-3 text-orange-600"
            size={24}
          />

          <h3 className="font-semibold">
            Purchase Recommendations
          </h3>

          <p className="mt-2 text-gray-500">
            Automatically generate Purchase Requisitions for shortages.
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiAlertTriangle
            className="mb-3 text-red-600"
            size={24}
          />

          <h3 className="font-semibold">
            Critical Shortages
          </h3>

          <p className="mt-2 text-gray-500">
            Highlight materials that may delay production.
          </p>

        </div>

      </div>

    </div>
  );
}

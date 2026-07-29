import {
  FiDollarSign,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiTrendingUp,
  FiTrendingDown,
  FiPieChart,
} from "react-icons/fi";

export default function ProjectBudgetPage({
  loading,
  budgets = [],
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

  const varianceBadge = (variance) => {
    if (variance > 10) return "bg-red-100 text-red-700";
    if (variance > 0) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiDollarSign />
            Project Budgeting
          </h2>

          <p className="text-gray-500">
            Monitor project budgets, actual costs and financial performance.
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
            Create Budget
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
              placeholder="Search project..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Budget Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Project</th>
              <th className="p-4 text-center">Budget</th>
              <th className="p-4 text-center">Actual</th>
              <th className="p-4 text-center">Forecast</th>
              <th className="p-4 text-center">Variance</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {budgets.map((item) => (

              <tr key={item.id} className="border-t">

                <td className="p-4 font-medium">
                  {item.project}
                </td>

                <td className="p-4 text-center">
                  ₹{item.budget}
                </td>

                <td className="p-4 text-center">
                  ₹{item.actual}
                </td>

                <td className="p-4 text-center">
                  ₹{item.forecast}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${varianceBadge(item.variance)}`}>
                    {item.variance}%
                  </span>

                </td>

                <td className="p-4">

                  <button
                    onClick={() => onView?.(item)}
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

      {/* Widgets */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp className="mb-3 text-green-600" size={24} />
          <h3 className="font-semibold">Budget Utilization</h3>
          <p className="mt-2 text-gray-500">
            Planned vs actual project spending.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingDown className="mb-3 text-red-600" size={24} />
          <h3 className="font-semibold">Cost Variance</h3>
          <p className="mt-2 text-gray-500">
            Identify over-budget projects.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiPieChart className="mb-3 text-blue-600" size={24} />
          <h3 className="font-semibold">Cost Distribution</h3>
          <p className="mt-2 text-gray-500">
            Expenses by department and category.
          </p>
        </div>

      </div>

    </div>
  );
}

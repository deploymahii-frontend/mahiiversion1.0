import {
  FiDollarSign,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiSearch,
  FiEye,
  FiCheckCircle,
  FiTrendingUp,
  FiPieChart,
} from "react-icons/fi";

export default function ProjectBudgetPage({
  loading,
  budgets = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateBudget,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] rounded-xl bg-gray-100 animate-pulse"/>
      </div>
    );
  }

  const varianceColor = (variance) => {
    if (variance > 10) return "text-red-600";
    if (variance > 0) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiDollarSign />
            Project Budgeting
          </h2>

          <p className="text-gray-500">
            Budget planning, forecasting and cost control.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="border rounded-lg p-3"
          >
            <FiRefreshCw/>
          </button>

          <button
            onClick={onExport}
            className="bg-green-600 text-white px-5 rounded-lg"
          >
            <FiDownload className="inline mr-2"/>
            Export
          </button>

          <button
            onClick={onCreateBudget}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Budget
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
            placeholder="Search project..."
            className="w-full rounded-lg border py-2 pl-10"
          />

        </div>

      </div>

      {/* Budget Table */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Project</th>
              <th className="text-center">Planned</th>
              <th className="text-center">Actual</th>
              <th className="text-center">Forecast</th>
              <th className="text-center">Variance</th>
              <th className="text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {budgets.map(item => (

              <tr key={item.id} className="border-t">

                <td className="p-4 font-medium">
                  {item.project}
                </td>

                <td className="text-center">
                  {item.planned}
                </td>

                <td className="text-center">
                  {item.actual}
                </td>

                <td className="text-center">
                  {item.forecast}
                </td>

                <td className={`text-center font-semibold ${varianceColor(item.variance)}`}>
                  {item.variance}%
                </td>

                <td className="text-center">

                  <button
                    onClick={()=>onView?.(item)}
                    className="border rounded p-2"
                  >
                    <FiEye/>
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* KPI */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiDollarSign size={24}/>
          <h3 className="mt-4 font-semibold">Total Budget</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiPieChart size={24}/>
          <h3 className="mt-4 font-semibold">Cost Breakdown</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp size={24}/>
          <h3 className="mt-4 font-semibold">Forecast</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCheckCircle size={24}/>
          <h3 className="mt-4 font-semibold">Budget Health</h3>
        </div>

      </div>

    </div>
  );
}

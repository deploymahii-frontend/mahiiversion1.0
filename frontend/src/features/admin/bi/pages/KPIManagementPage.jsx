import {
  FiTarget,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiEye,
  FiTrendingUp,
  FiAlertTriangle,
} from "react-icons/fi";

export default function KPIManagementPage({
  loading,
  kpis = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateKPI,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] rounded-xl bg-gray-100 animate-pulse"/>
      </div>
    );
  }

  const statusColor = (status) => {
    switch (status) {
      case "On Target":
        return "bg-green-100 text-green-700";
      case "Warning":
        return "bg-yellow-100 text-yellow-700";
      case "Critical":
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
            <FiTarget />
            KPI Management
          </h2>

          <p className="text-gray-500">
            Configure enterprise KPIs, targets, thresholds, and alerts.
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
            onClick={onCreateKPI}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New KPI
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
            placeholder="Search KPI..."
            className="w-full rounded-lg border py-2 pl-10"
          />

        </div>

      </div>

      {/* KPI Table */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">KPI</th>
              <th className="text-center">Module</th>
              <th className="text-center">Target</th>
              <th className="text-center">Current</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {kpis.map(kpi => (

              <tr key={kpi.id} className="border-t">

                <td className="p-4 font-medium">
                  {kpi.name}
                </td>

                <td className="text-center">
                  {kpi.module}
                </td>

                <td className="text-center">
                  {kpi.target}
                </td>

                <td className="text-center">
                  {kpi.current}
                </td>

                <td className="text-center">

                  <span className={`rounded-full px-3 py-1 ${statusColor(kpi.status)}`}>
                    {kpi.status}
                  </span>

                </td>

                <td className="text-center">

                  <button
                    onClick={()=>onView?.(kpi)}
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

      {/* KPI Summary */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTarget size={24}/>
          <h3 className="mt-4 font-semibold">Active KPIs</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp size={24}/>
          <h3 className="mt-4 font-semibold">On Target</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiAlertTriangle size={24}/>
          <h3 className="mt-4 font-semibold">Warnings</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiAlertTriangle size={24}/>
          <h3 className="mt-4 font-semibold">Critical KPIs</h3>
        </div>

      </div>

    </div>
  );
}

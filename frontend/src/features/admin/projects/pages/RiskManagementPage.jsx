import {
  FiAlertTriangle,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiSearch,
  FiEye,
  FiShield,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";

export default function RiskManagementPage({
  loading,
  risks = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateRisk,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100"/>
      </div>
    );
  }

  const riskColor = (level) => {
    switch (level) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "High":
        return "bg-orange-100 text-orange-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiAlertTriangle />
            Risk Management
          </h2>

          <p className="text-gray-500">
            Identify, assess, mitigate, and monitor project risks.
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
            onClick={onCreateRisk}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Risk
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
            placeholder="Search risks..."
            className="w-full rounded-lg border py-2 pl-10"
          />

        </div>

      </div>

      {/* Risk Register */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Risk</th>
              <th className="text-center">Owner</th>
              <th className="text-center">Probability</th>
              <th className="text-center">Impact</th>
              <th className="text-center">Level</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {risks.map(risk => (

              <tr key={risk.id} className="border-t">

                <td className="p-4 font-medium">
                  {risk.name}
                </td>

                <td className="text-center">
                  {risk.owner}
                </td>

                <td className="text-center">
                  {risk.probability}
                </td>

                <td className="text-center">
                  {risk.impact}
                </td>

                <td className="text-center">

                  <span className={`rounded-full px-3 py-1 ${riskColor(risk.level)}`}>
                    {risk.level}
                  </span>

                </td>

                <td className="text-center">

                  <button
                    onClick={()=>onView?.(risk)}
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
          <FiShield size={24}/>
          <h3 className="mt-4 font-semibold">Risk Register</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiAlertTriangle size={24}/>
          <h3 className="mt-4 font-semibold">Critical Risks</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp size={24}/>
          <h3 className="mt-4 font-semibold">Risk Trend</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiActivity size={24}/>
          <h3 className="mt-4 font-semibold">Mitigation Progress</h3>
        </div>

      </div>

    </div>
  );
}

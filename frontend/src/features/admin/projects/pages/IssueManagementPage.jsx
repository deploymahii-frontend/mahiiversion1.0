import {
  FiAlertCircle,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiSearch,
  FiEye,
  FiCheckCircle,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";

export default function IssueManagementPage({
  loading,
  issues = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateIssue,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100"/>
      </div>
    );
  }

  const severityColor = (severity) => {
    switch (severity) {
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
            <FiAlertCircle />
            Issue Management
          </h2>

          <p className="text-gray-500">
            Track, prioritize, assign, and resolve active project issues.
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
            onClick={onCreateIssue}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Issue
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
            placeholder="Search issues..."
            className="w-full rounded-lg border py-2 pl-10"
          />

        </div>

      </div>

      {/* Issue Register */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Issue</th>
              <th className="text-center">Owner</th>
              <th className="text-center">Priority</th>
              <th className="text-center">Severity</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {issues.map(issue => (

              <tr key={issue.id} className="border-t">

                <td className="p-4 font-medium">
                  {issue.title}
                </td>

                <td className="text-center">
                  {issue.owner}
                </td>

                <td className="text-center">
                  {issue.priority}
                </td>

                <td className="text-center">
                  <span className={`rounded-full px-3 py-1 ${severityColor(issue.severity)}`}>
                    {issue.severity}
                  </span>
                </td>

                <td className="text-center">
                  {issue.status}
                </td>

                <td className="text-center">

                  <button
                    onClick={()=>onView?.(issue)}
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
          <FiAlertCircle size={24}/>
          <h3 className="mt-4 font-semibold">Open Issues</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCheckCircle size={24}/>
          <h3 className="mt-4 font-semibold">Resolved Issues</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp size={24}/>
          <h3 className="mt-4 font-semibold">Resolution Trend</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiActivity size={24}/>
          <h3 className="mt-4 font-semibold">Escalations</h3>
        </div>

      </div>

    </div>
  );
}

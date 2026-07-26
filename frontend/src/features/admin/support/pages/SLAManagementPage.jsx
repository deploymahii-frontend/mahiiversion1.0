import {
  FiClock,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiAlertTriangle,
  FiCheckCircle,
  FiTrendingUp,
} from "react-icons/fi";

export default function SLAManagementPage({
  loading,
  policies = [],
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
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100"/>
      </div>
    );
  }

  const statusBadge = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Draft":
        return "bg-yellow-100 text-yellow-700";
      case "Expired":
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
            <FiClock />
            SLA Management
          </h2>

          <p className="text-gray-500">
            Configure service level agreements, escalation rules, and compliance.
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
            <FiDownload className="mr-2 inline"/>
            Export
          </button>

          <button
            onClick={onCreate}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
          >
            <FiPlus className="mr-2 inline"/>
            New Policy
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
            placeholder="Search SLA policy..."
            className="w-full rounded-lg border py-2 pl-10 pr-4"
          />

        </div>

      </div>

      {/* Policy Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Policy</th>
              <th className="p-4 text-center">Priority</th>
              <th className="p-4 text-center">Response SLA</th>
              <th className="p-4 text-center">Resolution SLA</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {policies.map((policy)=>(

              <tr
                key={policy.id}
                className="border-t"
              >

                <td className="p-4 font-medium">
                  {policy.name}
                </td>

                <td className="p-4 text-center">
                  {policy.priority}
                </td>

                <td className="p-4 text-center">
                  {policy.response}
                </td>

                <td className="p-4 text-center">
                  {policy.resolution}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusBadge(policy.status)}`}>
                    {policy.status}
                  </span>

                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={()=>onView?.(policy)}
                    className="rounded border p-2"
                  >
                    <FiEye/>
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* KPI Cards */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCheckCircle className="mb-3 text-green-600" size={24}/>
          <h3 className="font-semibold">SLA Compliance</h3>
          <p className="mt-2 text-gray-500">
            Overall compliance percentage.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiAlertTriangle className="mb-3 text-red-600" size={24}/>
          <h3 className="font-semibold">Breaches</h3>
          <p className="mt-2 text-gray-500">
            Active SLA violations.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock className="mb-3 text-blue-600" size={24}/>
          <h3 className="font-semibold">Response Time</h3>
          <p className="mt-2 text-gray-500">
            Average first response time.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp className="mb-3 text-indigo-600" size={24}/>
          <h3 className="font-semibold">Performance</h3>
          <p className="mt-2 text-gray-500">
            SLA trend and improvement.
          </p>
        </div>

      </div>

    </div>
  );
}

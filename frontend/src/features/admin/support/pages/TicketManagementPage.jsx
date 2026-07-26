import {
  FiLifeBuoy,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiUser,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

export default function TicketManagementPage({
  loading,
  tickets = [],
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

  const priorityBadge = (priority) => {
    switch (priority) {
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

  const statusBadge = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Open":
        return "bg-yellow-100 text-yellow-700";
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
            <FiLifeBuoy />
            Ticket Management
          </h2>

          <p className="text-gray-500">
            Track customer issues, assign agents, and monitor SLA compliance.
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
            New Ticket
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
              onChange={(e)=>onSearch?.(e.target.value)}
              placeholder="Search ticket..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline"/>
            Filter
          </button>

        </div>

      </div>

      {/* Ticket Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Ticket ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-center">Priority</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Assigned To</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {tickets.map((ticket)=>(

              <tr key={ticket.id} className="border-t">

                <td className="p-4 font-mono">
                  {ticket.number}
                </td>

                <td className="p-4">
                  {ticket.customer}
                </td>

                <td className="p-4">
                  {ticket.subject}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${priorityBadge(ticket.priority)}`}>
                    {ticket.priority}
                  </span>

                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusBadge(ticket.status)}`}>
                    {ticket.status}
                  </span>

                </td>

                <td className="p-4 text-center">
                  <FiUser className="inline mr-2"/>
                  {ticket.agent}
                </td>

                <td className="p-4">

                  <button
                    onClick={()=>onView?.(ticket)}
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

      {/* Summary Cards */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiLifeBuoy className="mb-3 text-indigo-600" size={24}/>
          <h3 className="font-semibold">Open Tickets</h3>
          <p className="mt-2 text-gray-500">
            Active unresolved issues.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock className="mb-3 text-orange-600" size={24}/>
          <h3 className="font-semibold">SLA Monitoring</h3>
          <p className="mt-2 text-gray-500">
            Tickets approaching SLA breach.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiUser className="mb-3 text-blue-600" size={24}/>
          <h3 className="font-semibold">Agent Workload</h3>
          <p className="mt-2 text-gray-500">
            Current assignment distribution.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCheckCircle className="mb-3 text-green-600" size={24}/>
          <h3 className="font-semibold">Resolution Rate</h3>
          <p className="mt-2 text-gray-500">
            Daily ticket resolution performance.
          </p>
        </div>

      </div>

    </div>
  );

}

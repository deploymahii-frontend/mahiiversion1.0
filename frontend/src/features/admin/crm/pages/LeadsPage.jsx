import {
  FiUserPlus,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiEdit,
  FiPhone,
  FiMail,
  FiCheckCircle,
} from "react-icons/fi";

export default function LeadsPage({
  loading,
  leads = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateLead,
  onView,
  onEdit,
  onConvert,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiUserPlus />
            Leads Management
          </h2>

          <p className="text-gray-500">
            Capture, qualify and manage potential customers.
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
            className="rounded-lg bg-green-600 px-5 text-white"
          >
            <FiDownload className="mr-2 inline" />
            Export
          </button>

          <button
            onClick={onCreateLead}
            className="rounded-lg bg-indigo-600 px-5 text-white"
          >
            <FiUserPlus className="mr-2 inline" />
            New Lead
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
              placeholder="Search lead..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">

            <FiFilter className="mr-2 inline" />

            Filter

          </button>

        </div>

      </div>

      {/* Leads Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Lead</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Assigned To</th>
              <th className="p-4 text-left">Score</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {leads.map((lead) => (

              <tr
                key={lead.id}
                className="border-t"
              >

                <td className="p-4">

                  <div>

                    <div className="font-semibold">
                      {lead.name}
                    </div>

                    <div className="text-sm text-gray-500 flex gap-3 mt-1">

                      <span>
                        <FiPhone className="inline mr-1" />
                        {lead.phone}
                      </span>

                      <span>
                        <FiMail className="inline mr-1" />
                        {lead.email}
                      </span>

                    </div>

                  </div>

                </td>

                <td className="p-4">
                  {lead.company}
                </td>

                <td className="p-4">
                  {lead.owner}
                </td>

                <td className="p-4">
                  {lead.score}
                </td>

                <td className="p-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      lead.status === "Qualified"
                        ? "bg-green-100 text-green-700"
                        : lead.status === "Contacted"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {lead.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(lead)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onEdit?.(lead)}
                      className="rounded border p-2"
                    >
                      <FiEdit />
                    </button>

                    <button
                      onClick={() => onConvert?.(lead)}
                      className="rounded border p-2"
                    >
                      <FiCheckCircle />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

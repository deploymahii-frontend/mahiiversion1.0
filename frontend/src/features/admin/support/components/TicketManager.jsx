import { useMemo, useState } from "react";
import {
  FiSearch,
  FiFilter,
  FiUser,
  FiClock,
  FiAlertTriangle,
  FiCheckCircle,
  FiEdit2,
  FiEye,
} from "react-icons/fi";

const STATUS = {
  OPEN: "bg-red-100 text-red-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  WAITING_CUSTOMER: "bg-yellow-100 text-yellow-700",
  RESOLVED: "bg-green-100 text-green-700",
};

const PRIORITY = {
  LOW: "bg-gray-100 text-gray-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
};

export default function TicketManager({
  loading,
  tickets = [],
  onView,
  onAssign,
  onStatusChange,
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return tickets;

    return tickets.filter((ticket) =>
      `${ticket.id} ${ticket.customer} ${ticket.subject}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [tickets, search]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">Ticket Manager</h2>
          <p className="text-gray-500">
            Manage customer support tickets.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-gray-100">
          <FiFilter />
          Filters
        </button>

      </div>

      <div className="relative mb-6 max-w-md">

        <FiSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          className="w-full rounded-lg border py-2 pl-10 pr-4"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">Ticket</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Priority</th>
              <th className="text-left">Status</th>
              <th className="text-left">Agent</th>
              <th className="text-left">SLA</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((ticket) => (

              <tr
                key={ticket.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4">

                  <div className="font-semibold">
                    #{ticket.id}
                  </div>

                  <div className="text-sm text-gray-500">
                    {ticket.subject}
                  </div>

                </td>

                <td>{ticket.customer}</td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${PRIORITY[ticket.priority]}`}
                  >
                    {ticket.priority}
                  </span>

                </td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${STATUS[ticket.status]}`}
                  >
                    {ticket.status}
                  </span>

                </td>

                <td>

                  <div className="flex items-center gap-2">

                    <FiUser />

                    {ticket.agent}

                  </div>

                </td>

                <td>

                  <div className="flex items-center gap-2">

                    <FiClock />

                    {ticket.slaRemaining}

                  </div>

                </td>

                <td>

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => onView?.(ticket)}
                      className="rounded-lg bg-blue-600 p-2 text-white"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onAssign?.(ticket)}
                      className="rounded-lg bg-purple-600 p-2 text-white"
                    >
                      <FiUser />
                    </button>

                    <button
                      onClick={() => onStatusChange?.(ticket)}
                      className="rounded-lg bg-green-600 p-2 text-white"
                    >
                      <FiEdit2 />
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

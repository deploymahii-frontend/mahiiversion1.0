import { useMemo, useState } from "react";
import {
  FiSearch,
  FiEye,
  FiUserPlus,
  FiAlertTriangle,
  FiClock,
} from "react-icons/fi";

const priorityClasses = {
  CRITICAL: "bg-red-100 text-red-700",
  HIGH: "bg-orange-100 text-orange-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-green-100 text-green-700",
};

const statusClasses = {
  OPEN: "bg-blue-100 text-blue-700",
  ASSIGNED: "bg-purple-100 text-purple-700",
  IN_PROGRESS: "bg-indigo-100 text-indigo-700",
  WAITING_CUSTOMER: "bg-yellow-100 text-yellow-700",
  RESOLVED: "bg-green-100 text-green-700",
  CLOSED: "bg-gray-100 text-gray-700",
  ESCALATED: "bg-red-100 text-red-700",
};

export default function TicketQueue({
  loading,
  tickets = [],
  onView,
  onAssign,
  onEscalate,
}) {
  const [search, setSearch] = useState("");

  const filteredTickets = useMemo(() => {
    if (!search.trim()) return tickets;

    return tickets.filter((ticket) =>
      [
        ticket.ticketNumber,
        ticket.subject,
        ticket.customer,
        ticket.assignedAgent,
      ]
        .join(" ")
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
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Ticket Queue</h2>

        <div className="relative w-80">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            className="w-full rounded-lg border py-2 pl-10 pr-4"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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
              <th className="text-left">Created</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="border-b hover:bg-gray-50">
                <td className="py-4">
                  <div className="font-semibold">{ticket.ticketNumber}</div>
                  <div className="text-sm text-gray-500">{ticket.subject}</div>
                </td>
                <td>{ticket.customer}</td>
                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      priorityClasses[ticket.priority]
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </td>
                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      statusClasses[ticket.status]
                    }`}
                  >
                    {ticket.status.replace("_", " ")}
                  </span>
                </td>
                <td>{ticket.assignedAgent || "-"}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <FiClock />
                    {ticket.slaRemaining}
                  </div>
                </td>
                <td>{ticket.createdAt}</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onView?.(ticket)}
                      className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                      title="View"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => onAssign?.(ticket)}
                      className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                      title="Assign"
                    >
                      <FiUserPlus />
                    </button>
                    <button
                      onClick={() => onEscalate?.(ticket)}
                      className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
                      title="Escalate"
                    >
                      <FiAlertTriangle />
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

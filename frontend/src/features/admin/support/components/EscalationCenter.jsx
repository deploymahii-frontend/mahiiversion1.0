import { useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiClock,
  FiSearch,
  FiArrowUpCircle,
  FiUser,
  FiRefreshCw,
  FiCheckCircle,
} from "react-icons/fi";

const PRIORITY_STYLES = {
  LOW: "bg-gray-100 text-gray-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
};

export default function EscalationCenter({
  loading,
  escalations = [],
  onAssignSupervisor,
  onResolve,
  onRefresh,
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return escalations;

    return escalations.filter((item) =>
      `${item.ticketId} ${item.customer} ${item.subject}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, escalations]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[700px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Escalation Center
          </h2>

          <p className="text-gray-500">
            Monitor SLA breaches and critical support issues.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-gray-100"
        >
          <FiRefreshCw />
          Refresh
        </button>

      </div>

      <div className="relative mb-6 max-w-md">

        <FiSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          className="w-full rounded-lg border py-2 pl-10 pr-4"
          placeholder="Search escalations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="space-y-4">

        {filtered.map((item) => (

          <div
            key={item.ticketId}
            className="rounded-xl border p-5"
          >

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div>

                <h3 className="font-bold">
                  #{item.ticketId}
                </h3>

                <p className="text-gray-500">
                  {item.subject}
                </p>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-sm ${PRIORITY_STYLES[item.priority]}`}
              >
                {item.priority}
              </span>

            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-4">

              <div className="flex items-center gap-2">
                <FiUser />
                {item.customer}
              </div>

              <div className="flex items-center gap-2">
                <FiClock />
                {item.slaRemaining}
              </div>

              <div className="flex items-center gap-2">
                <FiAlertTriangle />
                Level {item.escalationLevel}
              </div>

              <div className="flex items-center gap-2">
                <FiArrowUpCircle />
                {item.assignedSupervisor}
              </div>

            </div>

            <div className="mt-5 flex flex-wrap gap-3">

              <button
                onClick={() => onAssignSupervisor?.(item)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              >
                Assign Supervisor
              </button>

              <button
                onClick={() => onResolve?.(item)}
                className="rounded-lg bg-green-600 px-4 py-2 text-white"
              >
                Resolve
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-8 rounded-2xl border border-dashed p-8 text-center text-gray-500">

        Escalation Analytics

        <br />

        SLA Breaches • Critical Incidents • Escalation Trends • Resolution Times

      </div>

    </div>
  );
}
// Placeholder for EscalationCenter component
export default function EscalationCenter() {
  return null;
}

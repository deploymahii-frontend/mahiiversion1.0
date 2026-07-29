import { useMemo, useState } from "react";

const EVENT_COLORS = {
  LOGIN: "bg-blue-100 text-blue-700",
  LOGOUT: "bg-gray-100 text-gray-700",
  TWO_FACTOR: "bg-green-100 text-green-700",
  API_KEY: "bg-purple-100 text-purple-700",
  IP_RULE: "bg-orange-100 text-orange-700",
  THREAT: "bg-red-100 text-red-700",
};

function EventBadge({ type }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        EVENT_COLORS[type] || "bg-gray-100 text-gray-700"
      }`}
    >
      {type}
    </span>
  );
}

export default function SecurityAuditTimeline({
  loading,
  data = {},
}) {
  const [search, setSearch] = useState("");

  const events = data.auditEvents || [];

  const filteredEvents = useMemo(() => {
    const query = search.toLowerCase();

    return events.filter((event) => {
      return (
        event.actor.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.type.toLowerCase().includes(query)
      );
    });
  }, [events, search]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading security audit timeline...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            Security Audit Timeline
          </h2>

          <p className="text-gray-500">
            Chronological history of security events.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 md:w-80"
        />

      </div>

      <div className="space-y-5">

        {filteredEvents.map((event) => (

          <div
            key={event.id}
            className="flex gap-4 rounded-xl border border-gray-200 p-5"
          >

            <div className="mt-1 h-3 w-3 rounded-full bg-orange-500" />

            <div className="flex-1">

              <div className="flex flex-wrap items-center justify-between gap-3">

                <EventBadge type={event.type} />

                <span className="text-sm text-gray-500">
                  {new Date(event.timestamp).toLocaleString()}
                </span>

              </div>

              <h3 className="mt-3 font-semibold">
                {event.actor}
              </h3>

              <p className="mt-1 text-gray-600">
                {event.description}
              </p>

              {event.metadata && (
                <div className="mt-3 rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
                  <pre className="overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(
                      event.metadata,
                      null,
                      2
                    )}
                  </pre>
                </div>
              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

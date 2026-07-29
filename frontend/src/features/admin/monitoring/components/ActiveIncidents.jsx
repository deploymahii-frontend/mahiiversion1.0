const SEVERITY_STYLES = {
  LOW: "bg-gray-100 text-gray-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
};

function formatDuration(startTime) {
  const started = new Date(startTime).getTime();
  const now = Date.now();

  const minutes = Math.floor((now - started) / 60000);

  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ${minutes % 60}m`;
  }

  const days = Math.floor(hours / 24);

  return `${days}d ${hours % 24}h`;
}

function IncidentCard({
  incident,
}) {
  const badge =
    SEVERITY_STYLES[incident.severity] ||
    SEVERITY_STYLES.LOW;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className="mb-4 flex items-center justify-between">

        <h3 className="text-lg font-semibold">
          {incident.title}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${badge}`}
        >
          {incident.severity}
        </span>

      </div>

      <p className="text-gray-600">
        {incident.description}
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">

        <Info
          title="Started"
          value={new Date(
            incident.startedAt
          ).toLocaleString()}
        />

        <Info
          title="Duration"
          value={formatDuration(
            incident.startedAt
          )}
        />

        <Info
          title="Assigned"
          value={
            incident.assignedTo ||
            "Unassigned"
          }
        />

        <Info
          title="Status"
          value={incident.status}
        />

      </div>

      <div className="mt-6 flex gap-3">

        <button
          className="rounded-xl border px-5 py-2 hover:bg-gray-100"
        >
          Acknowledge
        </button>

        <button
          className="rounded-xl bg-green-600 px-5 py-2 text-white hover:bg-green-700"
        >
          Resolve
        </button>

      </div>

    </div>
  );
}

function Info({
  title,
  value,
}) {
  return (
    <div>

      <p className="text-xs text-gray-500">
        {title}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>

    </div>
  );
}

export default function ActiveIncidents({
  loading,
  incidents = [],
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading incidents...
      </div>
    );
  }

  return (
    <div>

      <div className="mb-5">

        <h2 className="text-2xl font-bold">
          Active Incidents
        </h2>

        <p className="text-gray-500">
          Current operational issues.
        </p>

      </div>

      {incidents.length === 0 ? (

        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

          <div className="text-5xl">
            ✅
          </div>

          <h3 className="mt-4 text-xl font-bold">
            No Active Incidents
          </h3>

          <p className="mt-2 text-gray-500">
            All monitored services are operating normally.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {incidents.map((incident) => (

            <IncidentCard
              key={incident._id}
              incident={incident}
            />

          ))}

        </div>

      )}

    </div>
  );
}

const STATUS_STYLES = {
  HEALTHY: {
    badge: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    label: "Healthy",
  },
  DEGRADED: {
    badge: "bg-yellow-100 text-yellow-700",
    dot: "bg-yellow-500",
    label: "Degraded",
  },
  DOWN: {
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-500",
    label: "Down",
  },
};

function StatusCard({ title, value }) {
  const status =
    STATUS_STYLES[value] || STATUS_STYLES.DOWN;

  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <p className="mb-3 text-sm text-gray-500">
        {title}
      </p>

      <div className="flex items-center gap-3">
        <span
          className={`h-3 w-3 rounded-full ${status.dot}`}
        />

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${status.badge}`}
        >
          {status.label}
        </span>
      </div>
    </div>
  );
}

export default function HealthOverview({
  loading,
  health,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading system health...
      </div>
    );
  }

  if (!health) return null;

  const overall =
    STATUS_STYLES[health.status] ||
    STATUS_STYLES.DOWN;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            Platform Health
          </h2>

          <p className="mt-1 text-gray-500">
            Current operational status
          </p>
        </div>

        <div
          className={`rounded-full px-5 py-2 font-semibold ${overall.badge}`}
        >
          {overall.label}
        </div>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">

        <div className="rounded-xl border border-gray-200 p-4">
          <p className="mb-2 text-sm text-gray-500">
            Uptime
          </p>

          <p className="text-xl font-bold">
            {health.uptime}
          </p>
        </div>

        <StatusCard
          title="Database"
          value={health.database}
        />

        <StatusCard
          title="Redis"
          value={health.redis}
        />

        <StatusCard
          title="Storage"
          value={health.storage}
        />

        <div className="rounded-xl border border-gray-200 p-4">
          <p className="mb-2 text-sm text-gray-500">
            Version
          </p>

          <p className="text-xl font-bold">
            {health.version}
          </p>
        </div>

      </div>

    </div>
  );
}

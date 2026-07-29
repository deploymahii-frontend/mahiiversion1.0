const HEALTH_ITEMS = [
  {
    key: "backupService",
    title: "Backup Service",
    icon: "💾",
  },
  {
    key: "replication",
    title: "Replication",
    icon: "🔄",
  },
  {
    key: "encryption",
    title: "Encryption",
    icon: "🔐",
  },
  {
    key: "storage",
    title: "Storage",
    icon: "☁️",
  },
];

const STATUS_STYLES = {
  HEALTHY: "bg-green-100 text-green-700",
  WARNING: "bg-yellow-100 text-yellow-700",
  CRITICAL: "bg-red-100 text-red-700",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

export default function BackupHealth({
  loading,
  data = {},
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading backup health...
      </div>
    );
  }

  const health = data.health || {};

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Backup Health
        </h2>

        <p className="text-gray-500">
          Monitor backup infrastructure health.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        {HEALTH_ITEMS.map((item) => (
          <div
            key={item.key}
            className="rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {item.icon}
                </span>

                <div>
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {health[item.key]?.message || "No data"}
                  </p>
                </div>
              </div>

              <StatusBadge
                status={
                  health[item.key]?.status || "UNKNOWN"
                }
              />
            </div>
          </div>
        ))}

      </div>

      <div className="mt-6 rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold">
          Last Health Verification
        </h3>

        <p className="mt-2 text-gray-600">
          {health.lastVerification
            ? new Date(
                health.lastVerification
              ).toLocaleString()
            : "--"}
        </p>
      </div>

    </div>
  );
}

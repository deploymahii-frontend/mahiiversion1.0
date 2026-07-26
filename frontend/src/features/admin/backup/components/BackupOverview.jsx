const BACKUP_CARDS = [
  {
    key: "totalBackups",
    title: "Total Backups",
    icon: "💾",
  },
  {
    key: "lastSuccessfulBackup",
    title: "Last Successful Backup",
    icon: "✅",
    formatter: (value) =>
      value ? new Date(value).toLocaleString() : "--",
  },
  {
    key: "failedBackups",
    title: "Failed Backups",
    icon: "❌",
  },
  {
    key: "storageUsed",
    title: "Storage Used",
    icon: "☁️",
    suffix: " GB",
  },
  {
    key: "nextScheduledBackup",
    title: "Next Scheduled Backup",
    icon: "📅",
    formatter: (value) =>
      value ? new Date(value).toLocaleString() : "--",
  },
  {
    key: "healthScore",
    title: "Backup Health Score",
    icon: "📊",
    suffix: "/100",
  },
];

function BackupCard({
  title,
  value,
  icon,
  suffix = "",
  formatter,
}) {
  const displayValue = formatter
    ? formatter(value)
    : `${value ?? "--"}${suffix}`;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-3xl">{icon}</span>
        <span className="text-xl font-bold text-right">
          {displayValue}
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        {title}
      </p>
    </div>
  );
}

export default function BackupOverview({
  loading,
  data = {},
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading backup overview...
      </div>
    );
  }

  const overview = data.overview || {};

  return (
    <div>

      <div className="mb-5">
        <h2 className="text-2xl font-bold">
          Backup Overview
        </h2>

        <p className="text-gray-500">
          Current backup status and system health.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {BACKUP_CARDS.map((card) => (
          <BackupCard
            key={card.key}
            title={card.title}
            value={overview[card.key]}
            icon={card.icon}
            suffix={card.suffix}
            formatter={card.formatter}
          />
        ))}

      </div>

    </div>
  );
}

const SECURITY_CARDS = [
  {
    key: "securityScore",
    title: "Security Score",
    icon: "🛡️",
    suffix: "/100",
  },
  {
    key: "activeSessions",
    title: "Active Sessions",
    icon: "👥",
  },
  {
    key: "activeApiKeys",
    title: "Active API Keys",
    icon: "🔑",
  },
  {
    key: "securityAlerts",
    title: "Open Alerts",
    icon: "🚨",
  },
  {
    key: "failedLogins",
    title: "Failed Logins (24h)",
    icon: "❌",
  },
  {
    key: "suspiciousLogins",
    title: "Suspicious Logins",
    icon: "🌍",
  },
  {
    key: "twoFactorEnabled",
    title: "2FA Enabled Users",
    icon: "🔒",
    suffix: "%",
  },
  {
    key: "blockedIps",
    title: "Blocked IPs",
    icon: "🚫",
  },
];

function SecurityCard({
  title,
  value,
  icon,
  suffix = "",
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">

      <div className="flex items-center justify-between">
        <span className="text-3xl">{icon}</span>

        <span className="text-3xl font-bold">
          {value ?? "--"}
          {suffix}
        </span>
      </div>

      <p className="mt-5 text-sm text-gray-500">
        {title}
      </p>
    </div>
  );
}

export default function SecurityOverview({
  loading,
  data = {},
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading security overview...
      </div>
    );
  }

  const overview = data.overview || {};

  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold">
          Security Overview
        </h2>

        <p className="text-gray-500">
          Current platform security status.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {SECURITY_CARDS.map((card) => (
          <SecurityCard
            key={card.key}
            title={card.title}
            value={overview[card.key]}
            icon={card.icon}
            suffix={card.suffix}
          />
        ))}
      </div>
    </div>
  );
}

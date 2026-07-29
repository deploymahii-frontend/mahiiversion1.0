const STATUS_CONFIG = {
  ACTIVE: {
    label: "Active",
    className: "bg-green-100 text-green-700",
  },

  PENDING: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700",
  },

  SUSPENDED: {
    label: "Suspended",
    className: "bg-red-100 text-red-700",
  },

  DEACTIVATED: {
    label: "Deactivated",
    className: "bg-gray-200 text-gray-700",
  },
};

export default function UserStatusBadge({
  status = "ACTIVE",
}) {
  const config =
    STATUS_CONFIG[status] ||
    STATUS_CONFIG.ACTIVE;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

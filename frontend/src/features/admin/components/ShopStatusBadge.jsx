const STATUS_CONFIG = {
  APPROVED: {
    label: "Approved",
    className: "bg-green-100 text-green-700",
  },

  PENDING: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700",
  },

  REJECTED: {
    label: "Rejected",
    className: "bg-red-100 text-red-700",
  },

  SUSPENDED: {
    label: "Suspended",
    className: "bg-gray-200 text-gray-700",
  },
};

export default function ShopStatusBadge({
  status = "PENDING",
}) {
  const config =
    STATUS_CONFIG[status] ||
    STATUS_CONFIG.PENDING;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

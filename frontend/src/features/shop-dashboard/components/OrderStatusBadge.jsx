const STATUS_STYLES = {
  PLACED: {
    label: "Placed",
    className: "bg-blue-100 text-blue-700",
  },
  ACCEPTED: {
    label: "Accepted",
    className: "bg-green-100 text-green-700",
  },
  PREPARING: {
    label: "Preparing",
    className: "bg-orange-100 text-orange-700",
  },
  READY: {
    label: "Ready",
    className: "bg-purple-100 text-purple-700",
  },
  OUT_FOR_DELIVERY: {
    label: "Out for Delivery",
    className: "bg-indigo-100 text-indigo-700",
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-emerald-100 text-emerald-700",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700",
  },
};

export default function OrderStatusBadge({ status }) {
  const config =
    STATUS_STYLES[status] || {
      label: status || "Unknown",
      className: "bg-gray-100 text-gray-700",
    };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

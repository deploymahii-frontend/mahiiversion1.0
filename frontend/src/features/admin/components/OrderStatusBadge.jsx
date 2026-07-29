const ORDER_STATUS_CONFIG = {
  PLACED: {
    label: "Placed",
    className: "bg-yellow-100 text-yellow-700",
  },

  CONFIRMED: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-700",
  },

  PREPARING: {
    label: "Preparing",
    className: "bg-orange-100 text-orange-700",
  },

  READY: {
    label: "Ready",
    className: "bg-indigo-100 text-indigo-700",
  },

  OUT_FOR_DELIVERY: {
    label: "Out for Delivery",
    className: "bg-purple-100 text-purple-700",
  },

  DELIVERED: {
    label: "Delivered",
    className: "bg-green-100 text-green-700",
  },

  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700",
  },
};

export default function OrderStatusBadge({
  status = "PLACED",
}) {
  const config =
    ORDER_STATUS_CONFIG[status] ||
    ORDER_STATUS_CONFIG.PLACED;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

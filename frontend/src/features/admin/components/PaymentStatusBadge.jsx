const PAYMENT_STATUS_CONFIG = {
  PAID: {
    label: "Paid",
    className: "bg-green-100 text-green-700",
  },

  PENDING: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700",
  },

  FAILED: {
    label: "Failed",
    className: "bg-red-100 text-red-700",
  },

  REFUNDED: {
    label: "Refunded",
    className: "bg-blue-100 text-blue-700",
  },

  PARTIALLY_REFUNDED: {
    label: "Partially Refunded",
    className: "bg-indigo-100 text-indigo-700",
  },

  COD: {
    label: "Cash on Delivery",
    className: "bg-orange-100 text-orange-700",
  },
};

export default function PaymentStatusBadge({
  status = "PENDING",
}) {
  const config =
    PAYMENT_STATUS_CONFIG[status] ||
    PAYMENT_STATUS_CONFIG.PENDING;

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

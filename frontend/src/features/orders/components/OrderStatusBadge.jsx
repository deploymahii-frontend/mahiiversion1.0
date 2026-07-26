const STATUS_STYLES = {
  PLACED: "bg-blue-100 text-blue-700",
  ACCEPTED: "bg-green-100 text-green-700",
  PREPARING: "bg-orange-100 text-orange-700",
  OUT_FOR_DELIVERY: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function OrderStatusBadge({ status }) {
  const label = status?.replace(/_/g, " ") || "PLACED";
  const className = STATUS_STYLES[status] || "bg-gray-100 text-gray-700";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${className}`}>
      {label}
    </span>
  );
}

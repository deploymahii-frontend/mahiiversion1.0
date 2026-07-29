export default function ProductStatusBadge({
  available = true,
}) {
  const config = available
    ? {
        label: "Active",
        className: "bg-green-100 text-green-700",
      }
    : {
        label: "Inactive",
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

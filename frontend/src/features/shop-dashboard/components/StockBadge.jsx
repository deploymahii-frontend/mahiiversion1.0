export default function StockBadge({ stock = 0 }) {
  let label = "";
  let className = "";

  if (stock <= 0) {
    label = "Out of Stock";
    className = "bg-red-100 text-red-700";
  } else if (stock <= 10) {
    label = `Low Stock (${stock})`;
    className = "bg-yellow-100 text-yellow-700";
  } else {
    label = `${stock} In Stock`;
    className = "bg-green-100 text-green-700";
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

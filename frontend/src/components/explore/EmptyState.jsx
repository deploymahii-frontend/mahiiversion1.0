import { FiSearch } from "react-icons/fi";

export default function EmptyState({
  title = "No Shops Found",
  message = "Try another keyword or category.",
}) {
  return (
    <div className="py-20 text-center">
      <FiSearch size={70} className="mx-auto text-gray-300" />
      <h2 className="mt-6 text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-gray-500">{message}</p>
    </div>
  );
}

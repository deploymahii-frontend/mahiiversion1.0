export default function OrderFilters({ filters, activeFilter, onChange }) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            activeFilter === filter ? "bg-black text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

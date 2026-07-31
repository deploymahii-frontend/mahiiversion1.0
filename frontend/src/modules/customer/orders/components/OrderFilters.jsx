const filters = [
  { label: "All Orders", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Cancelled", value: "CANCELLED" },
];

export default function OrderFilters({ activeFilter, onFilterChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-5 py-2.5 rounded-full font-medium text-sm transition-colors whitespace-nowrap ${
            activeFilter === filter.value
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

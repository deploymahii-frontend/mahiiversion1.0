export default function FilterBar({ categories = [], category, setCategory }) {
  const items = Array.isArray(categories) ? categories : [];

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setCategory(item)}
          className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
            category === item
              ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
              : "bg-white text-gray-700 dark:bg-slate-800 dark:text-slate-200 border border-gray-200 dark:border-slate-700 hover:bg-gray-50"
          }`}
        >
          {item.charAt(0).toUpperCase() + item.slice(1).replace(/_/g, ' ')}
        </button>
      ))}
    </div>
  );
}

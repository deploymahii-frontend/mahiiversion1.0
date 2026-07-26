export default function FilterBar({ categories, category, setCategory }) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => setCategory(item)}
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            category === item ? "bg-orange-500 text-white" : "bg-white text-gray-700 border"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

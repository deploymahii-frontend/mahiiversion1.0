import { useEffect, useMemo, useState } from "react";

export default function ShopCategories({ categories = [], selected, onChange }) {
  const categoryOptions = useMemo(() => {
    const unique = Array.from(new Set(categories.filter(Boolean)));
    return ["All", ...unique];
  }, [categories]);

  const [active, setActive] = useState(selected || "All");

  useEffect(() => {
    setActive(selected || "All");
  }, [selected]);

  const handleSelect = (category) => {
    setActive(category);
    onChange?.(category);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Menu</h2>
          <p className="text-sm text-slate-500 mt-1">
            {categoryOptions.length - 1} category{categoryOptions.length - 1 === 1 ? "" : "ies"}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 overflow-x-auto pb-2">
        {categoryOptions.map((cat) => {
          const isSelected = active === cat;
          return (
            <button
              key={cat}
              onClick={() => handleSelect(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${
                isSelected
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-slate-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

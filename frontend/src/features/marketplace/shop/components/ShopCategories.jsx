import { useState } from "react";

export default function ShopCategories({ categories = [] }) {
  const [selected, setSelected] = useState("all");

  const defaultCategories = ["All", "Meals", "Breakfast", "Snacks", "Desserts"];

  return (
    <div className="p-6 border-b">
      <div className="flex gap-3 overflow-x-auto pb-2">
        {defaultCategories.map((cat) => {
          const catKey = cat.toLowerCase();
          const isSelected = selected === catKey;
          
          return (
            <button
              key={catKey}
              onClick={() => setSelected(catKey)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition ${
                isSelected
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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

import { useState } from "react";
import { FiSearch, FiMic } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const popularSearches = [
  "Mess",
  "Cafe",
  "Pizza",
  "Burger",
  "Tea",
  "Thali",
  "Bakery",
  "Healthy Food",
];

const mockSuggestions = [
  "Shree Mess",
  "Burger King",
  "Cafe Brew",
  "Biotech Canteen",
  "EPH Cafe",
];

export default function SearchSection() {
  const [query, setQuery] = useState("");

  const filtered = mockSuggestions.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="max-w-7xl mx-auto px-5 mt-6">
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

        <input
          type="text"
          placeholder="Search restaurants, mess, cafés..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-14 rounded-2xl border border-gray-200 bg-white pl-12 pr-14 outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">
          <FiMic size={22} />
        </button>

        <AnimatePresence>
          {query && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 right-0 mt-2 rounded-2xl bg-white shadow-lg border border-gray-100 overflow-hidden z-20"
            >
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="w-full text-left px-4 py-3 hover:bg-orange-50 transition"
                  >
                    {item}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500">
                  No results found
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-3 overflow-x-auto mt-5 pb-2 scrollbar-hide">
        {popularSearches.map((item) => (
          <button
            key={item}
            className="whitespace-nowrap rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700 hover:bg-orange-200 transition"
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}

import { useState } from "react";

const STATUS_OPTIONS = [
  "ALL",
  "PENDING",
  "APPROVED",
  "REJECTED",
  "SUSPENDED",
];

const CATEGORY_OPTIONS = [
  "ALL",
  "MESS",
  "RESTAURANT",
  "CAFE",
  "HOTEL",
  "BAKERY",
  "GROCERY",
];

export default function ShopFilters({
  onChange,
}) {
  const [filters, setFilters] = useState({
    search: "",
    status: "ALL",
    category: "ALL",
    city: "",
  });

  function updateFilter(key, value) {
    const next = {
      ...filters,
      [key]: value,
    };

    setFilters(next);

    onChange?.(next);
  }

  function resetFilters() {
    const next = {
      search: "",
      status: "ALL",
      category: "ALL",
      city: "",
    };

    setFilters(next);

    onChange?.(next);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="grid gap-4 md:grid-cols-4">

        <input
          type="text"
          placeholder="Search shop..."
          value={filters.search}
          onChange={(e) =>
            updateFilter("search", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
        />

        <select
          value={filters.status}
          onChange={(e) =>
            updateFilter("status", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status}>
              {status}
            </option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(e) =>
            updateFilter("category", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2"
        >
          {CATEGORY_OPTIONS.map((category) => (
            <option key={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="City"
          value={filters.city}
          onChange={(e) =>
            updateFilter("city", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
        />

      </div>

      <div className="mt-4 flex justify-end">

        <button
          onClick={resetFilters}
          className="rounded-xl bg-gray-800 px-5 py-2 text-white hover:bg-black"
        >
          Reset Filters
        </button>

      </div>

    </div>
  );
}

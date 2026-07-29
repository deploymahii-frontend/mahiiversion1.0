import { useState } from "react";

const STATUS_OPTIONS = [
  "ALL",
  "ACTIVE",
  "INACTIVE",
];

export default function CategoryFilters({
  onChange,
}) {
  const [filters, setFilters] = useState({
    search: "",
    status: "ALL",
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
    };

    setFilters(next);

    onChange?.(next);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="grid gap-4 md:grid-cols-2">

        <input
          type="text"
          placeholder="Search category..."
          value={filters.search}
          onChange={(e) =>
            updateFilter("search", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
        />

        <select
          value={filters.status}
          onChange={(e) =>
            updateFilter("status", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-3"
        >
          {STATUS_OPTIONS.map((status) => (
            <option
              key={status}
              value={status}
            >
              {status}
            </option>
          ))}
        </select>

      </div>

      <div className="mt-4 flex justify-end">

        <button
          type="button"
          onClick={resetFilters}
          className="rounded-xl bg-gray-800 px-5 py-2 text-white hover:bg-black"
        >
          Reset Filters
        </button>

      </div>

    </div>
  );
}

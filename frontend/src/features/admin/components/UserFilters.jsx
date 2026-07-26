import { useState } from "react";

const ROLE_OPTIONS = [
  "ALL",
  "CUSTOMER",
  "SHOP_OWNER",
  "DELIVERY_PARTNER",
  "ADMIN",
  "SUPER_ADMIN",
];

const STATUS_OPTIONS = [
  "ALL",
  "ACTIVE",
  "PENDING",
  "SUSPENDED",
  "DEACTIVATED",
];

export default function UserFilters({
  onChange,
}) {
  const [filters, setFilters] = useState({
    search: "",
    role: "ALL",
    status: "ALL",
    joinedFrom: "",
    joinedTo: "",
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
      role: "ALL",
      status: "ALL",
      joinedFrom: "",
      joinedTo: "",
    };

    setFilters(next);
    onChange?.(next);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="grid gap-4 lg:grid-cols-5">

        <input
          type="text"
          placeholder="Search name or email..."
          value={filters.search}
          onChange={(e) =>
            updateFilter("search", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
        />

        <select
          value={filters.role}
          onChange={(e) =>
            updateFilter("role", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2"
        >
          {ROLE_OPTIONS.map((role) => (
            <option key={role} value={role}>
              {role.replaceAll("_", " ")}
            </option>
          ))}
        </select>

        <select
          value={filters.status}
          onChange={(e) =>
            updateFilter("status", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2"
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status.replaceAll("_", " ")}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filters.joinedFrom}
          onChange={(e) =>
            updateFilter("joinedFrom", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2"
        />

        <input
          type="date"
          value={filters.joinedTo}
          onChange={(e) =>
            updateFilter("joinedTo", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2"
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

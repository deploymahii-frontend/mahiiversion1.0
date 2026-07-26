import { useState, useEffect } from "react";

const DEFAULT_FILTERS = {
  search: "",
  module: "",
  action: "",
  admin: "",
  fromDate: "",
  toDate: "",
};

const MODULE_OPTIONS = [
  "Users",
  "Shops",
  "Orders",
  "Products",
  "Payments",
  "Reports",
  "Settings",
];

const ACTION_OPTIONS = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "APPROVE",
  "REJECT",
  "LOGIN",
  "LOGOUT",
];

export default function AuditFilters({
  filters = DEFAULT_FILTERS,
  onChange,
}) {
  const [localFilters, setLocalFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    setLocalFilters({
      ...DEFAULT_FILTERS,
      ...filters,
    });
  }, [filters]);

  function updateField(key, value) {
    const updated = {
      ...localFilters,
      [key]: value,
    };

    setLocalFilters(updated);
    onChange?.(updated);
  }

  function resetFilters() {
    setLocalFilters(DEFAULT_FILTERS);
    onChange?.(DEFAULT_FILTERS);
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Audit Filters
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

        <input
          type="text"
          placeholder="Search..."
          value={localFilters.search}
          onChange={(e) =>
            updateField("search", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-3"
        />

        <select
          value={localFilters.module}
          onChange={(e) =>
            updateField("module", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-3"
        >
          <option value="">All Modules</option>

          {MODULE_OPTIONS.map((module) => (
            <option key={module} value={module}>
              {module}
            </option>
          ))}
        </select>

        <select
          value={localFilters.action}
          onChange={(e) =>
            updateField("action", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-3"
        >
          <option value="">All Actions</option>

          {ACTION_OPTIONS.map((action) => (
            <option key={action} value={action}>
              {action}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Administrator"
          value={localFilters.admin}
          onChange={(e) =>
            updateField("admin", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-3"
        />

        <input
          type="date"
          value={localFilters.fromDate}
          onChange={(e) =>
            updateField("fromDate", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-3"
        />

        <input
          type="date"
          value={localFilters.toDate}
          onChange={(e) =>
            updateField("toDate", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-3"
        />

      </div>

      <div className="mt-6 flex justify-end">

        <button
          onClick={resetFilters}
          className="rounded-xl border px-5 py-3 hover:bg-gray-100"
        >
          Reset Filters
        </button>

      </div>

    </div>
  );
}

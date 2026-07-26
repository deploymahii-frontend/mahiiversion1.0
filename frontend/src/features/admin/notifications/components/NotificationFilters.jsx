import { useEffect, useState } from "react";

const DEFAULT_FILTERS = {
  search: "",
  type: "",
  priority: "",
  audience: "",
  status: "",
  fromDate: "",
  toDate: "",
};

const TYPES = [
  "SYSTEM",
  "ORDER",
  "PAYMENT",
  "SHOP",
  "USER",
  "SECURITY",
  "PROMOTION",
  "MAINTENANCE",
];

const PRIORITIES = [
  "LOW",
  "MEDIUM",
  "HIGH",
  "CRITICAL",
];

const AUDIENCES = [
  "ALL",
  "CUSTOMERS",
  "SHOP_OWNERS",
  "DELIVERY_PARTNERS",
  "ADMINS",
];

export default function NotificationFilters({
  filters = DEFAULT_FILTERS,
  onChange,
}) {
  const [localFilters, setLocalFilters] =
    useState(DEFAULT_FILTERS);

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
        Notification Filters
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

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
          value={localFilters.type}
          onChange={(e) =>
            updateField("type", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-3"
        >
          <option value="">All Types</option>

          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={localFilters.priority}
          onChange={(e) =>
            updateField("priority", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-3"
        >
          <option value="">All Priorities</option>

          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>

        <select
          value={localFilters.audience}
          onChange={(e) =>
            updateField("audience", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-3"
        >
          <option value="">All Audiences</option>

          {AUDIENCES.map((audience) => (
            <option key={audience} value={audience}>
              {audience.replaceAll("_", " ")}
            </option>
          ))}
        </select>

        <select
          value={localFilters.status}
          onChange={(e) =>
            updateField("status", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-3"
        >
          <option value="">All Status</option>
          <option value="UNREAD">Unread</option>
          <option value="READ">Read</option>
        </select>

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

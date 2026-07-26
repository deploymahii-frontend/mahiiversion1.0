import { FiFilter, FiSearch, FiRotateCcw } from "react-icons/fi";
import { useState } from "react";

export default function FeatureFlagFilters({ onChange, onReset }) {
  const [filters, setFilters] = useState({
    search: "",
    environment: "",
    status: "",
    role: "",
    country: "",
    city: "",
    rollout: "",
  });

  const update = (field, value) => {
    const updated = {
      ...filters,
      [field]: value,
    };

    setFilters(updated);
    onChange?.(updated);
  };

  const reset = () => {
    const empty = {
      search: "",
      environment: "",
      status: "",
      role: "",
      country: "",
      city: "",
      rollout: "",
    };

    setFilters(empty);
    onReset?.();
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <FiFilter size={22} />
        <h2 className="text-xl font-semibold">Filters</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="relative">
          <FiSearch className="absolute left-3 top-4 text-gray-400" />
          <input
            value={filters.search}
            onChange={(e) => update("search", e.target.value)}
            placeholder="Search feature..."
            className="w-full rounded-lg border py-3 pl-10 pr-4"
          />
        </div>

        <select
          value={filters.environment}
          onChange={(e) => update("environment", e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">Environment</option>
          <option>Development</option>
          <option>Staging</option>
          <option>Production</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => update("status", e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">Status</option>
          <option>Enabled</option>
          <option>Disabled</option>
          <option>Scheduled</option>
          <option>Expired</option>
        </select>

        <select
          value={filters.role}
          onChange={(e) => update("role", e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">Role</option>
          <option>ADMIN</option>
          <option>SHOP_OWNER</option>
          <option>CUSTOMER</option>
          <option>DELIVERY_PARTNER</option>
        </select>

        <input
          value={filters.country}
          onChange={(e) => update("country", e.target.value)}
          placeholder="Country"
          className="rounded-lg border p-3"
        />

        <input
          value={filters.city}
          onChange={(e) => update("city", e.target.value)}
          placeholder="City"
          className="rounded-lg border p-3"
        />

        <select
          value={filters.rollout}
          onChange={(e) => update("rollout", e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="">Rollout</option>
          <option>0%</option>
          <option>10%</option>
          <option>25%</option>
          <option>50%</option>
          <option>75%</option>
          <option>100%</option>
        </select>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-lg bg-gray-700 px-5 py-3 text-white hover:bg-gray-800"
        >
          <FiRotateCcw />
          Reset Filters
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";

const ORDER_STATUS_OPTIONS = [
  "ALL",
  "PLACED",
  "CONFIRMED",
  "PREPARING",
  "READY",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

const PAYMENT_STATUS_OPTIONS = [
  "ALL",
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
  "PARTIALLY_REFUNDED",
  "COD",
];

export default function OrderFilters({
  onChange,
}) {
  const [filters, setFilters] = useState({
    search: "",
    orderStatus: "ALL",
    paymentStatus: "ALL",
    fromDate: "",
    toDate: "",
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
      orderStatus: "ALL",
      paymentStatus: "ALL",
      fromDate: "",
      toDate: "",
    };

    setFilters(next);

    onChange?.(next);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="grid gap-4 lg:grid-cols-5">

        <input
          type="text"
          placeholder="Search Order / Customer / Shop"
          value={filters.search}
          onChange={(e) =>
            updateFilter("search", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none"
        />

        <select
          value={filters.orderStatus}
          onChange={(e) =>
            updateFilter("orderStatus", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2"
        >
          {ORDER_STATUS_OPTIONS.map((status) => (
            <option
              key={status}
              value={status}
            >
              {status.replaceAll("_", " ")}
            </option>
          ))}
        </select>

        <select
          value={filters.paymentStatus}
          onChange={(e) =>
            updateFilter("paymentStatus", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2"
        >
          {PAYMENT_STATUS_OPTIONS.map((status) => (
            <option
              key={status}
              value={status}
            >
              {status.replaceAll("_", " ")}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={filters.fromDate}
          onChange={(e) =>
            updateFilter("fromDate", e.target.value)
          }
          className="rounded-xl border border-gray-300 px-4 py-2"
        />

        <input
          type="date"
          value={filters.toDate}
          onChange={(e) =>
            updateFilter("toDate", e.target.value)
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

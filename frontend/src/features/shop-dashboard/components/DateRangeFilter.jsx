import { useState } from "react";

const OPTIONS = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
];

export default function DateRangeFilter({
  value = "30d",
  onChange,
}) {
  const [selected, setSelected] = useState(value);

  function handleChange(event) {
    const nextValue = event.target.value;

    setSelected(nextValue);

    onChange?.(nextValue);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

      <div>
        <h3 className="font-semibold">
          Analytics Range
        </h3>

        <p className="text-sm text-gray-500">
          Select the time period for reports.
        </p>
      </div>

      <select
        value={selected}
        onChange={handleChange}
        className="rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
      >
        {OPTIONS.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
}

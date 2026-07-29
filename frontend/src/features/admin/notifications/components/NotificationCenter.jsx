import {
  FiBell,
  FiSearch,
  FiPin,
  FiCheck,
  FiArchive,
} from "react-icons/fi";
import { useState } from "react";

const priorityColors = {
  CRITICAL: "border-l-red-600",
  HIGH: "border-l-orange-500",
  NORMAL: "border-l-blue-500",
  LOW: "border-l-gray-400",
};

export default function NotificationCenter({
  loading,
  notifications = [],
  onPin,
  onMarkRead,
  onArchive,
}) {
  const [query, setQuery] = useState("");

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-80 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const filtered = notifications.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          <FiBell size={24} />

          <div>
            <h2 className="text-2xl font-bold">
              Notification Center
            </h2>
            <p className="text-gray-500">
              Live operational notifications and alerts
            </p>
          </div>
        </div>

        <div className="relative w-72">

          <FiSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search notifications..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border py-2 pl-10 pr-4"
          />

        </div>

      </div>

      <div className="space-y-4">

        {filtered.map((item) => (

          <div
            key={item.id}
            className={`border-l-4 ${
              priorityColors[item.priority]
            } rounded-xl border bg-gray-50 p-5`}
          >

            <div className="flex items-start justify-between gap-4">

              <div>

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-gray-600">
                  {item.message}
                </p>

                <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
                  <span>{item.type}</span>
                  <span>{item.createdAt}</span>
                  <span>{item.priority}</span>
                </div>

              </div>

              <div className="flex gap-2">

                <button
                  onClick={() => onPin?.(item)}
                  className="rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-600"
                  title="Pin"
                >
                  <FiPin />
                </button>

                <button
                  onClick={() =>
                    onMarkRead?.(item)
                  }
                  className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
                  title="Mark Read"
                >
                  <FiCheck />
                </button>

                <button
                  onClick={() =>
                    onArchive?.(item)
                  }
                  className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700"
                  title="Archive"
                >
                  <FiArchive />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

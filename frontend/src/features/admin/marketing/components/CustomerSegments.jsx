import { useMemo, useState } from "react";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiUsers,
  FiMapPin,
  FiShoppingBag,
  FiTrendingUp,
  FiDollarSign,
} from "react-icons/fi";

export default function CustomerSegments({
  loading,
  segments = [],
  onCreateSegment,
  onEditSegment,
  onViewSegment,
}) {
  const [search, setSearch] = useState("");

  const filteredSegments = useMemo(() => {
    if (!search.trim()) return segments;

    return segments.filter((segment) =>
      [
        segment.name,
        segment.type,
        segment.location,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [segments, search]);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-72 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>

          <h2 className="text-2xl font-bold">
            Customer Segments
          </h2>

          <p className="text-gray-500">
            Manage dynamic and static marketing audiences.
          </p>

        </div>

        <button
          onClick={onCreateSegment}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <FiPlus />
          New Segment
        </button>

      </div>

      <div className="mb-6 relative max-w-md">

        <FiSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          className="w-full rounded-lg border py-2 pl-10 pr-4"
          placeholder="Search segments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredSegments.map((segment) => (

          <div
            key={segment.id}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >

            <div className="mb-5 flex items-center justify-between">

              <div>

                <h3 className="text-lg font-bold">
                  {segment.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {segment.type}
                </p>

              </div>

              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <FiUsers size={22} />
              </div>

            </div>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between">

                <span className="flex items-center gap-2">
                  <FiUsers />
                  Customers
                </span>

                <strong>{segment.customers}</strong>

              </div>

              <div className="flex justify-between">

                <span className="flex items-center gap-2">
                  <FiMapPin />
                  Region
                </span>

                <strong>{segment.location}</strong>

              </div>

              <div className="flex justify-between">

                <span className="flex items-center gap-2">
                  <FiShoppingBag />
                  Avg Orders
                </span>

                <strong>{segment.avgOrders}</strong>

              </div>

              <div className="flex justify-between">

                <span className="flex items-center gap-2">
                  <FiDollarSign />
                  Avg Spend
                </span>

                <strong>₹{segment.avgSpend}</strong>

              </div>

              <div className="flex justify-between">

                <span className="flex items-center gap-2">
                  <FiTrendingUp />
                  Growth
                </span>

                <strong>{segment.growth}%</strong>

              </div>

            </div>

            <div className="mt-6 flex gap-3">

              <button
                onClick={() => onViewSegment?.(segment)}
                className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                View
              </button>

              <button
                onClick={() => onEditSegment?.(segment)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                <FiEdit2 />
                Edit
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

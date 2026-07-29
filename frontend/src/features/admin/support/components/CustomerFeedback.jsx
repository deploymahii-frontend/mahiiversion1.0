import { useMemo, useState } from "react";
import {
  FiSearch,
  FiStar,
  FiAlertTriangle,
  FiTrendingUp,
  FiMessageSquare,
} from "react-icons/fi";

const sentimentStyles = {
  POSITIVE: "bg-green-100 text-green-700",
  NEUTRAL: "bg-yellow-100 text-yellow-700",
  NEGATIVE: "bg-red-100 text-red-700",
};

export default function CustomerFeedback({
  loading,
  feedback = [],
  summary = {},
  onViewFeedback,
}) {
  const [search, setSearch] = useState("");

  const filteredFeedback = useMemo(() => {
    if (!search.trim()) return feedback;

    return feedback.filter((item) =>
      [item.customer, item.category, item.comment]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [feedback, search]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            Customer Feedback
          </h2>
          <p className="text-gray-500">
            CSAT ratings and customer reviews
          </p>
        </div>

        <div className="relative w-72">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search feedback..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border py-2 pl-10 pr-4"
          />
        </div>

      </div>

      {/* Summary */}

      <div className="mb-8 grid gap-4 md:grid-cols-4">

        <div className="rounded-xl bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <FiStar className="text-green-600" />
            <span className="font-medium">Average CSAT</span>
          </div>
          <p className="mt-2 text-2xl font-bold">
            {summary.averageCSAT ?? 0}/5
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 p-4">
          <div className="flex items-center gap-2">
            <FiTrendingUp className="text-blue-600" />
            <span className="font-medium">Positive</span>
          </div>
          <p className="mt-2 text-2xl font-bold">
            {summary.positive ?? 0}
          </p>
        </div>

        <div className="rounded-xl bg-yellow-50 p-4">
          <div className="flex items-center gap-2">
            <FiMessageSquare className="text-yellow-600" />
            <span className="font-medium">Neutral</span>
          </div>
          <p className="mt-2 text-2xl font-bold">
            {summary.neutral ?? 0}
          </p>
        </div>

        <div className="rounded-xl bg-red-50 p-4">
          <div className="flex items-center gap-2">
            <FiAlertTriangle className="text-red-600" />
            <span className="font-medium">Negative</span>
          </div>
          <p className="mt-2 text-2xl font-bold">
            {summary.negative ?? 0}
          </p>
        </div>

      </div>

      {/* Feedback List */}

      <div className="space-y-4">

        {filteredFeedback.map((item) => (

          <div
            key={item.id}
            className="rounded-xl border p-5"
          >

            <div className="flex flex-wrap items-center justify-between gap-3">

              <div>
                <h3 className="font-semibold">
                  {item.customer}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.category}
                </p>
              </div>

              <div className="flex items-center gap-3">

                <div className="flex items-center gap-1">
                  <FiStar className="text-yellow-500" />
                  <span>{item.rating}/5</span>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    sentimentStyles[item.sentiment]
                  }`}
                >
                  {item.sentiment}
                </span>

              </div>

            </div>

            <p className="mt-4 text-gray-700">
              {item.comment}
            </p>

            <div className="mt-4 flex items-center justify-between">

              <span className="text-sm text-gray-500">
                {item.createdAt}
              </span>

              <button
                onClick={() => onViewFeedback?.(item)}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                View Details
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

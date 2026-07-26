import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function StatCard({
  title,
  value,
  icon,
  change = 0,
  changeLabel = "vs yesterday",
  color = "violet",
  loading = false,
}) {
  const isPositive = change >= 0;

  const colors = {
    violet: "bg-violet-100 text-violet-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-24 mb-6" />
        <div className="h-10 bg-gray-200 rounded w-32 mb-6" />
        <div className="h-4 bg-gray-200 rounded w-20" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-3">
            {value}
          </h2>
        </div>

        <div
          className={`h-14 w-14 rounded-2xl flex items-center justify-center ${colors[color]}`}>
          {icon}
        </div>

      </div>

      <div className="flex items-center gap-2 mt-6">

        {isPositive ? (
          <ArrowUpRight
            size={18}
            className="text-green-600"
          />
        ) : (
          <ArrowDownRight
            size={18}
            className="text-red-600"
          />
        )}

        <span
          className={`font-semibold ${
            isPositive
              ? "text-green-600"
              : "text-red-600"
          }`}>
          {Math.abs(change)}%
        </span>

        <span className="text-gray-500 text-sm">
          {changeLabel}
        </span>

      </div>

    </div>
  );
}

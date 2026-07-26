import { FiTrendingUp } from "react-icons/fi";

export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = "positive",
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">{value}</h2>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100">
          {Icon && <Icon size={28} className="text-orange-500" />}
        </div>
      </div>

      {change && (
        <div className="mt-5 flex items-center gap-2">
          <FiTrendingUp
            className={changeType === "positive" ? "text-green-500" : "text-red-500"}
          />

          <span className={changeType === "positive" ? "text-green-600" : "text-red-600"}>
            {change}
          </span>

          <span className="text-gray-500">vs last week</span>
        </div>
      )}
    </div>
  );
}

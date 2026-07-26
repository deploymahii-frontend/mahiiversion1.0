import {
  FiFlag,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiTrendingUp,
  FiGlobe,
  FiRefreshCw,
  FiLayers,
} from "react-icons/fi";

const cards = [
  {
    key: "total",
    title: "Total Flags",
    icon: FiFlag,
    color: "bg-blue-500",
  },
  {
    key: "enabled",
    title: "Enabled",
    icon: FiCheckCircle,
    color: "bg-green-500",
  },
  {
    key: "disabled",
    title: "Disabled",
    icon: FiXCircle,
    color: "bg-red-500",
  },
  {
    key: "production",
    title: "Production",
    icon: FiGlobe,
    color: "bg-indigo-500",
  },
  {
    key: "scheduled",
    title: "Scheduled",
    icon: FiClock,
    color: "bg-amber-500",
  },
  {
    key: "rolloutAverage",
    title: "Avg Rollout",
    icon: FiTrendingUp,
    color: "bg-purple-500",
    suffix: "%",
  },
  {
    key: "updatedToday",
    title: "Updated Today",
    icon: FiRefreshCw,
    color: "bg-cyan-500",
  },
  {
    key: "expired",
    title: "Expired",
    icon: FiLayers,
    color: "bg-gray-500",
  },
];

export default function FeatureFlagStatistics({ loading, statistics = {} }) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-2xl bg-white" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div key={card.key} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <h3 className="mt-3 text-3xl font-bold">
                  {statistics[card.key] ?? 0}
                  {card.suffix || ""}
                </h3>
              </div>

              <div className={`${card.color} rounded-xl p-3 text-white`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import {
  FiTrendingUp,
  FiMail,
  FiMousePointer,
  FiGlobe,
  FiClock,
  FiSmartphone,
  FiBarChart2,
  FiLayers,
} from "react-icons/fi";

const metrics = [
  {
    key: "deliveryTrend",
    title: "Delivery Trend",
    suffix: "%",
    icon: FiTrendingUp,
    color: "bg-green-500",
  },
  {
    key: "openTrend",
    title: "Open Trend",
    suffix: "%",
    icon: FiMail,
    color: "bg-blue-500",
  },
  {
    key: "clickTrend",
    title: "Click Trend",
    suffix: "%",
    icon: FiMousePointer,
    color: "bg-indigo-500",
  },
  {
    key: "channelPerformance",
    title: "Channel Score",
    suffix: "%",
    icon: FiBarChart2,
    color: "bg-cyan-500",
  },
  {
    key: "regionalDelivery",
    title: "Regional Delivery",
    suffix: "%",
    icon: FiGlobe,
    color: "bg-teal-500",
  },
  {
    key: "deliveryLatency",
    title: "Latency",
    suffix: " ms",
    icon: FiClock,
    color: "bg-orange-500",
  },
  {
    key: "mobileReach",
    title: "Mobile Reach",
    suffix: "%",
    icon: FiSmartphone,
    color: "bg-purple-500",
  },
  {
    key: "campaignScore",
    title: "Campaign Score",
    suffix: "%",
    icon: FiLayers,
    color: "bg-pink-500",
  },
];

export default function NotificationAnalytics({
  loading,
  analytics = {},
}) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-4">
        {Array.from({ length: metrics.length }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.key}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {metric.title}
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  {analytics[metric.key] ?? 0}
                  {metric.suffix || ""}
                </h3>
              </div>

              <div
                className={`${metric.color} rounded-xl p-3 text-white`}
              >
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

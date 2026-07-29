import {
  FiBell,
  FiSend,
  FiMail,
  FiMousePointer,
  FiAlertCircle,
  FiCalendar,
  FiFileText,
  FiRadio,
  FiClock,
  FiActivity,
} from "react-icons/fi";

const cards = [
  {
    key: "notificationsSent",
    title: "Notifications Sent",
    icon: FiBell,
    color: "bg-blue-500",
  },
  {
    key: "deliveryRate",
    title: "Delivery Rate",
    icon: FiSend,
    suffix: "%",
    color: "bg-green-500",
  },
  {
    key: "openRate",
    title: "Open Rate",
    icon: FiMail,
    suffix: "%",
    color: "bg-indigo-500",
  },
  {
    key: "clickRate",
    title: "Click Rate",
    icon: FiMousePointer,
    suffix: "%",
    color: "bg-cyan-500",
  },
  {
    key: "failedDeliveries",
    title: "Failed Deliveries",
    icon: FiAlertCircle,
    color: "bg-red-500",
  },
  {
    key: "scheduledCampaigns",
    title: "Scheduled",
    icon: FiCalendar,
    color: "bg-orange-500",
  },
  {
    key: "activeTemplates",
    title: "Templates",
    icon: FiFileText,
    color: "bg-purple-500",
  },
  {
    key: "broadcastCampaigns",
    title: "Broadcasts",
    icon: FiRadio,
    color: "bg-pink-500",
  },
  {
    key: "averageDeliveryTime",
    title: "Avg Delivery",
    icon: FiClock,
    suffix: " ms",
    color: "bg-yellow-500",
  },
  {
    key: "channelHealth",
    title: "Channel Health",
    icon: FiActivity,
    suffix: "%",
    color: "bg-teal-500",
  },
];

export default function NotificationStatistics({
  loading,
  statistics = {},
}) {
  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: cards.length }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.key}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  {statistics[card.key] ?? 0}
                  {card.suffix || ""}
                </h3>
              </div>

              <div
                className={`${card.color} rounded-xl p-3 text-white`}
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

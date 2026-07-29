const TYPE_ICONS = {
  SYSTEM: "⚙️",
  ORDER: "🛒",
  PAYMENT: "💳",
  SHOP: "🏪",
  USER: "👤",
  SECURITY: "🛡️",
  PROMOTION: "🎉",
  MAINTENANCE: "🔧",
};

const PRIORITY_STYLES = {
  LOW: "bg-gray-100 text-gray-700",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-red-100 text-red-700",
};

export default function NotificationItem({
  notification,
  onView,
}) {
  const icon =
    TYPE_ICONS[notification.type] || "🔔";

  const priorityStyle =
    PRIORITY_STYLES[notification.priority] ||
    PRIORITY_STYLES.MEDIUM;

  function relativeTime(date) {
    const seconds = Math.floor(
      (Date.now() - new Date(date).getTime()) /
        1000
    );

    if (seconds < 60) return `${seconds}s ago`;

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);

    return `${days}d ago`;
  }

  return (
    <div
      className={`flex items-center justify-between gap-6 p-5 transition hover:bg-gray-50 ${
        !notification.read
          ? "border-l-4 border-orange-500 bg-orange-50/30"
          : ""
      }`}
    >
      <div className="flex flex-1 items-start gap-4">
        <div className="text-3xl">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">
              {notification.title}
            </h3>

            <span
              className={`rounded-full px-2 py-1 text-xs font-semibold ${priorityStyle}`}
            >
              {notification.priority}
            </span>

            <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
              {notification.type}
            </span>

            {!notification.read && (
              <span className="rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
                NEW
              </span>
            )}
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {notification.message}
          </p>

          <p className="mt-2 text-xs text-gray-500">
            {relativeTime(notification.createdAt)}
          </p>
        </div>
      </div>

      <button
        onClick={onView}
        className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
      >
        View
      </button>
    </div>
  );
}

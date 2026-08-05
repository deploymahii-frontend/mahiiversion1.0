import { FiActivity } from "react-icons/fi";

const formatDateTime = (value) => {
  if (!value) return "";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function RecentActivity({ data }) {
  const recentOrders = Array.isArray(data?.recentOrders) ? data.recentOrders : [];
  const pendingActions = Array.isArray(data?.pendingActions) ? data.pendingActions : [];

  const activities = [
    ...recentOrders.slice(0, 3).map((order) => ({
      id: order._id,
      text: `Order ${order.orderNumber || order.id} ${order.orderStatus || order.paymentStatus || "updated"}`,
      time: formatDateTime(order.createdAt),
      type: "order",
    })),
    ...pendingActions.slice(0, 3).map((action, index) => ({
      id: `action-${index}`,
      text: action.title,
      time: "",
      type: "system",
    })),
  ];

  const dotColor = (type) => {
    switch (type) {
      case "order":
        return "bg-emerald-400";
      case "system":
        return "bg-amber-400";
      default:
        return "bg-[#888]";
    }
  };

  const displayItems = activities.length > 0 ? activities : [
    { id: "empty", text: "No recent activity available.", time: "", type: "system" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#ededed]">Recent Activity</h3>
        <FiActivity size={14} className="text-[#666]" />
      </div>

      <div className="space-y-3">
        {displayItems.map((item, i) => (
          <div key={item.id || i} className="flex items-start gap-3 group">
            <div className="mt-1.5 relative">
              <span className={`block w-2 h-2 rounded-full ${dotColor(item.type)}`} />
              {i < displayItems.length - 1 && (
                <span className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-6 bg-[#222]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-[#ccc] group-hover:text-[#ededed] transition-colors truncate">{item.text}</p>
              <p className="text-[11px] text-[#555] font-mono mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

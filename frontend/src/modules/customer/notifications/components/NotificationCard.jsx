import { Package, Gift, Wallet, Bell, Crown, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const icons = {
  ORDER: Package,
  OFFER: Gift,
  PAYMENT: Wallet,
  GOLD: Crown,
  SYSTEM: Bell,
};

export default function NotificationCard({ notification }) {
  if (!notification) return null;

  const Icon = icons[notification.type] || Bell;
  const isRead = notification.read || notification.isRead;
  const actionRoute = notification.action?.route || (notification.type === "ORDER" ? `/customer/orders/${notification.action?.id || ""}` : null);

  const cardContent = (
    <div
      className={`rounded-2xl p-5 shadow-sm border transition flex items-start gap-4 ${
        isRead ? "bg-white border-slate-100" : "bg-blue-50/70 border-blue-200"
      }`}
    >
      <div className={`p-3 rounded-2xl ${isRead ? "bg-slate-100 text-slate-600" : "bg-blue-600 text-white"}`}>
        <Icon size={22} />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-slate-800 text-base">{notification.title}</h3>
          {!isRead && <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
        </div>
        <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
        <span className="text-xs text-slate-400 mt-2 block font-medium">{notification.createdAt || "Just now"}</span>
      </div>
    </div>
  );

  if (actionRoute) {
    return <Link to={actionRoute} className="block">{cardContent}</Link>;
  }

  return cardContent;
}

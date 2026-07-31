import { Bell, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotificationPreview({ notifications = [] }) {
  if (!notifications.length) return null;

  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm transition-colors">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl text-slate-900 dark:text-white">Notifications</h2>
        <Link to="/customer/notifications" className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1 hover:underline">
          View All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="space-y-4 mt-5">
        {notifications.slice(0, 3).map((item) => (
          <div
            key={item._id || item.id}
            className={`border-b border-slate-100 dark:border-slate-800 pb-4 last:border-b-0 last:pb-0 ${!item.isRead ? "opacity-100" : "opacity-60"}`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${!item.isRead ? "bg-blue-600 dark:bg-blue-400" : "bg-transparent"}`} />
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">{item.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

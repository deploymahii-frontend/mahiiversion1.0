import { CheckCheck } from "lucide-react";
import useNotifications from "../hooks/useNotifications";
import NotificationCard from "../components/NotificationCard";
import NotificationEmpty from "../components/NotificationEmpty";
import toast from "react-hot-toast";

export default function NotificationPage() {
  const { data = [], isLoading } = useNotifications();

  const notifications = data;

  const handleMarkAllRead = () => {
    toast.success("Marked all as read.");
  };

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Notifications</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Real-time alerts and promotional updates</p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/50 transition"
        >
          <CheckCheck size={18} />
          Mark all as read
        </button>
      </div>

      {!notifications.length ? (
        <NotificationEmpty />
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <NotificationCard key={notification._id || notification.id} notification={notification} />
          ))}
        </div>
      )}
    </div>
  );
}

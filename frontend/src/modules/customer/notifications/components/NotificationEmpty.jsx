import { Bell } from "lucide-react";

export default function NotificationEmpty() {
  return (
    <section className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm">
      <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
        <Bell size={40} />
      </div>

      <h2 className="text-2xl font-black text-slate-800 mt-6">All Caught Up!</h2>
      <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
        You have no new notifications right now. Important order updates and special offers will appear here.
      </p>
    </section>
  );
}

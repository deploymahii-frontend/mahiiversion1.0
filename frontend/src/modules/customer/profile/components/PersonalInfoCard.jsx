import { Mail, Phone, Calendar, UserCheck } from "lucide-react";

export default function PersonalInfoCard({ user = {} }) {
  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 transition-colors">
      <h3 className="font-bold text-lg text-slate-900 dark:text-white">
        Personal Information
      </h3>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Mail size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Email Address</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
              {user.email || "customer@mahii.in"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Phone size={18} />
          </div>
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Phone Number</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {user.phone || user.phoneNumber || "+91 9876543210"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Member Since</p>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {user.memberSince || "Jan 2026"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

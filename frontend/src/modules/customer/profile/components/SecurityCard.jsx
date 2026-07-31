import { Key } from "lucide-react";
import toast from "react-hot-toast";

export default function SecurityCard() {
  return (
    <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 transition-colors">
      <h3 className="font-bold text-lg text-slate-900 dark:text-white">Security</h3>
      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Key size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">Account Password</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500">Keep your password secure</p>
          </div>
        </div>

        <button
          onClick={() => toast.success("Password reset link sent to your registered email!")}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40"
        >
          Change
        </button>
      </div>
    </section>
  );
}

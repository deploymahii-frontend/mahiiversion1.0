import { Link } from "react-router-dom";
import { Clock, CheckCircle2, Store, FileText, Phone } from "lucide-react";

export default function ApprovalPending() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center space-y-8">

        {/* Animated Icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute w-32 h-32 rounded-full bg-amber-100 dark:bg-amber-950/40 animate-ping opacity-20" />
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl shadow-orange-500/20">
            <Clock size={40} className="text-white" />
          </div>
        </div>

        {/* Heading */}
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            Approval Pending
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm leading-relaxed max-w-sm mx-auto">
            Your shop registration has been submitted successfully!
            Our team will review your details and approve your shop within
            <strong className="text-slate-700 dark:text-slate-300"> 24–48 hours</strong>.
          </p>
        </div>

        {/* Status Timeline */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 text-left space-y-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={20} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Registration Submitted</p>
              <p className="text-xs text-slate-400">Your shop details have been received</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center flex-shrink-0 relative">
              <FileText size={20} className="text-amber-500" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-600 dark:text-amber-400">Under Review</p>
              <p className="text-xs text-slate-400">Admin team is reviewing your application</p>
            </div>
          </div>

          <div className="flex items-center gap-4 opacity-40">
            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
              <Store size={20} className="text-slate-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500">Shop Goes Live</p>
              <p className="text-xs text-slate-400">Start receiving orders from customers</p>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-2xl p-4 text-left">
          <div className="flex items-start gap-3">
            <Phone size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold text-blue-700 dark:text-blue-300">Need help?</p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-0.5">
                Contact our support team at <strong>support@mahii.in</strong> or call <strong>1800-MAHII-00</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard"
            className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-md"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/"
            className="border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

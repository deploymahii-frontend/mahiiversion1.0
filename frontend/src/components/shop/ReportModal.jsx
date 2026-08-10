import { useState } from "react";
import { FiX, FiAlertTriangle } from "react-icons/fi";
import { reportReview } from "../../services/review.service";
import toast from "react-hot-toast";

const REPORT_REASONS = [
  { id: "SPAM", label: "Spam or misleading" },
  { id: "FAKE_REVIEW", label: "Fake review or conflict of interest" },
  { id: "OFFENSIVE", label: "Offensive language or hate speech" },
  { id: "HARASSMENT", label: "Harassment or bullying" },
  { id: "WRONG_SHOP", label: "Posted for the wrong shop" },
  { id: "PROMOTIONAL", label: "Promotional content or advertising" },
  { id: "OTHER", label: "Other issue" },
];

export default function ReportModal({ isOpen, onClose, reviewId }) {
  const [reason, setReason] = useState("SPAM");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !reviewId) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await reportReview(reviewId, { reason, details });
      toast.success("Thank you. Report submitted for moderation.");
      onClose();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to submit report"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-800">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold">
            <FiAlertTriangle size={20} />
            <span>Report Review</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 font-medium">
            Please select a reason why you are reporting this review:
          </p>

          <div className="space-y-2.5 mb-6">
            {REPORT_REASONS.map((r) => (
              <label
                key={r.id}
                className={`flex items-center p-3 rounded-xl border cursor-pointer transition ${
                  reason === r.id
                    ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300 font-semibold"
                    : "border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-850"
                }`}
              >
                <input
                  type="radio"
                  name="reportReason"
                  value={r.id}
                  checked={reason === r.id}
                  onChange={() => setReason(r.id)}
                  className="accent-orange-500 mr-3"
                />
                <span className="text-sm">{r.label}</span>
              </label>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-1.5">
              Additional Details (Optional)
            </label>
            <textarea
              rows="3"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide extra context to help our moderators..."
              className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-3 border border-gray-200 dark:border-slate-800 rounded-xl text-gray-700 dark:text-slate-300 font-bold text-sm hover:bg-gray-50 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-md transition disabled:opacity-70 text-sm"
            >
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

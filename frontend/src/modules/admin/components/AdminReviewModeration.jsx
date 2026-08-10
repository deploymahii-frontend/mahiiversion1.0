import { useState, useEffect } from "react";
import { adminGetReviews, adminUpdateStatus } from "../../../services/review.service";
import { FiStar, FiAlertTriangle, FiEyeOff, FiTrash2, FiCheckCircle, FiRefreshCw } from "react-icons/fi";
import toast from "react-hot-toast";

export default function AdminReviewModeration() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("REPORTED");

  useEffect(() => {
    fetchReviews();
  }, [statusFilter]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const params = {};
      if (statusFilter !== "ALL") {
        params.status = statusFilter;
      }

      const res = await adminGetReviews(params);
      const data = res?.data?.data || {};
      setReviews(data.reviews || []);
    } catch (err) {
      console.error("Failed to load admin reviews", err);
      toast.error("Failed to load moderation reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (reviewId, newStatus) => {
    try {
      await adminUpdateStatus(reviewId, newStatus);
      toast.success(`Review status updated to ${newStatus}`);
      setReviews((prev) =>
        prev.map((r) => (r._id === reviewId ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      toast.error("Failed to update review status");
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "ACTIVE":
        return <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-0.5 rounded-full">ACTIVE</span>;
      case "REPORTED":
        return <span className="bg-amber-100 text-amber-800 font-bold text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1"><FiAlertTriangle size={10} /> REPORTED</span>;
      case "HIDDEN":
        return <span className="bg-slate-200 text-slate-700 font-bold text-[10px] px-2.5 py-0.5 rounded-full">HIDDEN</span>;
      case "REMOVED":
        return <span className="bg-red-100 text-red-800 font-bold text-[10px] px-2.5 py-0.5 rounded-full">REMOVED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-gray-100 dark:border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
            Review Moderation
          </h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
            Inspect reported reviews, manage visibility, and moderate user content
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {["REPORTED", "ACTIVE", "HIDDEN", "REMOVED", "ALL"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                statusFilter === st
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-gray-500">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="py-12 text-center text-gray-400 font-medium text-sm">
          No reviews found in this moderation queue.
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-5 rounded-2xl border border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950/40 space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900 dark:text-white">
                      {review.customer?.firstName || review.customer?.name || "User"}
                    </span>
                    <span className="text-xs text-gray-400">→</span>
                    <span className="font-bold text-xs text-orange-600 dark:text-orange-400">
                      {review.shop?.name || "Shop"}
                    </span>
                    {getStatusBadge(review.status)}
                  </div>
                  <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-0.5">
                    Posted on {new Date(review.createdAt).toLocaleDateString()} • Reports: {review.reportCount}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 px-2.5 py-1 rounded-xl text-xs font-bold">
                  <span>{review.rating}.0</span>
                  <FiStar size={12} className="fill-current" />
                </div>
              </div>

              {review.title && (
                <h5 className="font-bold text-xs text-gray-900 dark:text-slate-100">
                  {review.title}
                </h5>
              )}

              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
                {review.comment || review.review}
              </p>

              {/* Moderation Controls */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200/60 dark:border-slate-800 text-xs">
                {review.status !== "ACTIVE" && (
                  <button
                    onClick={() => handleStatusChange(review._id, "ACTIVE")}
                    className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-xl transition text-[11px]"
                  >
                    <FiCheckCircle size={12} />
                    <span>Approve & Restore</span>
                  </button>
                )}

                {review.status !== "HIDDEN" && (
                  <button
                    onClick={() => handleStatusChange(review._id, "HIDDEN")}
                    className="flex items-center gap-1 bg-slate-700 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-xl transition text-[11px]"
                  >
                    <FiEyeOff size={12} />
                    <span>Hide</span>
                  </button>
                )}

                {review.status !== "REMOVED" && (
                  <button
                    onClick={() => handleStatusChange(review._id, "REMOVED")}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-xl transition text-[11px]"
                  >
                    <FiTrash2 size={12} />
                    <span>Remove Permanently</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

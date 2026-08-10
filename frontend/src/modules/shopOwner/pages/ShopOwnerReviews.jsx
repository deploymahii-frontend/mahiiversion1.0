import { useState, useEffect } from "react";
import { getShopReviews, replyToReview, deleteOwnerReply } from "../../../services/review.service";
import api from "../../../services/api";
import {
  FiStar,
  FiCornerDownRight,
  FiMessageSquare,
  FiCheckCircle,
  FiTrash2,
  FiEdit3,
  FiSend,
} from "react-icons/fi";
import toast from "react-hot-toast";

export default function ShopOwnerReviews() {
  const [shop, setShop] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);

  useEffect(() => {
    fetchOwnerShopAndReviews();
  }, []);

  const fetchOwnerShopAndReviews = async () => {
    try {
      setLoading(true);
      // Fetch shop owner's shop
      const shopRes = await api.get("/shop/profile");
      const shopData = shopRes?.data?.data || shopRes?.data;
      const sId = shopData?._id || shopData?.id;

      if (!sId) {
        setLoading(false);
        return;
      }

      setShop(shopData);

      const reviewRes = await getShopReviews(sId);
      const resData = reviewRes?.data?.data || {};

      setReviews(resData.reviews || []);
      setSummary(resData.shopSummary || null);
    } catch (err) {
      console.error("Failed to load owner shop reviews", err);
      toast.error("Failed to load shop reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReply = (review) => {
    setReplyingId(review._id);
    setReplyText(review.ownerReply?.comment || "");
  };

  const handlePublishReply = async (reviewId) => {
    if (!replyText.trim()) {
      toast.error("Reply text cannot be empty");
      return;
    }

    try {
      setSubmittingReply(true);
      const res = await replyToReview(reviewId, { comment: replyText.trim() });
      const updatedReview = res?.data?.data;

      setReviews((prev) =>
        prev.map((r) => (r._id === reviewId ? { ...r, ...updatedReview } : r))
      );

      toast.success("Reply published successfully!");
      setReplyingId(null);
      setReplyText("");
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to publish reply";
      toast.error(msg);
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleDeleteReply = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete your response?")) return;

    try {
      const res = await deleteOwnerReply(reviewId);
      const updatedReview = res?.data?.data;

      setReviews((prev) =>
        prev.map((r) => (r._id === reviewId ? { ...r, ...updatedReview } : r))
      );

      toast.success("Reply deleted");
    } catch (err) {
      toast.error("Failed to delete reply");
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-slate-400">
        Loading shop reviews dashboard...
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-slate-400">
        No shop profile found for this owner account.
      </div>
    );
  }

  const avgRating = summary?.averageRating || shop?.averageRating || 0.0;
  const totalReviews = summary?.reviewCount || shop?.reviewCount || reviews.length;
  const distribution = summary?.ratingDistribution || shop?.ratingDistribution || {
    star5: 0,
    star4: 0,
    star3: 0,
    star2: 0,
    star1: 0,
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Customer Reviews & Ratings
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            {shop?.name} — Respond to customer feedback and build your store reputation
          </p>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm mb-8">
        <div className="flex flex-col items-center justify-center border-r border-gray-100 dark:border-slate-800 pr-4">
          <span className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
            Overall Rating
          </span>
          <div className="text-4xl font-black text-gray-900 dark:text-white mt-1 flex items-center gap-2">
            <span>{avgRating > 0 ? avgRating.toFixed(1) : "0.0"}</span>
            <FiStar size={24} className="fill-yellow-400 text-yellow-400" />
          </div>
          <span className="text-xs text-gray-500 dark:text-slate-400 mt-1 font-medium">
            {totalReviews} Total Customer Reviews
          </span>
        </div>

        <div className="sm:col-span-2 space-y-1.5 justify-center flex flex-col pl-4">
          {[5, 4, 3, 2, 1].map((s) => {
            const count = distribution[`star${s}`] || 0;
            const pct = totalReviews ? Math.round((count / totalReviews) * 100) : 0;
            return (
              <div key={s} className="flex items-center gap-3 text-xs">
                <span className="w-10 font-bold text-gray-700 dark:text-slate-300">
                  {s} Star
                </span>
                <div className="flex-1 h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
                <span className="w-10 text-right text-gray-400 font-medium">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review List */}
      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800">
          <FiMessageSquare size={36} className="mx-auto text-gray-300 dark:text-slate-700 mb-2" />
          <h3 className="text-sm font-bold text-gray-800 dark:text-slate-200">
            No reviews received yet
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            As customers complete orders from your shop, their feedback will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => {
            const customerName =
              review.customer?.firstName || review.customer?.name
                ? `${review.customer?.firstName || review.customer?.name} ${
                    review.customer?.lastName || ""
                  }`.trim()
                : "Customer";

            const isReplying = replyingId === review._id;

            return (
              <div
                key={review._id}
                className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold text-sm flex items-center justify-center">
                      {customerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-sm">
                        {customerName}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-gray-400 dark:text-slate-500">
                          {new Date(review.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        {review.isVerifiedPurchase && (
                          <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                            <FiCheckCircle size={10} />
                            Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 px-2.5 py-1 rounded-xl text-green-700 dark:text-green-400 font-bold text-xs">
                    <span>{review.rating}.0</span>
                    <FiStar size={12} className="fill-current" />
                  </div>
                </div>

                {review.title && (
                  <h5 className="font-bold text-gray-900 dark:text-slate-100 text-sm mt-3">
                    {review.title}
                  </h5>
                )}

                <p className="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  {review.comment || review.review}
                </p>

                {/* Existing Reply Display */}
                {review.ownerReply?.comment && !isReplying && (
                  <div className="mt-4 p-4 bg-orange-50/80 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/40 rounded-2xl">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-orange-700 dark:text-orange-300">
                        <FiCornerDownRight size={14} />
                        <span>Your Reply</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <button
                          onClick={() => handleOpenReply(review)}
                          className="text-gray-500 hover:text-orange-500 font-semibold p-1"
                        >
                          <FiEdit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteReply(review._id)}
                          className="text-red-500 hover:text-red-600 font-semibold p-1"
                        >
                          <FiTrash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed pl-5">
                      {review.ownerReply.comment}
                    </p>
                  </div>
                )}

                {/* Reply Form */}
                {isReplying ? (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 space-y-3">
                    <label className="block text-xs font-bold text-gray-700 dark:text-slate-300">
                      Write your official response to {customerName}:
                    </label>
                    <textarea
                      rows="3"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Thank the customer or address their concern gracefully..."
                      className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
                    ></textarea>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setReplyingId(null);
                          setReplyText("");
                        }}
                        className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-200 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handlePublishReply(review._id)}
                        disabled={submittingReply}
                        className="flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-1.5 rounded-xl shadow-sm transition disabled:opacity-50"
                      >
                        <FiSend size={12} />
                        <span>{submittingReply ? "Publishing..." : "Post Reply"}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  !review.ownerReply?.comment && (
                    <div className="mt-4 pt-3 border-t border-gray-50 dark:border-slate-850">
                      <button
                        onClick={() => handleOpenReply(review)}
                        className="flex items-center gap-1.5 text-xs font-bold text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800 px-3 py-1.5 rounded-xl transition"
                      >
                        <FiCornerDownRight size={14} />
                        <span>Reply to Customer</span>
                      </button>
                    </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

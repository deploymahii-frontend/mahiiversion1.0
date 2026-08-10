import { useState, useEffect } from "react";
import { getMyReviews, deleteReview, updateReview } from "../services/review.service";
import { FiStar, FiTrash2, FiEdit2, FiCheckCircle, FiX, FiMessageSquare } from "react-icons/fi";
import toast from "react-hot-toast";

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const fetchMyReviews = async () => {
    try {
      setLoading(true);
      const res = await getMyReviews();
      setReviews(res?.data?.data || []);
    } catch (err) {
      console.error("Failed to fetch my reviews", err);
      toast.error("Failed to load your reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await deleteReview(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      toast.success("Review deleted successfully");
    } catch (err) {
      toast.error("Failed to delete review");
    }
  };

  const openEditModal = (review) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment || review.review || "");
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingReview) return;

    try {
      setUpdating(true);
      const res = await updateReview(editingReview._id, {
        rating: editRating,
        comment: editComment,
      });

      const updated = res?.data?.data;
      setReviews((prev) =>
        prev.map((r) => (r._id === editingReview._id ? { ...r, ...updated } : r))
      );
      toast.success("Review updated successfully");
      setEditingReview(null);
    } catch (err) {
      toast.error("Failed to update review");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center dark:text-slate-200">
        Loading your reviews...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            My Reviews
          </h1>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            Manage your shop ratings and feedback
          </p>
        </div>
        <span className="text-xs font-bold bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full">
          {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
        </span>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800">
          <FiMessageSquare size={40} className="mx-auto text-gray-300 dark:text-slate-700 mb-3" />
          <h3 className="text-base font-bold text-gray-800 dark:text-slate-200">
            No reviews submitted yet
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Once you place and complete orders, you can write verified shop reviews here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-base">
                    {review.shop?.name || "Shop"}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400 dark:text-slate-500">
                      {new Date(review.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    {review.isVerifiedPurchase && (
                      <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                        <FiCheckCircle size={10} />
                        Verified Order
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 px-3 py-1 rounded-xl text-green-700 dark:text-green-400 font-bold text-xs">
                  <span>{review.rating}.0</span>
                  <FiStar size={12} className="fill-current" />
                </div>
              </div>

              {review.title && (
                <h4 className="font-bold text-gray-900 dark:text-slate-100 text-sm mt-3">
                  {review.title}
                </h4>
              )}

              <p className="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                {review.comment || review.review}
              </p>

              {review.ownerReply?.comment && (
                <div className="mt-4 p-4 bg-orange-50/70 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 rounded-2xl">
                  <p className="font-bold text-xs text-orange-700 dark:text-orange-300 mb-1">
                    Owner Reply:
                  </p>
                  <p className="text-xs text-gray-700 dark:text-slate-300">
                    {review.ownerReply.comment}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-50 dark:border-slate-850 justify-end text-xs">
                <button
                  onClick={() => openEditModal(review)}
                  className="flex items-center gap-1 text-gray-600 dark:text-slate-400 hover:text-orange-500 font-semibold transition px-2 py-1"
                >
                  <FiEdit2 size={13} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 font-semibold transition px-2 py-1"
                >
                  <FiTrash2 size={13} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Review Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl p-6 border border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-800 mb-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                Edit Review
              </h3>
              <button
                onClick={() => setEditingReview(null)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500"
              >
                <FiX size={18} />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="flex justify-center gap-2 my-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setEditRating(star)}
                    className="p-1"
                  >
                    <FiStar
                      size={28}
                      className={`${
                        star <= editRating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300 dark:text-slate-700"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Comment
                </label>
                <textarea
                  rows="4"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
                ></textarea>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="w-1/2 py-2.5 border border-gray-200 dark:border-slate-800 rounded-xl font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="w-1/2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

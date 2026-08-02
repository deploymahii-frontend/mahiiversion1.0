import { useState } from "react";
import { FiStar, FiX } from "react-icons/fi";
import { createReview } from "../../services/review.service";
import toast from "react-hot-toast";

export default function ReviewModal({ isOpen, onClose, shopId, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shopId) return;

    try {
      setLoading(true);
      const { data } = await createReview({
        shop: shopId,
        rating,
        review: comment,
      });
      
      toast.success("Review submitted successfully!");
      setComment("");
      setRating(5);
      
      if (onReviewSubmitted && data?.data) {
        onReviewSubmitted(data.data);
      }
      
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-800">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Write a Review</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition"
          >
            <FiX size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6 flex flex-col items-center">
            <p className="text-sm text-gray-500 dark:text-slate-400 mb-2 font-medium">How was your experience?</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none"
                >
                  <FiStar 
                    size={36} 
                    className={`${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-slate-700"}`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
              Share details of your own experience at this place
            </label>
            <textarea
              required
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white transition"
              placeholder="What did you like or dislike?"
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-md transition disabled:opacity-70"
          >
            {loading ? "Submitting..." : "Post Review"}
          </button>
        </form>
      </div>
    </div>
  );
}

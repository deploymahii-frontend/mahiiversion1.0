import { useState, useEffect } from "react";
import { FiStar, FiX, FiUploadCloud, FiTrash2, FiCheckCircle } from "react-icons/fi";
import { createReview, checkOrderEligibility } from "../../services/review.service";
import api from "../../services/api";
import toast from "react-hot-toast";

const RATING_LABELS = {
  1: "Terrible",
  2: "Poor",
  3: "Average",
  4: "Very Good",
  5: "Excellent",
};

export default function ReviewModal({
  isOpen,
  onClose,
  shopId,
  orderId = null,
  orderNumber = null,
  shopName = null,
  onReviewSubmitted,
}) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eligibility, setEligibility] = useState(null);

  useEffect(() => {
    if (isOpen && orderId) {
      fetchEligibility(orderId);
    }
  }, [isOpen, orderId]);

  const fetchEligibility = async (oId) => {
    try {
      const res = await checkOrderEligibility(oId);
      if (res?.data?.data) {
        setEligibility(res.data.data);
      }
    } catch (err) {
      console.error("Eligibility check failed", err);
    }
  };

  if (!isOpen) return null;

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (images.length + files.length > 5) {
      toast.error("Maximum 5 images allowed per review");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const response = await api.post("/uploads/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedUrls = response.data?.data?.urls || response.data?.data || [];
      const newUrls = Array.isArray(uploadedUrls)
        ? uploadedUrls.map((u) => (typeof u === "string" ? u : u.url))
        : [uploadedUrls.url || uploadedUrls];

      setImages((prev) => [...prev, ...newUrls]);
      toast.success("Images uploaded successfully!");
    } catch (err) {
      console.error("Image upload failed", err);
      toast.error(err?.response?.data?.message || "Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shopId) {
      toast.error("Shop ID is missing");
      return;
    }

    if (!orderId) {
      toast.error("A completed order is required to post a review");
      return;
    }

    if (comment.trim().length < 5) {
      toast.error("Please enter a review comment of at least 5 characters");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        shopId,
        orderId,
        rating,
        title: title.trim(),
        comment: comment.trim(),
        review: comment.trim(),
        images,
      };

      const { data } = await createReview(payload);

      toast.success("Review submitted successfully!");
      setComment("");
      setTitle("");
      setImages([]);
      setRating(5);

      if (onReviewSubmitted && data?.data) {
        onReviewSubmitted(data.data);
      }

      onClose();
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to submit review";
      if (error?.response?.status === 409) {
        toast.error("You have already reviewed this order");
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const activeRating = hoverRating || rating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-800 my-8">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
              Write a Review
            </h3>
            {shopName && (
              <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold mt-0.5">
                {shopName}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Order Badge */}
          {orderNumber && (
            <div className="mb-5 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FiCheckCircle size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  Verified Order: #{orderNumber}
                </span>
              </div>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200">
                Completed
              </span>
            </div>
          )}

          {/* Eligibility Warnings */}
          {eligibility && !eligibility.eligible && (
            <div className="mb-5 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 font-medium">
              {eligibility.message || "This order is not eligible for review"}
            </div>
          )}

          {/* Star Selection */}
          <div className="mb-6 flex flex-col items-center bg-gray-50 dark:bg-slate-950 p-4 rounded-2xl border border-gray-100 dark:border-slate-800">
            <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-slate-500 mb-2 font-bold">
              Rate your experience
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none"
                >
                  <FiStar
                    size={34}
                    className={`${
                      star <= activeRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-slate-700"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm font-bold text-orange-600 dark:text-orange-400 mt-2">
              {RATING_LABELS[activeRating]}
            </p>
          </div>

          {/* Review Title */}
          <div className="mb-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400 mb-1.5">
              Review Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              placeholder="e.g., Fresh food and lightning fast delivery!"
              className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
            />
          </div>

          {/* Review Comment */}
          <div className="mb-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400 mb-1.5">
              Detailed Experience
            </label>
            <textarea
              required
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white transition"
              placeholder="Describe the product quality, packaging, hygiene, delivery speed..."
            ></textarea>
          </div>

          {/* Photos Upload */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-slate-400 mb-2">
              Add Photos (Max 5)
            </label>

            <div className="flex flex-wrap gap-3 items-center">
              {images.map((url, idx) => (
                <div
                  key={idx}
                  className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 dark:border-slate-700 group"
                >
                  <img
                    src={url}
                    alt="Upload preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              ))}

              {images.length < 5 && (
                <label className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-orange-500 flex flex-col items-center justify-center text-gray-400 dark:text-slate-500 hover:text-orange-500 cursor-pointer transition">
                  <FiUploadCloud size={20} />
                  <span className="text-[10px] font-semibold mt-0.5">
                    {uploading ? "..." : "+ Add"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={uploading}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              loading ||
              uploading ||
              (eligibility && !eligibility.eligible)
            }
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-md transition disabled:opacity-50 text-sm tracking-wide"
          >
            {loading ? "Submitting Review..." : "Submit Verified Review"}
          </button>
        </form>
      </div>
    </div>
  );
}

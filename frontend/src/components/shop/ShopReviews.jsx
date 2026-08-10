import { useState, useEffect } from "react";
import {
  FiStar,
  FiCheckCircle,
  FiThumbsUp,
  FiAlertTriangle,
  FiCornerDownRight,
  FiFilter,
  FiSliders,
} from "react-icons/fi";
import { getShopReviews, toggleHelpful } from "../../services/review.service";
import { useAuth } from "../../context/AuthContext";
import ReportModal from "./ReportModal";
import toast from "react-hot-toast";

export default function ShopReviews({ shop, onWriteReview }) {
  const shopId = shop?._id || shop?.id;
  const { authenticated } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [activeSort, setActiveSort] = useState("newest");
  const [selectedImage, setSelectedImage] = useState(null);
  const [reportReviewId, setReportReviewId] = useState(null);

  useEffect(() => {
    if (shopId) {
      fetchReviews();
    }
  }, [shopId, activeFilter, activeSort]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const params = {
        sort: activeSort,
      };

      if (activeFilter === "VERIFIED") {
        params.verified = "true";
      } else if (activeFilter !== "ALL") {
        params.rating = activeFilter;
      }

      const res = await getShopReviews(shopId, params);
      const data = res?.data?.data || {};

      setReviews(data.reviews || []);
      if (data.shopSummary) {
        setSummary(data.shopSummary);
      }
    } catch (err) {
      console.error("Failed to load shop reviews", err);
    } finally {
      setLoading(false);
    }
  };

  const handleHelpfulClick = async (reviewId) => {
    if (!authenticated) {
      toast.error("Please login to vote on reviews");
      return;
    }

    try {
      const res = await toggleHelpful(reviewId);
      const { helpful, helpfulCount } = res?.data?.data || {};

      setReviews((prev) =>
        prev.map((r) =>
          r._id === reviewId
            ? { ...r, helpfulCount, userVotedHelpful: helpful }
            : r
        )
      );

      toast.success(helpful ? "Marked as helpful!" : "Removed vote");
    } catch (err) {
      toast.error("Failed to update helpful vote");
    }
  };

  const handleReportClick = (reviewId) => {
    if (!authenticated) {
      toast.error("Please login to report a review");
      return;
    }
    setReportReviewId(reviewId);
  };

  // Rating aggregate calculations
  const avgRating =
    summary?.averageRating ||
    shop?.averageRating ||
    shop?.rating ||
    0.0;
  const totalReviews =
    summary?.reviewCount ||
    shop?.reviewCount ||
    shop?.totalReviews ||
    reviews.length;
  const distribution = summary?.ratingDistribution ||
    shop?.ratingDistribution || {
      star5: 0,
      star4: 0,
      star3: 0,
      star2: 0,
      star1: 0,
    };

  const getPercent = (count) => {
    if (!totalReviews || totalReviews === 0) return 0;
    return Math.round((count / totalReviews) * 100);
  };

  return (
    <section className="pt-10 pb-6 border-t border-gray-100 dark:border-slate-800 my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Customer Reviews
          </h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
            Real feedback from verified order customers
          </p>
        </div>

        <button
          onClick={onWriteReview}
          className="self-start sm:self-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm tracking-wide uppercase px-5 py-2.5 rounded-xl shadow-sm transition"
        >
          Write a Review
        </button>
      </div>

      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 dark:bg-slate-900/60 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 mb-8">
        {/* Overall Rating */}
        <div className="flex flex-col items-center justify-center text-center md:border-r border-gray-200 dark:border-slate-800 pr-0 md:pr-6">
          <div className="text-5xl font-black text-gray-900 dark:text-white tracking-tight">
            {avgRating > 0 ? avgRating.toFixed(1) : "0.0"}
          </div>
          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                size={18}
                className={`${
                  star <= Math.round(avgRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 dark:text-slate-700"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-500 dark:text-slate-400">
            Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </span>
        </div>

        {/* Distribution Bars */}
        <div className="md:col-span-2 space-y-2 justify-center flex flex-col">
          {[5, 4, 3, 2, 1].map((starNum) => {
            const count = distribution[`star${starNum}`] || 0;
            const percent = getPercent(count);
            return (
              <div key={starNum} className="flex items-center gap-3 text-xs">
                <span className="w-8 font-bold text-gray-700 dark:text-slate-300 flex items-center gap-1">
                  {starNum} <FiStar size={10} className="fill-current text-yellow-400" />
                </span>
                <div className="flex-1 h-2.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
                <span className="w-12 text-right text-gray-400 dark:text-slate-500 font-medium">
                  {percent}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters & Sorting */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-slate-800">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveFilter("ALL")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeFilter === "ALL"
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow"
                : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter("VERIFIED")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1 ${
              activeFilter === "VERIFIED"
                ? "bg-emerald-600 text-white shadow"
                : "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100"
            }`}
          >
            <FiCheckCircle size={12} />
            Verified
          </button>
          {[5, 4, 3, 2, 1].map((ratingNum) => (
            <button
              key={ratingNum}
              onClick={() => setActiveFilter(ratingNum.toString())}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1 ${
                activeFilter === ratingNum.toString()
                  ? "bg-orange-500 text-white shadow"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-200"
              }`}
            >
              {ratingNum} <FiStar size={10} className="fill-current" />
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <FiSliders size={14} className="text-gray-400" />
          <select
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="bg-gray-100 dark:bg-slate-800 border-none rounded-xl text-xs font-bold text-gray-700 dark:text-slate-300 px-3 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Review List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-5 bg-gray-50 dark:bg-slate-900/40 rounded-2xl animate-pulse space-y-3"
            >
              <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 dark:bg-slate-800 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800">
          <FiStar size={36} className="mx-auto text-gray-300 dark:text-slate-700 mb-3" />
          <h3 className="text-base font-bold text-gray-800 dark:text-slate-200">
            No reviews yet
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Be the first customer to share your experience with this shop.
          </p>
          <button
            onClick={onWriteReview}
            className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-xl transition"
          >
            Write a Review
          </button>
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

            return (
              <div
                key={review._id}
                className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm transition hover:shadow-md"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-400 to-amber-500 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                      {customerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-gray-900 dark:text-white text-sm">
                        {customerName}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-gray-400 dark:text-slate-500">
                          {new Date(review.createdAt).toLocaleDateString(
                            undefined,
                            { year: "numeric", month: "short", day: "numeric" }
                          )}
                        </span>
                        {review.isVerifiedPurchase && (
                          <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                            <FiCheckCircle size={10} />
                            Verified Order
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rating Stars Badge */}
                  <div className="flex items-center gap-1 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 px-2.5 py-1 rounded-xl text-green-700 dark:text-green-400 font-bold text-xs">
                    <span>{review.rating}.0</span>
                    <FiStar size={12} className="fill-current" />
                  </div>
                </div>

                {/* Title */}
                {review.title && (
                  <h5 className="font-bold text-gray-900 dark:text-slate-100 text-sm mt-3.5">
                    {review.title}
                  </h5>
                )}

                {/* Comment */}
                <p className="mt-2 text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
                  {review.comment || review.review}
                </p>

                {/* Images Lightbox Thumbnails */}
                {review.images && review.images.length > 0 && (
                  <div className="flex flex-wrap gap-2.5 mt-4">
                    {review.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Review photo"
                        onClick={() => setSelectedImage(img)}
                        className="w-16 h-16 rounded-2xl object-cover cursor-pointer border border-gray-100 dark:border-slate-800 hover:scale-105 transition"
                      />
                    ))}
                  </div>
                )}

                {/* Owner Response Box */}
                {review.ownerReply?.comment && (
                  <div className="mt-4 p-4 bg-orange-50/70 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30 rounded-2xl">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-orange-700 dark:text-orange-300 mb-1">
                      <FiCornerDownRight size={14} />
                      <span>Response from {shop?.name || "Shop Owner"}</span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-slate-300 leading-relaxed pl-5">
                      {review.ownerReply.comment}
                    </p>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50 dark:border-slate-850 text-xs">
                  <button
                    onClick={() => handleHelpfulClick(review._id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition ${
                      review.userVotedHelpful
                        ? "bg-orange-100 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400"
                        : "text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    <FiThumbsUp size={12} />
                    <span>Helpful</span>
                    {review.helpfulCount > 0 && (
                      <span className="ml-0.5">({review.helpfulCount})</span>
                    )}
                  </button>

                  <button
                    onClick={() => handleReportClick(review._id)}
                    className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition px-2 py-1"
                  >
                    <FiAlertTriangle size={12} />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Review enlarged"
            className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}

      {/* Report Modal */}
      <ReportModal
        isOpen={!!reportReviewId}
        onClose={() => setReportReviewId(null)}
        reviewId={reportReviewId}
      />
    </section>
  );
}

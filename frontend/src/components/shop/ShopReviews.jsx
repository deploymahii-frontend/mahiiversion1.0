import { FiStar } from "react-icons/fi";

export default function ShopReviews({ shop, reviews = [], onWriteReview }) {
  return (
    <section className="max-w-7xl mx-auto px-5 mt-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Reviews</h2>
            <p className="text-gray-500 dark:text-slate-400">{shop?.totalReviews || reviews.length} Reviews</p>
          </div>

          <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-500 px-5 py-3 rounded-2xl font-bold">
            ⭐ {shop?.rating || 0}
          </div>
        </div>

        <button 
          onClick={onWriteReview}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          Write a Review
        </button>

        <div className="mt-6 space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-500 dark:text-slate-400">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-50 dark:bg-slate-950 rounded-2xl p-5 border border-gray-100 dark:border-slate-800"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {review.customer?.firstName || review.customer?.name || "Anonymous"} {review.customer?.lastName || ""}
                    </h3>

                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-1 rounded-full text-yellow-700 dark:text-yellow-500 font-medium">
                    <FiStar className="fill-current" />
                    <span>{review.rating}</span>
                  </div>
                </div>

                <p className="mt-4 text-gray-700 dark:text-slate-300">{review.review || review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

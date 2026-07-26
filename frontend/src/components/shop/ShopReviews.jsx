import { FiStar } from "react-icons/fi";

export default function ShopReviews({ shop, reviews = [] }) {
  return (
    <section className="max-w-7xl mx-auto px-5 mt-8">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <p className="text-gray-500">{shop?.totalReviews || 0} Reviews</p>
          </div>

          <div className="bg-yellow-100 px-5 py-3 rounded-2xl">
            ⭐ {shop?.rating || 0}
          </div>
        </div>

        <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition">
          Write a Review
        </button>

        <div className="mt-6 space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-50 rounded-2xl p-5 border"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {review.customer?.name || "Anonymous"}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                    <FiStar className="text-yellow-500" />
                    <span>{review.rating}</span>
                  </div>
                </div>

                <p className="mt-4 text-gray-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

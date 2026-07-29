// src/modules/customer/components/ReviewsSection.jsx

import { FaStar } from "react-icons/fa";

export default function ReviewsSection({
    reviews = [],
}) {
    if (!reviews.length) {
        return (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center text-gray-500">
                No reviews yet.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <div
                    key={review._id || review.id || review.userId}
                    className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="font-semibold text-gray-900">{review.reviewerName || review.name || "Anonymous"}</p>
                            <p className="text-sm text-gray-500">{review.date || review.submittedAt || "Recently"}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-yellow-500">
                            {[...Array(5)].map((_, index) => (
                                <FaStar
                                    key={index}
                                    className={index < Math.round(review.rating || 4) ? "text-yellow-500" : "text-gray-300"}
                                />
                            ))}
                        </div>
                    </div>
                    <p className="mt-4 text-gray-600">{review.comment || review.message || "Excellent experience."}</p>
                </div>
            ))}
        </div>
    );
}

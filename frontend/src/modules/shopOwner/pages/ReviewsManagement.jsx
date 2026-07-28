// src/modules/shopOwner/pages/ReviewsManagement.jsx

import { useState } from "react";
import { FaStar, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export default function ReviewsManagement() {
    const [reviews, setReviews] = useState([]);

    function updateReview(id, action) {
        setReviews(previous =>
            previous.map(review =>
                review._id === id ? { ...review, action } : review
            )
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-5 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">Reviews Management</h1>
                    <p className="mt-2 text-gray-500">See customer feedback and respond.</p>
                </div>

                <div className="grid gap-6">
                    {reviews.length === 0 ? (
                        <div className="rounded-3xl border border-dashed bg-white p-12 text-center text-gray-500">
                            No reviews yet. Customer feedback will appear here.
                        </div>
                    ) : (
                        reviews.map(review => (
                            <div key={review._id} className="rounded-3xl bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-xl font-bold">{review.customerName}</h2>
                                        <div className="mt-2 flex items-center gap-2 text-yellow-500">
                                            {Array.from({ length: review.rating }).map((_, index) => (
                                                <FaStar key={index} />
                                            ))}
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">{review.date}</span>
                                </div>
                                <p className="mt-4 text-gray-600">{review.comment}</p>
                                <div className="mt-5 flex gap-3">
                                    <button
                                        onClick={() => updateReview(review._id, "approve")}
                                        className="inline-flex items-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-white hover:bg-green-700"
                                    >
                                        <FaThumbsUp /> Approve
                                    </button>
                                    <button
                                        onClick={() => updateReview(review._id, "hide")}
                                        className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
                                    >
                                        <FaThumbsDown /> Hide
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

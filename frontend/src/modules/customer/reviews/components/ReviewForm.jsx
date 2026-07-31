import { useState } from "react";
import RatingStars from "./RatingStars";
import toast from "react-hot-toast";

export default function ReviewForm({ orderId, shopName }) {
  const [rating, setRating] = useState(5);
  const [foodRating, setFoodRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you! Review submitted successfully.");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
      <div>
        <h3 className="font-bold text-slate-800 text-lg">Overall Experience</h3>
        <div className="mt-2">
          <RatingStars rating={rating} onRatingChange={setRating} size={28} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-slate-100">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Food / Quality Rating</label>
          <div className="mt-1">
            <RatingStars rating={foodRating} onRatingChange={setFoodRating} size={22} />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">Delivery & Service</label>
          <div className="mt-1">
            <RatingStars rating={deliveryRating} onRatingChange={setDeliveryRating} size={22} />
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs font-bold text-slate-500 uppercase">Your Detailed Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts about taste, speed, hygiene, or packaging..."
          className="w-full mt-1 border border-slate-200 rounded-2xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 h-28"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition shadow-sm"
      >
        Submit Review
      </button>
    </form>
  );
}

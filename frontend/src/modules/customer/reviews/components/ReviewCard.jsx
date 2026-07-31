import RatingStars from "./RatingStars";
import { Store } from "lucide-react";

export default function ReviewCard({ review }) {
  if (!review) return null;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-3">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600">
            <Store size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">{review.shopName || "Mahii Partner Shop"}</h4>
            <p className="text-xs text-slate-400 mt-0.5">{review.createdAt || "Recent"}</p>
          </div>
        </div>

        <RatingStars rating={review.overallRating || 5} readOnly size={16} />
      </div>

      <p className="text-sm text-slate-600 leading-relaxed">{review.review || review.comment}</p>
    </div>
  );
}

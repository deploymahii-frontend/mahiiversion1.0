import { Star } from "lucide-react";

export default function RatingStars({ rating = 5, onRatingChange, readOnly = false, size = 20 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onRatingChange?.(star)}
          className={`transition ${readOnly ? "cursor-default" : "hover:scale-110"}`}
        >
          <Star
            size={size}
            className={star <= rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}
          />
        </button>
      ))}
    </div>
  );
}

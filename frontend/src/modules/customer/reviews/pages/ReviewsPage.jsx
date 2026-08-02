import useReviews from "../hooks/useReviews";
import ReviewCard from "../components/ReviewCard";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  const { data = [], isLoading } = useReviews();

  const reviews = data;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">My Reviews</h1>
        <p className="text-slate-500 mt-1">Feedback and ratings you have shared for partner shops</p>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="h-32 rounded-3xl bg-slate-200" />
          ))}
        </div>
      ) : !reviews.length ? (
        <section className="bg-white rounded-3xl p-12 text-center border border-slate-100">
          <Star size={40} className="mx-auto text-slate-300" />
          <h3 className="text-lg font-bold text-slate-700 mt-4">No Reviews Submitted</h3>
          <p className="text-sm text-slate-400 mt-1">You haven't rated any orders yet.</p>
        </section>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <ReviewCard key={rev._id} review={rev} />
          ))}
        </div>
      )}
    </div>
  );
}

import { Star } from "lucide-react";

export default function ReviewSection({ reviews = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <h2 className="mb-6 text-2xl font-bold">Customer Reviews</h2>
      <div className="space-y-5">
        {reviews.map((review) => (
          <div key={review._id} className="rounded-2xl bg-white p-5 shadow">
            <div className="flex items-center gap-3">
              <img src={review.user.avatar} alt="" className="h-12 w-12 rounded-full" />
              <div>
                <h4 className="font-semibold">{review.user.name}</h4>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="gold" />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

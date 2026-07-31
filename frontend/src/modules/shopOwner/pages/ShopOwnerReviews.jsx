import { useState } from "react";
import { useShopReviews, useReplyToReview } from "../hooks/useShopOwner";
import { Star, MessageSquare } from "lucide-react";

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={14} className={i <= rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
      ))}
    </div>
  );
}

function ReplyModal({ review, onReply, onClose }) {
  const [text, setText] = useState("");
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-7 w-full max-w-md">
        <h2 className="text-xl font-black text-slate-900 mb-1">Reply to Review</h2>
        <p className="text-sm text-slate-400 mb-5">by {review.customer?.name || "Customer"}</p>
        <blockquote className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 italic mb-5">
          "{review.comment}"
        </blockquote>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your reply..."
          rows={4}
          className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
        />
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => onReply(text)}
            disabled={!text.trim()}
            className="flex-1 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors disabled:opacity-50"
          >
            Send Reply
          </button>
          <button onClick={onClose} className="flex-1 border border-slate-200 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopOwnerReviews() {
  const { data, isLoading } = useShopReviews();
  const { mutate: reply, isPending } = useReplyToReview();
  const [replyTarget, setReplyTarget] = useState(null);

  if (isLoading) return (
    <div className="space-y-4 animate-pulse">
      {[...Array(3)].map((_, i) => <div key={i} className="h-36 bg-slate-200 rounded-2xl" />)}
    </div>
  );

  const { reviews = [], rating = 0, totalReviews = 0 } = data || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Reviews</h1>
        <p className="text-slate-400 mt-1">{totalReviews} customer reviews</p>
      </div>

      {/* Rating summary */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-6">
        <div className="text-center">
          <p className="text-5xl font-black text-slate-900">{rating}</p>
          <StarRating rating={Math.round(rating)} />
          <p className="text-xs text-slate-400 mt-1">{totalReviews} reviews</p>
        </div>
        <div className="h-16 w-px bg-slate-100" />
        <p className="text-sm text-slate-500 max-w-xs">
          Reply to reviews to show customers you care. Shops with active engagement get better ranking on Mahii.
        </p>
      </div>

      {reviews.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-5xl mb-3">⭐</p>
          <p className="font-bold text-slate-700">No reviews yet</p>
          <p className="text-slate-400 text-sm mt-1">Reviews from customers will appear here</p>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-slate-900">{review.customer?.name || "Anonymous"}</p>
                <StarRating rating={review.rating} />
                <p className="text-sm text-slate-600 mt-3">{review.comment}</p>
              </div>
              <p className="text-xs text-slate-400">{new Date(review.createdAt).toLocaleDateString("en-IN")}</p>
            </div>

            {review.ownerReply && (
              <div className="mt-4 bg-slate-50 rounded-xl p-4">
                <p className="text-xs font-bold text-slate-500 mb-1">Your Reply</p>
                <p className="text-sm text-slate-700">{review.ownerReply}</p>
              </div>
            )}

            {!review.ownerReply && (
              <button
                onClick={() => setReplyTarget(review)}
                className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-700 border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <MessageSquare size={14} /> Reply
              </button>
            )}
          </div>
        ))}
      </div>

      {replyTarget && (
        <ReplyModal
          review={replyTarget}
          onReply={(text) => {
            reply({ reviewId: replyTarget._id, reply: text });
            setReplyTarget(null);
          }}
          onClose={() => setReplyTarget(null)}
        />
      )}
    </div>
  );
}

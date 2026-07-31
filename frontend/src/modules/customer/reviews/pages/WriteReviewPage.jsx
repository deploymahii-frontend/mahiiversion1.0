import ReviewForm from "../components/ReviewForm";

export default function WriteReviewPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Rate & Review</h1>
        <p className="text-slate-500 mt-1">Help other customers by sharing your experience</p>
      </div>

      <ReviewForm />
    </div>
  );
}

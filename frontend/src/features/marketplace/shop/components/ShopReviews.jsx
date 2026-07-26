export default function ShopReviews({ shop }) {
  if (!shop) return null;

  return (
    <div className="p-6 border-t">
      <h2 className="text-xl font-bold mb-4">Shop Reviews</h2>
      <p className="text-gray-500 text-center py-8">
        No reviews yet. Be the first to review!
      </p>
    </div>
  );
}

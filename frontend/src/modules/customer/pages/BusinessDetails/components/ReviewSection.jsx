export default function ReviewSection() {
  const reviews = [
    { name: 'Neha', rating: 5, text: 'Excellent food and delivery was on time.' },
    { name: 'Arjun', rating: 4, text: 'Great taste, nice portions for the price.' },
  ];

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-600">Reviews</p>
          <h2 className="text-3xl font-bold">Customer feedback</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-3xl border border-gray-200 bg-slate-50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{review.name}</h3>
                  <p className="text-sm text-gray-500">{review.rating} stars</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

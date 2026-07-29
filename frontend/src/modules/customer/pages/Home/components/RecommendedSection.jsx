export default function RecommendedSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 pb-16">
      <h2 className="text-xl font-semibold text-slate-900">Recommended for you</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {['Biryani', 'Coffee Combo', 'Daily Essentials'].map((item) => (
          <div key={item} className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="font-semibold">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

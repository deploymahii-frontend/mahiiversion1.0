export default function SimilarBusinesses() {
  const businesses = [
    { name: 'Kanha Dhaba', category: 'Street Food' },
    { name: 'Café Lotus', category: 'Cafe' },
    { name: 'Spice Bites', category: 'Quick Bites' },
  ];

  return (
    <section className="bg-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-600">Similar Businesses</p>
          <h2 className="text-3xl font-bold">More places like this</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {businesses.map((business) => (
            <div key={business.name} className="rounded-3xl bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold">{business.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{business.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

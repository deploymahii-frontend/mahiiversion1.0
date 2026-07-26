export default function OfferSection() {
  const offers = [
    { title: '20% off on first order', details: 'Use code MAHII20 on orders above ₹250.' },
    { title: 'Free delivery', details: 'Free delivery for orders above ₹300.' },
  ];

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.2em] text-pink-600">Offers</p>
          <h2 className="text-3xl font-bold">Deals and promotions</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {offers.map((offer) => (
            <div key={offer.title} className="rounded-3xl border border-pink-100 bg-pink-50 p-6">
              <h3 className="text-xl font-semibold text-pink-800">{offer.title}</h3>
              <p className="mt-2 text-sm text-pink-700">{offer.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BusinessOffers({ offers = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <h2 className="mb-6 text-2xl font-bold">Offers</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {offers.map((offer) => (
          <div key={offer._id} className="rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
            <h3 className="text-2xl font-bold">{offer.title}</h3>
            <p className="mt-3">{offer.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

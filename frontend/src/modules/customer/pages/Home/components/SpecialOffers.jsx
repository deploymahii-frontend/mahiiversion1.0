import Card from "@/components/ui/Card";

export default function SpecialOffers({ offers = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold">Special Offers</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {offers.map((offer) => (
          <Card key={offer._id || offer.id}>
            <div className={`rounded-2xl bg-gradient-to-r ${offer.color || "from-orange-500 to-red-500"} p-8 text-white`}>
              <h3 className="text-3xl font-bold">{offer.title}</h3>
              <p className="mt-3">{offer.subtitle || offer.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

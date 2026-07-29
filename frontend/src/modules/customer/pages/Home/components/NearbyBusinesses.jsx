import Card from "@/components/ui/Card";

export default function NearbyBusinesses({ businesses = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Nearby Businesses</h2>
        <button className="text-blue-600">View All</button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {businesses.map((business) => (
          <Card key={business._id || business.id}>
            <div className="h-40 rounded-xl bg-gray-200" />
            <h3 className="mt-4 text-xl font-semibold">{business.name}</h3>
            <p className="mt-2 text-gray-500">{business.category || business.categoryName}</p>
            <div className="mt-4 flex justify-between">
              <span>⭐ {business.rating || "4.8"}</span>
              <span>{business.distance || "Nearby"}</span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

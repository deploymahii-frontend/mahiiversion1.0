import useNearbyShops from "../../hooks/useNearbyShops";

export default function NearbySection() {
  const { shops, loading } = useNearbyShops();

  if (loading) return <p>Finding nearby places...</p>;

  return (
    <section className="max-w-7xl mx-auto px-5 mt-8">
      <h2 className="text-2xl font-bold mb-6">Around You</h2>

      {shops.map((shop) => (
        <div key={shop._id} className="mb-4 p-4 bg-white rounded-2xl shadow-sm">
          {shop.name}
        </div>
      ))}
    </section>
  );
}

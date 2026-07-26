import ShopCard from "../home/ShopCard";

export default function ShopGrid({ shops }) {
  if (!shops.length) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {shops.map((shop) => (
        <ShopCard key={shop._id} shop={shop} />
      ))}
    </div>
  );
}

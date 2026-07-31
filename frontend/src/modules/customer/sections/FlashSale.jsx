import SectionHeader from "../components/SectionHeader";
import ShopCard from "../components/ShopCard";

export default function FlashSale({ shops = [] }) {
  if (!shops.length) return null;

  return (
    <section>
      <SectionHeader
        title="🔥 Flash Sale"
        subtitle="Limited-time offers — ending soon"
      />
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {shops.map((shop) => (
          <ShopCard key={shop._id} shop={shop} />
        ))}
      </div>
    </section>
  );
}

import ShopCard from "../components/ShopCard";
import ShopCardSkeleton from "../components/ShopCardSkeleton";
import EmptyShops from "../components/EmptyShops";
import SectionHeader from "../components/SectionHeader";

export default function NearbySection({ shops, isLoading }) {
  return (
    <section>
      <SectionHeader
        title="Nearby"
        subtitle="Restaurants and shops around you"
      />

      {isLoading && (
        <div className="grid gap-6 mt-6 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <ShopCardSkeleton key={item} />
          ))}
        </div>
      )}

      {!isLoading && (!shops || !shops.length) && (
        <EmptyShops message="No shops found nearby. Try a different location." />
      )}

      {!isLoading && shops && shops.length > 0 && (
        <div className="grid gap-6 mt-6 md:grid-cols-2 xl:grid-cols-3">
          {shops.map((shop) => (
            <ShopCard key={shop._id} shop={shop} />
          ))}
        </div>
      )}
    </section>
  );
}

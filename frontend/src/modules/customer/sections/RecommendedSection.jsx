import ShopCard from "../components/ShopCard";
import ShopCardSkeleton from "../components/ShopCardSkeleton";
import EmptyShops from "../components/EmptyShops";
import SectionHeader from "../components/SectionHeader";
import { useRecommendedShops } from "../hooks/useRecommendedShops";

export default function RecommendedSection({ shops }) {
  // Accept pre-fetched shops from parent (dashboard aggregation)
  // Falls back to own query if used standalone
  const { data: queryData = [], isLoading } = useRecommendedShops();
  const displayData = shops ?? queryData;

  return (
    <section>
      <SectionHeader
        title="Recommended For You"
        subtitle="Picked based on your activity"
      />
      <div className="grid gap-6 mt-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading && !shops &&
          Array.from({ length: 6 }).map((_, index) => (
            <ShopCardSkeleton key={index} />
          ))}

        {!isLoading && !displayData.length && (
          <div className="col-span-3">
            <EmptyShops message="No recommendations yet. Start exploring!" />
          </div>
        )}

        {displayData.map((shop) => (
          <ShopCard key={shop._id} shop={shop} />
        ))}
      </div>
    </section>
  );
}

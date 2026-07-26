import { useHome } from "../../hooks/useHome";
import Loader from "@/components/ui/Loader";
import HeroSection from "./components/HeroSection";
import CategoryGrid from "./components/CategoryGrid";
import NearbyBusinesses from "./components/NearbyBusinesses";
import TrendingProducts from "./components/TrendingProducts";
import SpecialOffers from "./components/SpecialOffers";
import GoldMembershipBanner from "./components/GoldMembershipBanner";
import MomentsPreview from "./components/MomentsPreview";
import RecommendedSection from "./components/RecommendedSection";

export default function HomePage() {
  const { data, isLoading, error } = useHome();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="p-10 text-center">Failed to load homepage.</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <CategoryGrid categories={data?.categories || []} />
      <NearbyBusinesses businesses={data?.nearby || []} />
      <SpecialOffers offers={data?.offers || []} />
      <TrendingProducts products={data?.products || []} />
      <GoldMembershipBanner />
      <MomentsPreview moments={data?.moments || []} />
      <RecommendedSection />
    </main>
  );
}

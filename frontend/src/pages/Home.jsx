import HeroHeader from "../components/home/HeroHeader";
import SearchSection from "../components/home/SearchSection";
import ModeSwitcher from "../components/home/ModeSwitcher";
import AroundYouSection from "../components/home/AroundYouSection";
import MomentsSection from "../components/home/MomentsSection";
import TrendingSection from "../components/home/TrendingSection";
import HiddenGemsSection from "../components/home/HiddenGemsSection";
import OffersSection from "../components/home/OffersSection";
import RecommendedSection from "../components/home/RecommendedSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <HeroHeader />
      <SearchSection />
      <ModeSwitcher />
      <AroundYouSection />
      <MomentsSection />
      <TrendingSection />
      <HiddenGemsSection />
      <OffersSection />
      <RecommendedSection />
    </div>
  );
}

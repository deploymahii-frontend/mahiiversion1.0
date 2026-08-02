import HeroHeader from "../components/home/HeroHeader";
import SearchSection from "../components/home/SearchSection";
import ModeSwitcher from "../components/home/ModeSwitcher";
import AdsCarousel from "../components/home/AdsCarousel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroHeader />
      <SearchSection />
      <AdsCarousel />
      <ModeSwitcher />
    </div>
  );
}

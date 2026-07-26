import SearchBar from "./SearchBar";
import LocationSelector from "./LocationSelector";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="text-lg text-white">Welcome to Mahii 👋</p>
        <h1 className="mt-2 text-4xl font-bold text-white">Discover Everything Around You</h1>
        <p className="mt-3 text-blue-100">Food • Shops • Services • Offers • Moments</p>
        <div className="mt-8">
          <LocationSelector />
          <div className="mt-5">
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
}

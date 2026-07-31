import SectionHeader from "../components/SectionHeader";
import CategoryCard from "../components/CategoryCard";

const categories = [
  { title: "Mess", slug: "mess", image: "https://picsum.photos/seed/mess/200" },
  { title: "Cafe", slug: "cafe", image: "https://picsum.photos/seed/cafe/200" },
  { title: "Restaurant", slug: "restaurant", image: "https://picsum.photos/seed/restaurant/200" },
  { title: "Bakery", slug: "bakery", image: "https://picsum.photos/seed/bakery/200" },
  { title: "Grocery", slug: "grocery", image: "https://picsum.photos/seed/grocery/200" },
  { title: "Tiffin", slug: "tiffin", image: "https://picsum.photos/seed/tiffin/200" },
  { title: "Sweets", slug: "sweets", image: "https://picsum.photos/seed/sweets/200" },
];

export default function CategorySlider() {
  return (
    <section>
      <SectionHeader
        title="Categories"
        subtitle="Browse what you're looking for"
      />
      <div className="mt-5 flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {categories.map((item) => (
          <CategoryCard key={item.slug} {...item} />
        ))}
      </div>
    </section>
  );
}

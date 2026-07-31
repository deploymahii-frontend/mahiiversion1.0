import { Link } from "react-router-dom";

export default function CategoryCard({ title, image, slug }) {
  return (
    <Link
      to={`/explore?category=${slug}`}
      className="
        min-w-[110px]
        bg-white
        rounded-2xl
        shadow-sm
        hover:shadow-lg
        transition
        p-3
        flex
        flex-col
        items-center
      "
    >
      <img
        src={image}
        alt={title}
        className="h-16 w-16 rounded-full object-cover"
      />
      <span className="mt-3 text-sm font-medium text-center">{title}</span>
    </Link>
  );
}

import { Link } from "react-router-dom";
import { Star, MapPin, Clock, BadgeCheck } from "lucide-react";

export default function BusinessCard({ business }) {
  return (
    <Link to={`/business/${business.slug}`} className="overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-xl">
      <img src={business.coverImage} alt={business.name} className="h-52 w-full object-cover" />
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{business.name}</h3>
          {business.verified && <BadgeCheck className="text-blue-600" size={20} />}
        </div>
        <p className="mt-2 text-gray-500">{business.category}</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Star size={16} fill="gold" />
            {business.rating}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={16} />
            {business.distance}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} />
            {business.open ? "Open" : "Closed"}
          </span>
        </div>
      </div>
    </Link>
  );
}

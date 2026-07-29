import { BadgeCheck, MapPin, Clock, Star, Heart, Share2 } from "lucide-react";

export default function BusinessHeader({ business }) {
  return (
    <section className="mx-auto -mt-20 max-w-7xl px-6">
      <div className="rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{business.name}</h1>
              {business.verified && <BadgeCheck className="text-blue-600" />}
            </div>
            <p className="mt-2 text-gray-500">{business.category}</p>
            <div className="mt-4 flex gap-5">
              <span className="flex items-center gap-1">
                <Star size={18} />
                {business.rating}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={18} />
                {business.open ? "Open" : "Closed"}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={18} />
                {business.distance}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button>
              <Heart />
            </button>
            <button>
              <Share2 />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

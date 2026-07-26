import { FiHeart, FiShare2, FiStar, FiMapPin } from "react-icons/fi";

export default function ShopHero({ shop }) {
  return (
    <section className="bg-white">
      <div className="relative h-72 md:h-96">
        <img
          src={shop.cover || "/images/default-cover.jpg"}
          alt={shop.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <button className="absolute top-5 right-20 bg-white p-3 rounded-full shadow-lg">
          <FiHeart size={20} />
        </button>

        <button className="absolute top-5 right-5 bg-white p-3 rounded-full shadow-lg">
          <FiShare2 size={20} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-5">
        <div className="-mt-16 relative z-10">
          <img
            src={shop.logo || "/images/default-logo.png"}
            alt={shop.name}
            className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl object-cover"
          />
        </div>

        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold">{shop.name}</h1>

            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              {shop.status || "Open Now"}
            </span>
          </div>

          <p className="text-gray-600 mt-2">{shop.category}</p>

          <div className="flex flex-wrap gap-5 mt-5 text-gray-700">
            <div className="flex items-center gap-2">
              <FiStar className="text-yellow-500" />
              <span>
                {shop.rating} ({shop.totalReviews || 0} reviews)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FiMapPin />
              <span>{shop.address?.area}, {shop.address?.city}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

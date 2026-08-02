import { FiHeart, FiShare2, FiStar, FiMapPin, FiClock, FiGlobe } from "react-icons/fi";

export default function ShopHero({ shop }) {
  const statusLabel = shop.isOpen ? "Open Now" : "Closed";
  const statusClass = shop.isOpen ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700";

  return (
    <section className="bg-white">
      <div className="relative h-72 md:h-96">
        <img
          src={shop.coverImage || shop.cover || shop.images?.cover || "/images/default-cover.jpg"}
          alt={shop.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />

        <button className="absolute top-5 right-20 bg-white p-3 rounded-full shadow-lg">
          <FiHeart size={20} />
        </button>

        <button className="absolute top-5 right-5 bg-white p-3 rounded-full shadow-lg">
          <FiShare2 size={20} />
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-5">
        <div className="-mt-16 relative z-10">
          <img
            src={shop.logo || shop.images?.logo || "/images/default-logo.png"}
            alt={shop.name}
            className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl object-cover"
          />
        </div>

        <div className="mt-5 rounded-3xl bg-white p-6 shadow-lg">
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-4xl font-bold text-slate-900">{shop.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClass}`}>
                  {statusLabel}
                </span>
              </div>
              <p className="text-gray-600 mt-2">{shop.category || "Local store"}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-3xl bg-slate-50 px-4 py-3 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Rating</p>
                <p className="mt-2 flex items-center gap-2 text-2xl font-bold text-slate-900">
                  <FiStar /> {shop.rating != null ? shop.rating.toFixed(1) : "0.0"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Delivery</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{shop.deliveryTime || `${shop.deliverySettings?.averageDeliveryTime ?? 30} min`}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Minimum Order</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">₹{shop.minimumOrder ?? shop.deliverySettings?.minimumOrder ?? 0}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Location</p>
              <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-slate-900">
                <FiMapPin />
                {shop.address?.line1 || shop.address?.city || shop.address?.area || "Nearby"}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {shop.website && (
              <div className="rounded-3xl bg-slate-50 p-5 flex items-center gap-3">
                <FiGlobe className="text-slate-500" />
                <p className="text-sm text-slate-700 truncate">{shop.website}</p>
              </div>
            )}
            <div className="rounded-3xl bg-slate-50 p-5 flex items-center gap-3">
              <FiClock className="text-slate-500" />
              <p className="text-sm text-slate-700">{shop.businessHours?.monday?.open || shop.businessHours?.tuesday?.open || "Opening hours not specified"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

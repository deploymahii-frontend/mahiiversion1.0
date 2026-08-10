import { FiStar, FiMapPin, FiClock, FiInfo, FiCheckCircle } from "react-icons/fi";
import { FaShieldAlt } from "react-icons/fa";

const CATEGORY_FALLBACK_IMAGES = {
  cafe: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
  restaurant: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  mess: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
  grocery: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
  bakery: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
  hotel: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  salon: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
  default: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
};

export default function ShopHero({ shop }) {
  const categoryKey = (shop.category?.name || shop.category || "").toLowerCase();
  const coverBanner =
    shop.coverImage ||
    shop.images?.banner ||
    CATEGORY_FALLBACK_IMAGES[categoryKey] ||
    CATEGORY_FALLBACK_IMAGES.default;

  const logoUrl = shop.logo || shop.images?.logo || null;

  const isOpen = shop.isOpen !== false;
  const statusLabel = isOpen ? "Open Now" : "Closed";
  const statusClass = isOpen
    ? "text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-900"
    : "text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-900";

  const ratingVal = typeof shop.rating === "number" ? shop.rating.toFixed(1) : (shop.rating?.average ? shop.rating.average.toFixed(1) : "4.5");
  const totalReviews = shop.reviewsCount || shop.rating?.totalReviews || 120;

  return (
    <section className="bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 transition-colors">
      {/* Cover Image Banner */}
      <div className="relative h-48 sm:h-64 lg:h-72 w-full overflow-hidden bg-slate-900">
        <img
          src={coverBanner}
          alt={shop.name}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Verification Pill top right */}
        {shop.isVerified && (
          <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur text-white text-xs font-black px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
            <FaShieldAlt size={12} />
            <span>VERIFIED PARTNER</span>
          </div>
        )}
      </div>

      {/* Hero Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-16 sm:-mt-20 z-10 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          
          {/* Logo & Shop Title */}
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-800 shadow-xl overflow-hidden flex items-center justify-center shrink-0">
              {logoUrl ? (
                <img src={logoUrl} alt={shop.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">🏪</span>
              )}
            </div>

            <div className="mb-1 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                  {shop.name}
                </h1>
                {shop.isVerified && (
                  <span className="text-blue-500" title="Verified Shop">
                    <FiCheckCircle size={22} className="fill-blue-500 text-white" />
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-gray-500 dark:text-slate-400 flex items-center gap-2">
                <span className="capitalize">{shop.category?.name || shop.category || "Local Marketplace"}</span>
                <span>•</span>
                <span>{shop.address?.area || shop.address?.city || "Local Community"}</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">₹₹</span>
              </p>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="bg-emerald-600 text-white rounded-2xl p-3 shadow-lg shadow-emerald-600/20 text-center min-w-[76px]">
              <div className="flex items-center justify-center gap-1 font-black text-xl leading-none">
                <span>{ratingVal}</span>
                <FiStar size={16} className="fill-current" />
              </div>
              <p className="text-[10px] font-extrabold uppercase mt-1 opacity-90">
                {totalReviews} ratings
              </p>
            </div>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 dark:bg-slate-900/80 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2.5">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${statusClass}`}>
              {statusLabel}
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-700 dark:text-slate-300 font-bold">
            <FiClock className="text-orange-500" size={16} />
            <span>Delivery: {shop.deliveryTime || "25-35 mins"}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700 dark:text-slate-300 font-bold">
            <FiInfo className="text-blue-500" size={16} />
            <span>Min Order: ₹{shop.minimumOrder ?? 99}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-700 dark:text-slate-300 font-bold">
            <FiMapPin className="text-rose-500" size={16} />
            <span>{shop.address?.city || "Hyperlocal"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

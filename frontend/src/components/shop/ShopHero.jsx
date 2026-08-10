import { FiStar, FiMapPin, FiClock, FiInfo, FiMoreHorizontal } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ShopHero({ shop }) {
  const statusLabel = shop.isOpen ? "Open Now" : "Closed";
  const statusClass = shop.isOpen ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50";
  
  const rating = shop.rating != null ? shop.rating.toFixed(1) : "0.0";
  const isHighRating = parseFloat(rating) >= 4.0;
  const ratingBg = isHighRating ? "bg-green-700" : (parseFloat(rating) >= 3.0 ? "bg-yellow-500" : "bg-orange-500");

  return (
    <section className="bg-white dark:bg-slate-950 pt-8 pb-6 border-b border-dashed border-gray-200 dark:border-slate-800">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Top Actions */}
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide mb-6">
          <div className="flex items-center gap-2">
            <span>Home</span>
            <span>/</span>
            <span>{shop.address?.city || "Location"}</span>
            <span>/</span>
            <span className="text-gray-900 dark:text-gray-100">{shop.name}</span>
          </div>
          <button className="hover:text-gray-900 dark:hover:text-gray-100 transition">
            <FiMoreHorizontal size={20} />
          </button>
        </div>

        {/* Primary Info & Rating */}
        <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              {shop.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
              {shop.category || "Local Store"} • {shop.address?.area || shop.address?.city || "Nearby"}
            </p>
            
            <div className="flex items-center gap-3 mt-3">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${statusClass}`}>
                {statusLabel}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 font-medium">
                <FiClock size={12} className="text-gray-400" /> 
                {shop.businessHours?.monday?.open || "9:00 AM"} - {shop.businessHours?.monday?.close || "9:00 PM"}
              </span>
            </div>
          </div>

          {/* Swiggy/Zomato Style Rating Box */}
          <div className="flex flex-col items-center justify-center border border-gray-200 dark:border-slate-700 rounded-xl p-2 shadow-sm bg-white dark:bg-slate-900 shrink-0 min-w-[72px]">
            <div className={`flex items-center gap-1 font-extrabold text-white px-2.5 py-1 rounded-lg text-sm shadow-sm ${ratingBg}`}>
              <span>{rating}</span>
              <FiStar size={12} className="fill-current" />
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold mt-1.5 uppercase tracking-wide border-t border-dashed border-gray-200 dark:border-slate-700 pt-1.5 w-full text-center">
              {shop.reviewsCount || "100+"} ratings
            </div>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="mt-8 flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-3 w-1/3">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300">
              <FiClock size={14} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Delivery</p>
              <p className="text-sm font-extrabold text-gray-900 dark:text-white mt-0.5">{shop.deliveryTime || `${shop.deliverySettings?.averageDeliveryTime ?? 30} mins`}</p>
            </div>
          </div>
          
          <div className="w-px h-10 bg-gray-200 dark:bg-slate-700"></div>

          <div className="flex items-center gap-3 w-1/3 justify-center">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300">
              <FiInfo size={14} />
            </div>
            <div>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Min Order</p>
              <p className="text-sm font-extrabold text-gray-900 dark:text-white mt-0.5">₹{shop.minimumOrder ?? shop.deliverySettings?.minimumOrder ?? 0}</p>
            </div>
          </div>

          <div className="w-px h-10 bg-gray-200 dark:bg-slate-700"></div>

          <div className="flex items-center gap-3 w-1/3 justify-end">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-gray-600 dark:text-gray-300">
              <FiMapPin size={14} />
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Distance</p>
              <p className="text-sm font-extrabold text-gray-900 dark:text-white mt-0.5">2.5 km</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

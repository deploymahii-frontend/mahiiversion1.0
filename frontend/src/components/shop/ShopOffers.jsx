import { FiTag } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getShopPromotions } from "../../services/promotion.service";
import { motion } from "framer-motion";

export default function ShopOffers({ shop }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shop?._id || shop?.id) {
      fetchPromotions(shop._id || shop.id);
    } else {
      setLoading(false);
    }
  }, [shop]);

  const fetchPromotions = async (id) => {
    try {
      const { data } = await getShopPromotions(id);
      if (data?.data) {
        setOffers(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch shop promotions", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-6 flex gap-4 overflow-x-auto">
        <div className="min-w-[200px] h-20 bg-gray-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
        <div className="min-w-[200px] h-20 bg-gray-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  if (offers.length === 0) return null;

  return (
    <section className="py-6 border-b border-dashed border-gray-200 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-4">
        <FiTag className="text-gray-900 dark:text-gray-100" />
        <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Available Offers</h2>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {offers.map((offer) => (
          <motion.div
            whileHover={{ scale: 0.98 }}
            key={offer._id || offer.id}
            className="snap-start shrink-0 min-w-[240px] max-w-[280px] bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-4 flex items-center gap-3 shadow-sm relative overflow-hidden"
          >
            {/* Left cutout */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-50 dark:bg-slate-950 rounded-full border-r border-gray-200 dark:border-slate-700"></div>
            
            <div className="flex-1 pl-2">
              <div className="flex items-center gap-1.5">
                 <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                    %
                 </div>
                 <h3 className="font-extrabold text-gray-900 dark:text-white text-sm line-clamp-1">
                   {offer.discountPercentage ? `${offer.discountPercentage}% OFF` : (offer.title || offer.name)}
                 </h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 font-medium">{offer.description || "Use code at checkout"}</p>
            </div>
            
            {/* Right cutout */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-gray-50 dark:bg-slate-950 rounded-full border-l border-gray-200 dark:border-slate-700"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

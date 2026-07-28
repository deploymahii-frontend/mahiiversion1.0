import { FiTag } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getShopPromotions } from "../../services/promotion.service";

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
      <section className="max-w-7xl mx-auto px-5 mt-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 text-gray-500 dark:text-slate-400">Loading offers...</div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 mt-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <FiTag className="text-orange-500 text-2xl" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Today's Offers</h2>
        </div>

        {offers.length === 0 ? (
          <p className="text-gray-500 dark:text-slate-400">No active offers available.</p>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => (
              <div
                key={offer._id || offer.id}
                className="border border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-950/30 rounded-2xl p-5"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{offer.title || offer.name}</h3>

                <p className="text-gray-700 dark:text-slate-300 mt-2">{offer.description}</p>

                {offer.discountPercentage && (
                  <p className="text-sm font-bold text-orange-600 dark:text-orange-400 mt-2">
                    {offer.discountPercentage}% OFF
                  </p>
                )}

                {offer.endDate && (
                  <p className="text-xs text-orange-600/80 dark:text-orange-400/80 mt-3">
                    Valid till {new Date(offer.endDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

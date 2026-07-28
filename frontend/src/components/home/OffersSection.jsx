import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiGift, FiChevronRight } from "react-icons/fi";
import { getNearbyPromotions } from "../../services/promotion.service";
import { todaysOffers as mockOffers } from "../../data/mockData";

export default function OffersSection() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      // Mock latitude and longitude for now (Kolhapur coordinates)
      const { data } = await getNearbyPromotions(16.7050, 74.2433);
      if (data?.data && data.data.length > 0) {
        setOffers(data.data);
      } else {
        setOffers(mockOffers); // fallback
      }
    } catch (error) {
      setOffers(mockOffers);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-5 mt-12">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            <FiGift className="text-pink-500" />
            Today's Offers
          </h2>

          <p className="text-gray-500 dark:text-slate-400 text-sm">
            Best deals available around you.
          </p>
        </div>

        <Link to="/explore" className="flex items-center gap-1 text-orange-500 font-semibold hover:text-orange-600 transition">
          See All
          <FiChevronRight />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 p-10 text-center text-gray-500 dark:text-slate-400">Loading offers...</div>
        ) : (
          offers.map((offer) => (
            <div
              key={offer.id || offer._id}
              className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-lg border border-gray-100 dark:border-slate-800"
            >
              <img
                src={offer.image || offer.bannerImage || "https://images.unsplash.com/photo-1544025162-d76694265947?w=800"}
                alt={offer.name || offer.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <span className="inline-block bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                  {offer.offer || offer.discountPercentage ? `${offer.discountPercentage}% OFF` : 'PROMO'}
                </span>

                <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{offer.name || offer.title}</h3>

                <p className="text-gray-500 dark:text-slate-400 mt-1">{offer.title || offer.description}</p>

                <Link 
                  to={offer.shop ? `/shop/${offer.shop.slug || offer.shop}` : "/explore"} 
                  className="mt-5 block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition shadow-md shadow-orange-500/20"
                >
                  View Offer
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

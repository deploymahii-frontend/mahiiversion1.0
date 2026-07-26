import { FiTag } from "react-icons/fi";
import useOffers from "../../hooks/useOffers";

export default function ShopOffers({ shop }) {
  const { offers, loading } = useOffers(shop?._id);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-5 mt-8">
        <div className="bg-white rounded-3xl p-6">Loading offers...</div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 mt-8">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <FiTag className="text-orange-500 text-2xl" />
          <h2 className="text-2xl font-bold">Today's Offers</h2>
        </div>

        {offers.length === 0 ? (
          <p className="text-gray-500">No active offers available.</p>
        ) : (
          <div className="space-y-4">
            {offers.map((offer) => (
              <div
                key={offer._id}
                className="border border-orange-200 bg-orange-50 rounded-2xl p-5"
              >
                <h3 className="text-lg font-semibold">{offer.title}</h3>

                <p className="text-gray-700 mt-2">{offer.description}</p>

                {offer.validTill && (
                  <p className="text-sm text-orange-600 mt-3">
                    Valid till {new Date(offer.validTill).toLocaleDateString()}
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

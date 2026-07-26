import { todaysOffers } from "../../data/mockData";
import { FiGift, FiChevronRight } from "react-icons/fi";

export default function OffersSection() {
  return (
    <section className="max-w-7xl mx-auto px-5 mt-12">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiGift className="text-pink-500" />
            Today's Offers
          </h2>

          <p className="text-gray-500 text-sm">
            Best deals available around you.
          </p>
        </div>

        <button className="flex items-center gap-1 text-orange-500 font-semibold">
          See All
          <FiChevronRight />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {todaysOffers.map((offer) => (
          <div
            key={offer.id}
            className="rounded-3xl overflow-hidden bg-white shadow-lg"
          >
            <img
              src={offer.image}
              alt={offer.name}
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              <span className="inline-block bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                {offer.offer}
              </span>

              <h3 className="mt-4 text-xl font-bold">{offer.name}</h3>

              <p className="text-gray-500">{offer.title}</p>

              <button className="mt-5 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold">
                View Offer
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

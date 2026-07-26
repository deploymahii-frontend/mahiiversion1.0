import { Flame, Clock } from "lucide-react";

const offers = [
  {
    id: 1,
    shop: "Shree Mess",
    title: "Student Meal Offer",
    discount: "20% OFF",
    expires: "Ends in 2h",
    image: "/images/offers/mess.jpg",
  },
  {
    id: 2,
    shop: "Urban Cafe",
    title: "Buy 1 Get 1 Coffee",
    discount: "BOGO",
    expires: "Today Only",
    image: "/images/offers/cafe.jpg",
  },
  {
    id: 3,
    shop: "Fresh Grocery",
    title: "Vegetable Combo",
    discount: "Save ₹150",
    expires: "Ends Tonight",
    image: "/images/offers/grocery.jpg",
  },
];

export default function FlashOffersSection() {
  return (
    <section className="py-12 bg-yellow-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center gap-3 mb-8">

          <Flame className="text-orange-500" />

          <h2 className="text-3xl font-bold">
            Flash Offers
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {offers.map((offer) => (

            <div
              key={offer.id}
              className="overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg transition"
            >

              <img
                src={offer.image}
                alt={offer.shop}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">

                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                  {offer.discount}
                </span>

                <h3 className="mt-4 text-xl font-bold">
                  {offer.title}
                </h3>

                <p className="text-gray-500">
                  {offer.shop}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm text-orange-600">

                  <Clock size={16} />

                  {offer.expires}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

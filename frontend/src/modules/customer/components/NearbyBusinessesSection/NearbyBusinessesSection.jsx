import {
  Star,
  MapPin,
  Heart,
  Phone,
  Navigation,
} from "lucide-react";

const businesses = [
  {
    id: 1,
    name: "Shree Mess",
    category: "Mess",
    rating: 4.8,
    reviews: 342,
    distance: "0.8 km",
    status: "Open",
    image: "/images/businesses/shree-mess.jpg",
  },
  {
    id: 2,
    name: "Urban Cafe",
    category: "Cafe",
    rating: 4.7,
    reviews: 210,
    distance: "1.2 km",
    status: "Open",
    image: "/images/businesses/urban-cafe.jpg",
  },
  {
    id: 3,
    name: "Fresh Grocery",
    category: "Grocery",
    rating: 4.9,
    reviews: 520,
    distance: "1.8 km",
    status: "Closed",
    image: "/images/businesses/grocery.jpg",
  },
];

export default function NearbyBusinessesSection() {
  return (
    <section className="py-14 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Nearby Businesses
          </h2>

          <button className="text-yellow-600 font-semibold">
            View All
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-8">

          {businesses.map((business) => (

            <div
              key={business.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white hover:shadow-xl transition"
            >

              <div className="relative">

                <img
                  src={business.image}
                  alt={business.name}
                  className="h-52 w-full object-cover"
                />

                <button className="absolute top-4 right-4 rounded-full bg-white p-2 shadow">
                  <Heart size={18}/>
                </button>

              </div>

              <div className="p-5">

                <div className="flex items-center justify-between">

                  <h3 className="text-xl font-bold">
                    {business.name}
                  </h3>

                  <span
                    className={`text-sm font-semibold ${
                      business.status === "Open"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {business.status}
                  </span>

                </div>

                <p className="text-gray-500 mt-1">
                  {business.category}
                </p>

                <div className="mt-4 flex items-center gap-4 text-sm">

                  <div className="flex items-center gap-1">

                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    {business.rating}

                    <span className="text-gray-400">
                      ({business.reviews})
                    </span>

                  </div>

                  <div className="flex items-center gap-1">

                    <MapPin size={16}/>

                    {business.distance}

                  </div>

                </div>

                <div className="grid grid-cols-3 gap-3 mt-6">

                  <button className="rounded-xl border py-2">
                    View
                  </button>

                  <button className="rounded-xl border py-2">
                    <Phone
                      size={18}
                      className="mx-auto"
                    />
                  </button>

                  <button className="rounded-xl border py-2">
                    <Navigation
                      size={18}
                      className="mx-auto"
                    />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

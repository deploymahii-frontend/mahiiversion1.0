import {
  Star,
  MapPin,
  Heart,
  ShoppingBag,
} from "lucide-react";

const recommendations = [
  {
    id: 1,
    name: "Royal Biryani",
    type: "Restaurant",
    rating: 4.9,
    distance: "1.5 km",
    image: "/images/recommendations/biryani.jpg",
    reason: "Based on your food preferences",
  },
  {
    id: 2,
    name: "Tech World",
    type: "Electronics",
    rating: 4.8,
    distance: "2.1 km",
    image: "/images/recommendations/electronics.jpg",
    reason: "Popular near you",
  },
  {
    id: 3,
    name: "FitLife Gym",
    type: "Gym",
    rating: 4.7,
    distance: "900 m",
    image: "/images/recommendations/gym.jpg",
    reason: "Trending this week",
  },
];

export default function RecommendedSection() {
  return (
    <section className="py-14 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Recommended For You
          </h2>

          <button className="text-yellow-600 font-semibold">
            See More
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          {recommendations.map((item) => (

            <div
              key={item.id}
              className="rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-5">

                <div className="flex justify-between">

                  <div>

                    <h3 className="font-bold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-gray-500">
                      {item.type}
                    </p>

                  </div>

                  <button>

                    <Heart size={20} />

                  </button>

                </div>

                <div className="flex items-center gap-5 mt-4 text-sm">

                  <div className="flex items-center gap-1">

                    <Star
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    {item.rating}

                  </div>

                  <div className="flex items-center gap-1">

                    <MapPin size={16} />

                    {item.distance}

                  </div>

                </div>

                <div className="mt-4 rounded-xl bg-yellow-50 p-3 text-sm text-yellow-700">
                  {item.reason}
                </div>

                <button className="w-full mt-5 rounded-xl bg-yellow-500 py-3 font-semibold text-black hover:bg-yellow-600 transition">

                  <ShoppingBag
                    className="inline mr-2"
                    size={18}
                  />

                  View Details

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

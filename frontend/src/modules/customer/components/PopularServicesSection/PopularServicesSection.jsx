import {
  Wrench,
  Zap,
  Car,
  Home,
  BookOpen,
  Shirt,
  Star,
  MapPin,
} from "lucide-react";

const services = [
  {
    id: 1,
    name: "Electrician",
    provider: "PowerFix Services",
    rating: 4.9,
    distance: "1.2 km",
    icon: Zap,
  },
  {
    id: 2,
    name: "Plumber",
    provider: "Quick Plumbing",
    rating: 4.8,
    distance: "900 m",
    icon: Wrench,
  },
  {
    id: 3,
    name: "Laundry",
    provider: "Fresh Wash",
    rating: 4.7,
    distance: "2.1 km",
    icon: Shirt,
  },
  {
    id: 4,
    name: "Home Cleaning",
    provider: "Clean Home",
    rating: 4.9,
    distance: "3 km",
    icon: Home,
  },
  {
    id: 5,
    name: "Tutor",
    provider: "Smart Classes",
    rating: 4.8,
    distance: "1.5 km",
    icon: BookOpen,
  },
  {
    id: 6,
    name: "Taxi",
    provider: "City Ride",
    rating: 4.6,
    distance: "Nearby",
    icon: Car,
  },
];

export default function PopularServicesSection() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold">
              Popular Services
            </h2>

            <p className="text-gray-500 mt-2">
              Trusted professionals near you.
            </p>

          </div>

          <button className="text-yellow-600 font-semibold">
            View All
          </button>

        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mt-8">

          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className="rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition"
              >

                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">

                  <Icon size={30} />

                </div>

                <h3 className="mt-5 font-bold text-center">
                  {service.name}
                </h3>

                <p className="text-sm text-center text-gray-500 mt-1">
                  {service.provider}
                </p>

                <div className="flex items-center justify-center gap-2 mt-4 text-sm">

                  <Star
                    size={15}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  {service.rating}

                </div>

                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">

                  <MapPin size={14} />

                  {service.distance}

                </div>

                <button className="mt-5 w-full rounded-xl bg-yellow-500 py-2 font-semibold hover:bg-yellow-600 transition">
                  Book
                </button>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

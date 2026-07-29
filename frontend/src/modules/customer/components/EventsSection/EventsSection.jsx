import {
  Calendar,
  MapPin,
  Users,
  ArrowRight,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Kolhapur Food Festival",
    date: "27 Jul",
    location: "Tarabai Park",
    attendees: "2.3k",
    image: "/images/events/food-festival.jpg",
    category: "Food",
  },
  {
    id: 2,
    title: "Startup Meetup",
    date: "30 Jul",
    location: "KIT College",
    attendees: "680",
    image: "/images/events/startup.jpg",
    category: "Business",
  },
  {
    id: 3,
    title: "Weekend Night Market",
    date: "02 Aug",
    location: "Shahupuri",
    attendees: "4.5k",
    image: "/images/events/night-market.jpg",
    category: "Shopping",
  },
];

export default function EventsSection() {
  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold">
              Events Near You
            </h2>

            <p className="text-gray-500 mt-2">
              Discover local experiences happening nearby.
            </p>

          </div>

          <button className="text-yellow-600 font-semibold flex items-center gap-2">
            View All
            <ArrowRight size={18}/>
          </button>

        </div>

        <div className="grid md:grid-cols-3 gap-7 mt-8">

          {events.map((event) => (

            <div
              key={event.id}
              className="rounded-2xl overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition"
            >

              <img
                src={event.image}
                alt={event.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                  {event.category}
                </span>

                <h3 className="mt-4 text-xl font-bold">
                  {event.title}
                </h3>

                <div className="mt-4 space-y-2 text-gray-600">

                  <div className="flex items-center gap-2">

                    <Calendar size={17}/>

                    {event.date}

                  </div>

                  <div className="flex items-center gap-2">

                    <MapPin size={17}/>

                    {event.location}

                  </div>

                  <div className="flex items-center gap-2">

                    <Users size={17}/>

                    {event.attendees} Interested

                  </div>

                </div>

                <button className="mt-6 w-full rounded-xl bg-yellow-500 py-3 font-semibold hover:bg-yellow-600 transition">

                  View Event

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  MapPin,
  BadgeCheck,
} from "lucide-react";

const moments = [
  {
    id: 1,
    creator: "Shree Mess",
    creatorType: "shop_owner",
    title: "Unlimited Student Thali 🍛",
    location: "Kolhapur",
    likes: 1240,
    comments: 94,
    thumbnail: "/images/moments/moment-1.jpg",
  },
  {
    id: 2,
    creator: "Mahii Creator",
    creatorType: "creator",
    title: "Best Cafes Under ₹200",
    location: "Kolhapur",
    likes: 982,
    comments: 61,
    thumbnail: "/images/moments/moment-2.jpg",
  },
];

export default function MomentsSection() {
  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">
            Trending Mahii Moments
          </h2>

          <button className="text-yellow-600 font-semibold">
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {moments.map((moment) => (
            <div
              key={moment.id}
              className="rounded-2xl overflow-hidden bg-white shadow hover:shadow-xl transition"
            >

              <div className="relative">

                <img
                  src={moment.thumbnail}
                  alt={moment.title}
                  className="h-80 w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">

                  <div className="rounded-full bg-white p-4">

                    <Play
                      className="fill-black"
                      size={28}
                    />

                  </div>

                </div>

              </div>

              <div className="p-4">

                <div className="flex items-center gap-2">

                  <strong>
                    {moment.creator}
                  </strong>

                  {moment.creatorType !== "customer" && (
                    <BadgeCheck
                      size={18}
                      className="text-blue-500"
                    />
                  )}

                </div>

                <p className="mt-2 font-medium">
                  {moment.title}
                </p>

                <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">

                  <MapPin size={15}/>

                  {moment.location}

                </div>

                <div className="flex justify-between mt-5">

                  <div className="flex items-center gap-1">
                    <Heart size={18}/>
                    {moment.likes}
                  </div>

                  <div className="flex items-center gap-1">
                    <MessageCircle size={18}/>
                    {moment.comments}
                  </div>

                  <Share2 size={18}/>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

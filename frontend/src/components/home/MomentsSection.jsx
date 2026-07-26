import { moments } from "../../data/mockData";
import { FiPlay, FiChevronRight } from "react-icons/fi";

export default function MomentsSection() {
  return (
    <section className="max-w-7xl mx-auto px-5 mt-12">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-2xl font-bold">🎥 Mahii Moments</h2>

          <p className="text-gray-500 text-sm">
            Real food. Real people. Real experiences.
          </p>
        </div>

        <button className="flex items-center gap-1 text-orange-500 font-semibold">
          See All
          <FiChevronRight />
        </button>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4">
        {moments.map((moment) => (
          <div
            key={moment.id}
            className="relative min-w-[260px] h-[420px] rounded-3xl overflow-hidden shadow-lg"
          >
            <img
              src={moment.image}
              alt={moment.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <button className="absolute top-4 right-4 bg-white rounded-full p-3">
              <FiPlay />
            </button>

            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="font-bold text-lg">{moment.title}</h3>

              <p>{moment.shop}</p>

              <p className="text-sm opacity-80">👀 {moment.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

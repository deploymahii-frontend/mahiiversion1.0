import { useState } from "react";
import { moments as initialMoments } from "../../data/mockData";
import { FiPlay, FiChevronRight, FiHeart, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function MomentsSection() {
  const navigate = useNavigate();
  const [items, setItems] = useState(
    initialMoments.map((m) => ({
      ...m,
      likes: Math.floor(Math.random() * 100) + 40,
      liked: false,
    }))
  );

  const toggleLike = (e, id) => {
    e.stopPropagation();
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              liked: !item.liked,
              likes: item.liked ? item.likes - 1 : item.likes + 1,
            }
          : item
      )
    );
  };

  const handleOpenMoment = (moment) => {
    toast.success(`Playing ${moment.title} from ${moment.shop}`);
    navigate("/moments");
  };

  return (
    <section className="max-w-7xl mx-auto px-5 mt-12">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <span>🎥</span> Mahii Moments
          </h2>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-0.5">
            Real food. Real people. Real local experiences.
          </p>
        </div>

        <button
          onClick={() => navigate("/moments")}
          className="flex items-center gap-1 text-orange-500 font-bold hover:text-orange-600 transition text-sm"
        >
          <span>See All</span>
          <FiChevronRight />
        </button>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((moment) => (
          <div
            key={moment.id}
            onClick={() => handleOpenMoment(moment)}
            className="relative min-w-[260px] h-[400px] rounded-3xl overflow-hidden shadow-lg group cursor-pointer border border-gray-100 dark:border-slate-800 transition transform hover:-translate-y-1"
          >
            <img
              src={moment.image}
              alt={moment.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenMoment(moment);
              }}
              className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 text-orange-500 rounded-full p-3 shadow-md hover:scale-110 transition"
            >
              <FiPlay size={18} />
            </button>

            <button
              onClick={(e) => toggleLike(e, moment.id)}
              className="absolute top-4 left-4 bg-black/40 backdrop-blur text-white rounded-full p-2.5 shadow hover:scale-110 transition flex items-center gap-1.5 px-3"
            >
              <FiHeart
                size={16}
                className={moment.liked ? "text-red-500 fill-current" : "text-white"}
              />
              <span className="text-xs font-bold">{moment.likes}</span>
            </button>

            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-orange-500 text-[10px] font-bold uppercase tracking-wider mb-2">
                {moment.shop}
              </span>
              <h3 className="font-bold text-base leading-snug line-clamp-2">{moment.title}</h3>

              <div className="flex items-center gap-2 mt-2 text-xs text-gray-300">
                <span className="flex items-center gap-1">
                  <FiEye size={13} /> {moment.views} views
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

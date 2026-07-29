import { useState } from "react";
import { moments as initialMoments } from "../../data/mockData";
import { FiPlay, FiChevronRight, FiHeart, FiEye, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function MomentsSection() {
  const navigate = useNavigate();
  const { authenticated } = useAuth();
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

  const handleCreate = () => {
    if (!authenticated) {
      toast("Please log in to create a Moment 📸", { icon: "🔒" });
      navigate("/login?redirect=/create-moment");
      return;
    }
    navigate("/create-moment");
  };

  const handleOpenMoment = (moment) => {
    // Increment local view count for the moment (if numeric)
    setItems((prev) =>
      prev.map((item) =>
        item.id === moment.id
          ? { ...item, views: typeof item.views === "number" ? item.views + 1 : item.views }
          : item
      )
    );
    // Navigate to the shop page using a slug derived from the shop name
    const shopSlug = moment.shop.toLowerCase().replace(/\s+/g, "-");
    navigate(`/shop/${shopSlug}`);
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

        <div className="flex items-center gap-2">
          <button
            onClick={handleCreate}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition"
          >
            <FiPlus size={14} />
            <span className="hidden sm:inline">Create</span>
          </button>
          <button
            onClick={() => navigate("/moments")}
            className="flex items-center gap-1 text-orange-500 font-bold hover:text-orange-600 transition text-sm"
          >
            <span>See All</span>
            <FiChevronRight />
          </button>
        </div>
      </div>

      <div className="flex gap-3 sm:gap-5 overflow-x-auto pb-4 scrollbar-hide px-1">

        {items.map((moment) => (
          <div
            key={moment.id}
            onClick={() => handleOpenMoment(moment)}
            className="relative w-[140px] min-w-[140px] h-[250px] sm:w-[200px] sm:min-w-[200px] sm:h-[355px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md group cursor-pointer border border-gray-100 dark:border-slate-800 flex-shrink-0"
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
              className="absolute top-3 right-3 bg-white/90 dark:bg-slate-900/90 text-orange-500 rounded-full p-2 shadow-md hover:scale-110 transition"
            >
              <FiPlay size={14} className="sm:w-5 sm:h-5" />
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

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="inline-block px-2 py-0.5 rounded-full bg-orange-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1.5">
                {moment.shop}
              </span>
              <h3 className="font-bold text-xs sm:text-sm leading-snug line-clamp-2">{moment.title}</h3>

              <div className="flex items-center gap-2 mt-1.5 text-[10px] sm:text-xs text-gray-300">
                <span className="flex items-center gap-1">
                  <FiEye size={12} /> {moment.views} views
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

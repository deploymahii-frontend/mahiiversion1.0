import useMoments from "../../hooks/useMoments";
import { FiHeart, FiPlay } from "react-icons/fi";

import api from "../../services/api";

export default function ShopMoments({ shopId }) {
  const { moments, loading } = useMoments(shopId);

  if (loading) {
    return <div className="p-6 bg-white rounded-3xl">Loading moments...</div>;
  }

  const getImageUrl = (url) => {
    if (!url) return url;
    let imageUrl = url.replace(/\\/g, "/");
    if (imageUrl.startsWith("uploads/")) {
      imageUrl = `/${imageUrl}`;
    }

    const baseUrl = api.defaults.baseURL.replace("/api/v1", "");
    if (imageUrl.startsWith("http://localhost:5000")) {
      return imageUrl.replace("http://localhost:5000", baseUrl);
    }
    if (imageUrl.startsWith("/uploads")) {
      return `${baseUrl}${imageUrl}`;
    }
    return imageUrl;
  };

  return (
    <section className="w-full">
      {moments.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
          No moments yet.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {moments.map((moment) => (
            <div
              key={moment._id}
              className="relative rounded-2xl overflow-hidden shadow-lg group"
            >
              <img
                src={getImageUrl(moment.thumbnailUrl || moment.mediaUrl)}
                alt=""
                className="w-full h-72 object-cover"
              />

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <FiPlay className="text-white" size={40} />
              </div>

              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 text-white px-3 py-1 rounded-full">
                <FiHeart />
                {moment.likes || 0}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

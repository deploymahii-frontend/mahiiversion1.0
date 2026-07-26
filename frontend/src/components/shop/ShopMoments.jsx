import useMoments from "../../hooks/useMoments";
import { FiHeart, FiPlay } from "react-icons/fi";

export default function ShopMoments({ shop }) {
  const { moments, loading } = useMoments(shop?._id);

  if (loading) {
    return <div className="p-6 bg-white rounded-3xl">Loading moments...</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-5 mt-8">
      <h2 className="text-2xl font-bold mb-6">Mahii Moments</h2>

      {moments.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center text-gray-500">
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
                src={moment.thumbnail || moment.media}
                alt=""
                className="w-full h-72 object-cover"
              />

              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <FiPlay className="text-white" size={40} />
              </div>

              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 text-white px-3 py-1 rounded-full">
                <FiHeart />
                {moment.likes}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

import React, { useEffect, useState } from "react";
import { FiCamera, FiEye, FiHeart } from "react-icons/fi";
import momentService from "../../services/moment.service";
import MomentCard from "../moments/MomentCard";

export default function ShopMoments({ shopId }) {
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (shopId) {
      loadShopMoments();
    }
  }, [shopId]);

  const loadShopMoments = async () => {
    try {
      setLoading(true);
      const res = await momentService.getShopMoments(shopId);
      setMoments(res.data || []);
    } catch (err) {
      console.error("Failed to load shop moments", err);
    } fontally: {
      setLoading(false);
    }
  };

  if (!loading && moments.length === 0) {
    return null; // Hide section if shop has no moments yet
  }

  return (
    <div className="my-10 border-t border-gray-100 dark:border-slate-800 pt-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
            <FiCamera size={18} />
          </div>
          <div>
            <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">
              Shop Moments & Highlights
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">
              Visual feed posts and customer reviews from this shop
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-xs text-gray-400">Loading moments...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moments.map((moment) => (
            <MomentCard key={moment._id || moment.id} moment={moment} />
          ))}
        </div>
      )}
    </div>
  );
}

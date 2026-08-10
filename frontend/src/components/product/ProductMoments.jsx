import React, { useEffect, useState } from "react";
import { FiCamera } from "react-icons/fi";
import momentService from "../../services/moment.service";
import MomentCard from "../moments/MomentCard";

export default function ProductMoments({ productId }) {
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      loadProductMoments();
    }
  }, [productId]);

  const loadProductMoments = async () => {
    try {
      setLoading(true);
      const res = await momentService.getProductMoments(productId);
      setMoments(res.data || []);
    } catch (err) {
      console.error("Failed to load product moments", err);
    } finally {
      setLoading(false);
    }
  };

  if (!loading && moments.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 border-t border-gray-200 dark:border-slate-800 space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400">
          <FiCamera size={18} />
        </div>
        <div>
          <h3 className="font-extrabold text-gray-900 dark:text-white text-lg">
            Featured in Moments ✨
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-400">
            See how local food creators and customers enjoy this item
          </p>
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

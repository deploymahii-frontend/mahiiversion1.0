import { useEffect, useState } from "react";
import {
  FiMapPin,
  FiPhone,
  FiShare2,
  FiHeart,
  FiBookmark,
  FiAlertCircle,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const STORAGE_FAVORITES = "favorite_shops";
const STORAGE_FOLLOWS = "followed_shops";

export default function ShopQuickActions({ shop }) {
  const [saved, setSaved] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    if (!shop) return;

    const savedShops = JSON.parse(localStorage.getItem(STORAGE_FAVORITES) || "[]");
    const followedShops = JSON.parse(localStorage.getItem(STORAGE_FOLLOWS) || "[]");
    const id = shop._id || shop.id || shop.slug;

    setSaved(savedShops.includes(id));
    setFollowed(followedShops.includes(id));
  }, [shop]);

  const persistList = (key, nextState) => {
    localStorage.setItem(key, JSON.stringify(nextState));
  };

  const toggleSave = () => {
    if (!shop) return;
    const id = shop._id || shop.id || shop.slug;
    const savedShops = JSON.parse(localStorage.getItem(STORAGE_FAVORITES) || "[]");
    const next = savedShops.includes(id)
      ? savedShops.filter((item) => item !== id)
      : [...savedShops, id];

    persistList(STORAGE_FAVORITES, next);
    setSaved(!saved);
    toast.success(saved ? "Removed from saved shops" : "Shop saved for later");
  };

  const toggleFollow = () => {
    if (!shop) return;
    const id = shop._id || shop.id || shop.slug;
    const followedShops = JSON.parse(localStorage.getItem(STORAGE_FOLLOWS) || "[]");
    const next = followedShops.includes(id)
      ? followedShops.filter((item) => item !== id)
      : [...followedShops, id];

    persistList(STORAGE_FOLLOWS, next);
    setFollowed(!followed);
    toast.success(followed ? "Unfollowed shop" : "Following shop updates");
  };

  const openMaps = () => {
    const coordinates = shop.address?.location?.coordinates || shop.location?.coordinates;
    const [longitude, latitude] = coordinates || [0, 0];

    window.open(
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
      "_blank"
    );
  };

  const callShop = () => {
    if (!shop.phone) return;
    window.location.href = `tel:${shop.phone}`;
  };

  const shareShop = async () => {
    if (!shop?.name) return;
    if (navigator.share) {
      await navigator.share({
        title: shop.name,
        text: `Check out ${shop.name} on Mahii!`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Shop link copied to clipboard");
    }
  };

  const reportShop = () => {
    const subject = encodeURIComponent(`Report shop: ${shop.name}`);
    const body = encodeURIComponent(
      `I would like to report this shop on Mahii:\n\nShop Name: ${shop.name}\nShop URL: ${window.location.href}\nReason:`
    );
    window.location.href = `mailto:support@mahii.in?subject=${subject}&body=${body}`;
  };

  const actionItems = [
    {
      icon: <FiHeart size={16} className={followed ? "fill-rose-500 text-rose-500" : "text-gray-600 dark:text-gray-300"} />,
      label: followed ? "Following" : "Follow",
      onClick: toggleFollow,
      active: followed
    },
    {
      icon: <FiBookmark size={16} className={saved ? "fill-blue-500 text-blue-500" : "text-gray-600 dark:text-gray-300"} />,
      label: saved ? "Saved" : "Save",
      onClick: toggleSave,
      active: saved
    },
    {
      icon: <FiMapPin size={16} className="text-gray-600 dark:text-gray-300" />,
      label: "Direction",
      onClick: openMaps,
    },
    {
      icon: <FiPhone size={16} className="text-gray-600 dark:text-gray-300" />,
      label: "Call",
      onClick: callShop,
    },
    {
      icon: <FiShare2 size={16} className="text-gray-600 dark:text-gray-300" />,
      label: "Share",
      onClick: shareShop,
    },
    {
      icon: <FiAlertCircle size={16} className="text-gray-600 dark:text-gray-300" />,
      label: "Report",
      onClick: reportShop,
    },
  ];

  return (
    <section className="pt-6 pb-2">
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {actionItems.map((item) => (
          <motion.button
            whileTap={{ scale: 0.95 }}
            key={item.label}
            onClick={item.onClick}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-colors ${
              item.active 
                ? "border-gray-900 bg-gray-50 text-gray-900 dark:border-white dark:bg-slate-800 dark:text-white" 
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

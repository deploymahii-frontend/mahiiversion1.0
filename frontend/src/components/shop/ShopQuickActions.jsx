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
    toast.success(saved ? "Removed from saved shops" : "Shop saved to your favorites! ❤️");
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
    toast.success(followed ? "Unfollowed shop" : `Now following ${shop.name}! 🎉`);
  };

  const openMaps = () => {
    const coordinates = shop.address?.location?.coordinates || shop.location?.coordinates;
    if (coordinates && coordinates.length === 2) {
      const [longitude, latitude] = coordinates;
      window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, "_blank");
    } else {
      const query = encodeURIComponent(`${shop.name} ${shop.address?.city || ""}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
    }
  };

  const callShop = () => {
    if (!shop.phone && !shop.contactPhone) {
      toast.error("Contact number not available for this shop");
      return;
    }
    window.location.href = `tel:${shop.phone || shop.contactPhone}`;
  };

  const shareShop = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shop.name,
          text: `Check out ${shop.name} on Mahii!`,
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Shop link copied to clipboard 📋");
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
      icon: <FiHeart size={16} className={followed ? "fill-rose-500 text-rose-500" : "text-gray-600 dark:text-slate-300"} />,
      label: followed ? "Following" : "Follow",
      onClick: toggleFollow,
      active: followed,
    },
    {
      icon: <FiBookmark size={16} className={saved ? "fill-blue-500 text-blue-500" : "text-gray-600 dark:text-slate-300"} />,
      label: saved ? "Saved" : "Save",
      onClick: toggleSave,
      active: saved,
    },
    {
      icon: <FiMapPin size={16} className="text-gray-600 dark:text-slate-300" />,
      label: "Directions",
      onClick: openMaps,
    },
    {
      icon: <FiPhone size={16} className="text-gray-600 dark:text-slate-300" />,
      label: "Call Shop",
      onClick: callShop,
    },
    {
      icon: <FiShare2 size={16} className="text-gray-600 dark:text-slate-300" />,
      label: "Share",
      onClick: shareShop,
    },
    {
      icon: <FiAlertCircle size={16} className="text-gray-400 dark:text-slate-500" />,
      label: "Report",
      onClick: reportShop,
    },
  ];

  return (
    <section className="py-4">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {actionItems.map((item) => (
          <button
            key={item.label}
            onClick={item.onClick}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold transition-all shadow-xs ${
              item.active
                ? "border-gray-900 bg-gray-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import {
  FiMapPin,
  FiPhone,
  FiMessageCircle,
  FiShare2,
  FiGlobe,
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

  const openWhatsApp = () => {
    const whatsappUrl = shop.socialLinks?.whatsapp ||
      (shop.phone ? `https://wa.me/${shop.phone.replace(/\D/g, "")}` : "");
    if (whatsappUrl) window.open(whatsappUrl, "_blank");
  };

  const openWebsite = () => {
    if (shop.website) {
      window.open(shop.website, "_blank");
    }
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
      icon: <FiHeart size={24} className="text-pink-500" />,
      label: followed ? "Following" : "Follow",
      onClick: toggleFollow,
    },
    {
      icon: <FiBookmark size={24} className="text-indigo-500" />,
      label: saved ? "Saved" : "Save",
      onClick: toggleSave,
    },
    {
      icon: <FiMapPin size={24} className="text-orange-500" />,
      label: "Directions",
      onClick: openMaps,
    },
    {
      icon: <FiPhone size={24} className="text-green-600" />,
      label: "Call",
      onClick: callShop,
    },
    {
      icon: <FiShare2 size={24} className="text-blue-500" />,
      label: "Share",
      onClick: shareShop,
    },
    {
      icon: <FiAlertCircle size={24} className="text-red-500" />,
      label: "Report",
      onClick: reportShop,
    },
  ];

  const ActionButton = ({ icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-white rounded-3xl shadow p-4 hover:shadow-lg transition"
    >
      {icon}
      <span className="text-sm mt-2 text-slate-700 font-semibold">{label}</span>
    </button>
  );

  return (
    <section className="max-w-7xl mx-auto px-5 mt-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {actionItems.map((item) => (
          <ActionButton key={item.label} {...item} />
        ))}
      </div>
    </section>
  );
}

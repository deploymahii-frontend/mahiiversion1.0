import { useState } from "react";
import useWishlist from "../hooks/useWishlist";
import WishlistTabs from "../components/WishlistTabs";
import WishlistShopCard from "../components/WishlistShopCard";
import EmptyWishlist from "../components/EmptyWishlist";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const [activeTab, setActiveTab] = useState("SHOP");
  const { data = [], isLoading, removeItem } = useWishlist();
  const [removedIds, setRemovedIds] = useState([]);

  // Filter out locally removed items
  const displayList = data.filter(
    (s) => !removedIds.includes(s._id || s.id)
  );

  const handleRemove = async (shopId) => {
    setRemovedIds((prev) => [...prev, shopId]);
    toast.success("Removed from wishlist");
    try {
      await removeItem(shopId);
    } catch {
      // already removed from UI optimistically
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
        <div className="h-10 w-64 bg-slate-100 dark:bg-slate-800 rounded-xl" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-72 rounded-3xl bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            My Wishlist
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Your saved favorite mess, cafes, and food spots
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-sm font-bold px-4 py-2 rounded-2xl border border-rose-200 dark:border-rose-900/40">
          <Heart size={16} className="fill-rose-500 text-rose-500" />
          {displayList.length} saved
        </span>
      </div>

      {/* Tabs */}
      <WishlistTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Grid */}
      {!displayList.length ? (
        <EmptyWishlist />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayList.map((shop, idx) => (
            <WishlistShopCard
              key={shop._id || shop.id || idx}
              shop={shop}
              index={idx}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}

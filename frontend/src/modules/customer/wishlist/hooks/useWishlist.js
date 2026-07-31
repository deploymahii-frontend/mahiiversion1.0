import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import wishlistService from "../services/wishlist.service";
import api from "@/services/api";
import {
  nearbyShops,
  trendingShops,
  hiddenGems,
  recommendedShops,
} from "@/data/mockData";

// Combine all home-page shops into one master list (deduplicated by id)
function getHomePageShops() {
  const all = [
    ...nearbyShops,
    ...trendingShops,
    ...hiddenGems,
    ...recommendedShops,
  ];
  const seen = new Set();
  return all.filter((s) => {
    const key = s._id || s.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export default function useWishlist() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      try {
        // 1. Try fetching from real wishlist API
        const data = await wishlistService.getWishlist();
        if (Array.isArray(data) && data.length > 0) {
          // The backend populates the "shop" field via Mongoose.
          // Normalize so each item looks like a shop object.
          return data.map((item) => item.shop || item);
        }
      } catch (err) {
        console.warn("Wishlist API unavailable:", err?.message);
      }

      try {
        // 2. Try fetching real shops from /shops endpoint
        const { data: res } = await api.get("/shops");
        const shops = res?.data || res?.shops || [];
        if (Array.isArray(shops) && shops.length > 0) {
          return shops.slice(0, 8);
        }
      } catch {
        // ignore
      }

      // 3. Final fallback – use the same data shown on the home page
      return getHomePageShops();
    },
    staleTime: 1000 * 60 * 2,
  });

  const removeMutation = useMutation({
    mutationFn: (shopId) => wishlistService.toggleWishlist(shopId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });

  return {
    ...query,
    removeItem: removeMutation.mutateAsync,
  };
}

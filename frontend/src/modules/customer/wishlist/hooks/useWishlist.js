import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import wishlistService from "../services/wishlist.service";
import api from "@/services/api";

export default function useWishlist() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      try {
        const data = await wishlistService.getWishlist();
        if (Array.isArray(data) && data.length > 0) {
          return data.map((item) => item.shop || item);
        }
      } catch (err) {
        console.warn("Wishlist API unavailable:", err?.message);
      }

      return [];
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

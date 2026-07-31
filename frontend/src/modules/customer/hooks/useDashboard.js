import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import useAuthStore from "@/modules/auth/store/auth.store";

export default function useDashboard() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ["customer-dashboard", user?._id || user?.id],
    queryFn: async () => {
      try {
        const { data } = await api.get("/customer/dashboard");
        return data?.data || getFallbackData(user);
      } catch (err) {
        console.warn("Customer dashboard API unavailable, falling back to local state:", err?.message);
        return getFallbackData(user);
      }
    },
    staleTime: 1000 * 60 * 2,   // 2 min cache
    refetchOnWindowFocus: true,  // real-time on tab switch
    retry: 1,
  });
}

function getFallbackData(user) {
  return {
    profile: {
      id: user?._id || user?.id || "guest",
      name: user?.name || user?.fullName || "Valued Customer",
      email: user?.email || "customer@mahii.in",
      avatar: user?.avatar || user?.profilePicture,
      isGold: false,
    },
    wallet: {
      balance: 0,
      cashback: 0,
      currency: "INR",
    },
    membership: {
      active: false,
      plan: "Standard Member",
      expiresAt: null,
    },
    recentOrders: [],
    notifications: [],
    stats: {
      wishlistCount: 0,
      cartCount: 0,
      savedAmount: 0,
      rewardPoints: 100,
    },
    analytics: {
      totalOrdersCount: 0,
      favoriteCategory: "Mess & Food",
    },
    quickActions: [],
    recommendedShops: [],
    offers: [],
  };
}

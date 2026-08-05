import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { adminDashboardApi } from "../services/adminDashboard.api";
import { useSocket } from "@/providers/SocketProvider";

export function useAdminDashboard() {
  const queryClient = useQueryClient();
  const socket = useSocket();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: async () => {
      const [overviewRes, revenueRes, topShopsRes, recentOrdersRes, pendingActionsRes] =
        await Promise.all([
          adminDashboardApi.dashboard(),
          adminDashboardApi.getRevenue(),
          adminDashboardApi.getTopShops(),
          adminDashboardApi.getRecentOrders(),
          adminDashboardApi.getPendingActions(),
        ]);

      const overview = overviewRes?.data?.data || {};
      const revenueAnalytics = revenueRes?.data?.data || [];
      const topShops = topShopsRes?.data?.data || [];
      const recentOrders = recentOrdersRes?.data?.data || [];
      const pendingActions = pendingActionsRes?.data?.data || [];

      return {
        ...overview,
        revenueAnalytics,
        topShops,
        recentOrders,
        pendingActions,
      };
    },
    staleTime: 1000 * 60, // 1 minute
  });

  // Real-time integration
  useEffect(() => {
    if (!socket) return;

    const invalidateDashboard = () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    };

    socket.on("newOrder", invalidateDashboard);
    socket.on("orderStatusUpdated", invalidateDashboard);
    socket.on("newShop", invalidateDashboard);
    socket.on("newUser", invalidateDashboard);

    return () => {
      socket.off("newOrder", invalidateDashboard);
      socket.off("orderStatusUpdated", invalidateDashboard);
      socket.off("newShop", invalidateDashboard);
      socket.off("newUser", invalidateDashboard);
    };
  }, [socket, queryClient]);

  return {
    dashboard: data || {},
    loading: isLoading,
    error,
  };
}

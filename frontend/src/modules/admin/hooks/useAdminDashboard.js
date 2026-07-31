import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { adminDashboardApi } from "../services/adminDashboard.api";
import { useSocket } from "@/providers/SocketProvider";

export function useAdminDashboard() {
  const queryClient = useQueryClient();
  const socket = useSocket();

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: () => adminDashboardApi.dashboard().then((r) => r.data),
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
    
    // Add these if they exist in SocketEvents, else they just won't trigger
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
    dashboard: data?.data || {}, // Assuming response is { success: true, data: {...} }
    loading: isLoading,
    error,
  };
}

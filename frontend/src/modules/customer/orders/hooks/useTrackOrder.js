import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import ordersService from "../services/orders.service";
import { SOCKET_EVENTS } from "../constants/orderStatus";

export default function useTrackOrder(id) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["track-order", id],
    queryFn: async () => {
      const { data } = await ordersService.trackOrder(id);
      return data.data;
    },
    enabled: !!id,
    refetchInterval: 30000, // poll every 30s as fallback
  });

  // Wire socket events to invalidate the tracking query
  useEffect(() => {
    if (!id) return;

    // Access the global socket from window (set by SocketProvider)
    const socket = window.__mahiiSocket;
    if (!socket) return;

    const handleStatusUpdate = (payload) => {
      if (payload?.orderId !== id) return;

      // Merge new data into existing cache instantly
      queryClient.setQueryData(["track-order", id], (old) => {
        if (!old) return old;
        return {
          ...old,
          order: {
            ...old.order,
            status: payload.status,
            eta: payload.eta ?? old.order.eta,
          },
          timeline: payload.timeline ?? old.timeline,
          partner: payload.partner ?? old.partner,
        };
      });

      // Also sync the order detail cache
      queryClient.invalidateQueries({ queryKey: ["customer-order", id] });
    };

    Object.values(SOCKET_EVENTS).forEach((event) => {
      socket.on(event, handleStatusUpdate);
    });

    return () => {
      Object.values(SOCKET_EVENTS).forEach((event) => {
        socket.off(event, handleStatusUpdate);
      });
    };
  }, [id, queryClient]);

  return query;
}

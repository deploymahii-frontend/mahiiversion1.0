import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ordersService from "../services/orders.service";

export default function useCancelOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }) => ordersService.cancelOrder(id, reason),

    onSuccess: (_, { id }) => {
      toast.success("Order cancelled successfully.");

      // Refresh order list and specific order
      queryClient.invalidateQueries({ queryKey: ["customer-orders"] });
      queryClient.invalidateQueries({ queryKey: ["customer-order", id] });
      queryClient.invalidateQueries({ queryKey: ["customer-dashboard"] });
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Could not cancel order. Try again."
      );
    },
  });
}

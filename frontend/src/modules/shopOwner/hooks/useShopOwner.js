import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import shopOwnerService from "../services/shopOwner.service";
import toast from "react-hot-toast";
import { useSocket } from "../../../providers/SocketProvider";

// ── Dashboard ────────────────────────────────────────────────────────────
export function useShopDashboard() {
  const qc = useQueryClient();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    const handleUpdate = () => qc.invalidateQueries({ queryKey: ["shop-dashboard"] });
    
    socket.on("newOrder", handleUpdate);
    socket.on("orderStatusUpdated", handleUpdate);
    
    return () => {
      socket.off("newOrder", handleUpdate);
      socket.off("orderStatusUpdated", handleUpdate);
    };
  }, [socket, qc]);

  return useQuery({
    queryKey: ["shop-dashboard"],
    queryFn: async () => {
      const { data } = await shopOwnerService.getDashboard();
      return data?.data ?? data ?? {};
    },
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
}

// ── Shop Profile ──────────────────────────────────────────────────────────
export function useShopProfile() {
  return useQuery({
    queryKey: ["shop-profile"],
    queryFn: async () => {
      const { data } = await shopOwnerService.getProfile();
      return data.data;
    },
  });
}

export function useRegisterShop() {
  return useMutation({
    mutationFn: (data) => shopOwnerService.registerShop(data),
  });
}

export function useUpdateShopProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => shopOwnerService.updateProfile(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["shop-profile"] });
      qc.invalidateQueries({ queryKey: ["shop-dashboard"] });
      toast.success("Shop updated successfully");
    },
    onError: () => toast.error("Failed to update shop"),
  });
}

export function useToggleShopStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (isOpen) => shopOwnerService.toggleStatus(isOpen),
    onSuccess: (_, isOpen) => {
      qc.invalidateQueries({ queryKey: ["shop-profile"] });
      toast.success(`Shop is now ${isOpen ? "open" : "closed"}`);
    },
  });
}

// ── Orders ────────────────────────────────────────────────────────────────
export function useShopOrders(params = {}) {
  const qc = useQueryClient();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    
    const handleNewOrder = () => {
      qc.invalidateQueries({ queryKey: ["shop-orders"] });
      qc.invalidateQueries({ queryKey: ["shop-dashboard"] });
      toast.success("New order received! 🛎️");
    };

    const handleUpdate = () => qc.invalidateQueries({ queryKey: ["shop-orders"] });

    socket.on("newOrder", handleNewOrder);
    socket.on("orderStatusUpdated", handleUpdate);

    return () => {
      socket.off("newOrder", handleNewOrder);
      socket.off("orderStatusUpdated", handleUpdate);
    };
  }, [socket, qc]);

  return useQuery({
    queryKey: ["shop-orders", params],
    queryFn: async () => {
      const { data } = await shopOwnerService.getOrders(params);
      return data.data;
    },
    // Fallback polling every 60s in case socket drops
    refetchInterval: 60000, 
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, status }) => shopOwnerService.updateOrderStatus(orderId, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["shop-orders"] });
      qc.invalidateQueries({ queryKey: ["shop-dashboard"] });
      toast.success("Order status updated");
    },
    onError: (err) => toast.error(err?.response?.data?.message || "Failed to update order"),
  });
}

// ── Products ──────────────────────────────────────────────────────────────
export function useShopProducts() {
  return useQuery({
    queryKey: ["shop-products"],
    queryFn: async () => {
      const { data } = await shopOwnerService.getProducts();
      return data.data;
    },
  });
}

export function useShopOffers(shopId) {
  return useQuery({
    queryKey: ["shop-offers", shopId],
    enabled: Boolean(shopId),
    queryFn: async () => {
      const { data } = await shopOwnerService.getOffers(shopId);
      return data.data;
    },
    staleTime: 1000 * 60 * 2,
  });
}

export function useCreateOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => shopOwnerService.createOffer(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["shop-offers"] });
      qc.invalidateQueries({ queryKey: ["shop-dashboard"] });
      toast.success("Offer created successfully");
    },
    onError: () => toast.error("Failed to create offer"),
  });
}

export function useUpdateOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ offerId, data }) => shopOwnerService.updateOffer(offerId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["shop-offers"] });
      toast.success("Offer updated successfully");
    },
    onError: () => toast.error("Failed to update offer"),
  });
}

export function useDeleteOffer() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (offerId) => shopOwnerService.deleteOffer(offerId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["shop-offers"] });
      toast.success("Offer deleted successfully");
    },
    onError: () => toast.error("Failed to delete offer"),
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => shopOwnerService.createProduct(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["shop-products"] });
      qc.invalidateQueries({ queryKey: ["shop-dashboard"] });
      toast.success("Product created");
    },
    onError: () => toast.error("Failed to create product"),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, data }) => shopOwnerService.updateProduct(productId, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["shop-products"] });
      toast.success("Product updated");
    },
    onError: () => toast.error("Failed to update product"),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (productId) => shopOwnerService.deleteProduct(productId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["shop-products"] });
      toast.success("Product deleted");
    },
    onError: () => toast.error("Failed to delete product"),
  });
}

export function useUpdateStock() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, quantity }) => shopOwnerService.updateStock(productId, quantity),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["shop-products"] });
      toast.success("Stock updated");
    },
    onError: () => toast.error("Failed to update stock"),
  });
}

export function useToggleAvailability() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, available }) => shopOwnerService.toggleAvailability(productId, available),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["shop-products"] }),
  });
}

// ── Analytics ─────────────────────────────────────────────────────────────
export function useShopAnalytics(days = 30) {
  return useQuery({
    queryKey: ["shop-analytics", days],
    queryFn: async () => {
      const { data } = await shopOwnerService.getAnalytics(days);
      return data.data;
    },
    staleTime: 1000 * 60 * 10,
  });
}

// ── Reviews ───────────────────────────────────────────────────────────────
export function useShopReviews() {
  return useQuery({
    queryKey: ["shop-reviews"],
    queryFn: async () => {
      const { data } = await shopOwnerService.getReviews();
      return data;
    },
  });
}

export function useReplyToReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId, reply }) => shopOwnerService.replyToReview(reviewId, reply),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["shop-reviews"] });
      toast.success("Reply sent");
    },
    onError: () => toast.error("Failed to send reply"),
  });
}

import api from "@/services/api";

export const getOrders = (params = {}) =>
    api.get("/orders/shop", { params });

export const getOrder = (id) =>
    api.get(`/orders/${id}`);

export const updateStatus = (id, status) =>
    api.patch(`/orders/${id}/status`, {
        status,
    });

export const deleteOrder = (id) =>
    api.delete(`/orders/${id}`);

import api from "@/services/api";

export const getCustomers = (params = {}) =>
    api.get("/customers/shop", { params });

export const getCustomer = (id) =>
    api.get(`/customers/${id}`);

export const blockCustomer = (id) =>
    api.patch(`/customers/${id}/block`);

export const unblockCustomer = (id) =>
    api.patch(`/customers/${id}/unblock`);

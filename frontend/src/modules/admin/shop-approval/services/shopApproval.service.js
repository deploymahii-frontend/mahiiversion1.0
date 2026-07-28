import api from "@/services/api";

export const getPendingShops = () =>
    api.get("/admin/shops/pending");

export const getShopDetails = (id) =>
    api.get(`/admin/shops/${id}`);

export const approveShop = (id, remarks) =>
    api.put(`/admin/shops/${id}/approve`, {
        remarks,
    });

export const rejectShop = (id, reason) =>
    api.put(`/admin/shops/${id}/reject`, {
        reason,
    });

export const suspendShop = (id) =>
    api.put(`/admin/shops/${id}/suspend`);

export const activateShop = (id) =>
    api.put(`/admin/shops/${id}/activate`);

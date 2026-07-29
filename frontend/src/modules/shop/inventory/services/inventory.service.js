import api from "@/services/api";

export const getInventory = (params = {}) =>
    api.get("/inventory", { params });

export const getLowStock = () =>
    api.get("/inventory/low-stock");

export const getOutOfStock = () =>
    api.get("/inventory/out-of-stock");

export const getStockHistory = (id) =>
    api.get(`/inventory/${id}/history`);

export const updateStock = (id, data) =>
    api.patch(`/inventory/${id}/stock`, data);

export const updateItem = (id, data) =>
    api.put(`/inventory/${id}`, data);

export const deleteItem = (id) =>
    api.delete(`/inventory/${id}`);

export const exportInventoryPdf = () =>
    api.get("/inventory/export/pdf", {
        responseType: "blob",
    });

export const exportInventoryExcel = () =>
    api.get("/inventory/export/excel", {
        responseType: "blob",
    });

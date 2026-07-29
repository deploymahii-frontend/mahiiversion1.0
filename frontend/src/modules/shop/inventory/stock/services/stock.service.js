import api from "@/services/api";

export const getStockMovements = (params = {}) =>
    api.get("/inventory/movements", { params });

export const getRestockSuggestions = () =>
    api.get("/inventory/restock");

export const createRestock = (data) =>
    api.post("/inventory/restock", data);

export const adjustStock = (data) =>
    api.post("/inventory/adjust", data);

export const getSuppliers = () =>
    api.get("/inventory/suppliers");

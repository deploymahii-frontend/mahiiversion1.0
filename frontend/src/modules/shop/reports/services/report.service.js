import api from "@/services/api";

export const getDashboard = (params = {}) =>
    api.get("/reports/dashboard", { params });

export const getSalesReport = (params = {}) =>
    api.get("/reports/sales", { params });

export const getProductReport = (params = {}) =>
    api.get("/reports/products", { params });

export const getProfitReport = (params = {}) =>
    api.get("/reports/profit", { params });

export const getTaxReport = (params = {}) =>
    api.get("/reports/tax", { params });

export const exportPdf = (params = {}) =>
    api.get("/reports/export/pdf", {
        params,
        responseType: "blob",
    });

export const exportExcel = (params = {}) =>
    api.get("/reports/export/excel", {
        params,
        responseType: "blob",
    });

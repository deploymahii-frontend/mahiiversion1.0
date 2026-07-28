import api from "@/services/api";

export const getProducts = (params = {}) =>
    api.get("/products/shop", { params });

export const getProduct = (id) =>
    api.get(`/products/${id}`);

export const createProduct = (formData) =>
    api.post("/products", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const updateProduct = (id, formData) =>
    api.put(`/products/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

export const deleteProduct = (id) =>
    api.delete(`/products/${id}`);

export const changeStock = (id, stock) =>
    api.patch(`/products/${id}/stock`, {
        stock,
    });

export const toggleAvailability = (id) =>
    api.patch(`/products/${id}/availability`);

export const uploadImages = (formData) =>
    api.post("/uploads/images", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

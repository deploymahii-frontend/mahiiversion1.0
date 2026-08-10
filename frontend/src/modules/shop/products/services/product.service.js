import api from "@/services/api";

export const getProducts = (params = {}) =>
    api.get("/products/shop", { params });

export const getProduct = (id) =>
    api.get(`/products/${id}`);

export const createProduct = (data) =>
    api.post("/products", data);

export const updateProduct = (id, data) =>
    api.put(`/products/${id}`, data);

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

// src/services/productOwner.service.js

import api from "./api";

const productOwnerService = {
    getProducts() {
        return api.get("/products/owner");
    },
    create(data) {
        return api.post("/products", data);
    },
    update(id, data) {
        return api.put(`/products/${id}`, data);
    },
    remove(id) {
        return api.delete(`/products/${id}`);
    },
};

export default productOwnerService;

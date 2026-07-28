// src/services/adminCategory.service.js

import api from "./api";

const adminCategoryService = {
    getCategories() {
        return api.get("/categories");
    },
    create(data) {
        return api.post("/categories", data);
    },
    update(id, data) {
        return api.put(`/categories/${id}`, data);
    },
    remove(id) {
        return api.delete(`/categories/${id}`);
    },
};

export default adminCategoryService;

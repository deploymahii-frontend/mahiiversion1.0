// src/services/shop.service.js

import api from "./api";

const shopService = {
    getAll(params = {}) {
        return api.get("/shops", {
            params,
        });
    },
    getBySlug(slug) {
        return api.get(`/shops/${slug}`);
    },
    search(query) {
        return api.get("/shops/search", {
            params: {
                q: query,
            },
        });
    },
    getFeatured() {
        return api.get("/shops", {
            params: {
                featured: true,
            },
        });
    },
};

export default shopService;

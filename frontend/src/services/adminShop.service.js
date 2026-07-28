// src/services/adminShop.service.js

import api from "./api";

const adminShopService = {
    pending() {
        return api.get("/admin/shops/pending");
    },
    approve(id) {
        return api.patch(`/admin/shops/${id}/approve`);
    },
    reject(id, reason) {
        return api.patch(`/admin/shops/${id}/reject`, {
            reason,
        });
    },
};

export default adminShopService;

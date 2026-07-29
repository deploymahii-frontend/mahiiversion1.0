// src/services/adminDispute.service.js

import api from "./api";

const adminDisputeService = {
    getAll() {
        return api.get("/admin/disputes");
    },
    resolve(id) {
        return api.patch(`/admin/disputes/${id}/resolve`);
    },
    refund(id) {
        return api.post(`/admin/disputes/${id}/refund`);
    },
};

export default adminDisputeService;

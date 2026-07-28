// src/services/adminSettlement.service.js

import api from "./api";

const adminSettlementService = {
    getPending() {
        return api.get("/admin/settlements");
    },
    approve(id) {
        return api.patch(`/admin/settlements/${id}/approve`);
    },
    history() {
        return api.get("/admin/settlements/history");
    },
};

export default adminSettlementService;

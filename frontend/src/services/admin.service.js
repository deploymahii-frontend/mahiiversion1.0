// src/services/admin.service.js

import api from "./api";

const adminService = {
    dashboard() {
        return api.get("/admin/dashboard");
    },
    statistics() {
        return api.get("/admin/statistics");
    },
    systemHealth() {
        return api.get("/admin/system-health");
    },
};

export default adminService;

// src/services/adminAnalytics.service.js

import api from "./api";

const adminAnalyticsService = {
    overview() {
        return api.get("/admin/analytics");
    },
    revenue() {
        return api.get("/admin/analytics/revenue");
    },
    users() {
        return api.get("/admin/analytics/users");
    },
    shops() {
        return api.get("/admin/analytics/shops");
    },
};

export default adminAnalyticsService;

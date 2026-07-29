// src/services/shopAnalytics.service.js

import api from "./api";

const shopAnalyticsService = {
    overview() {
        return api.get("/analytics/shop");
    },
    sales() {
        return api.get("/analytics/shop/sales");
    },
    products() {
        return api.get("/analytics/shop/products");
    },
};

export default shopAnalyticsService;

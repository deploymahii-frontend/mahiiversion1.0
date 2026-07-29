// src/services/shopOrder.service.js

import api from "./api";

const shopOrderService = {
    getOrders() {
        return api.get("/orders/shop");
    },
    updateStatus(id, status) {
        return api.patch(
            `/orders/${id}/status`,
            { status }
        );
    },
};

export default shopOrderService;

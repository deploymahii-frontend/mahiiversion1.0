// src/services/order.service.js

import api from "./api";

const orderService = {
    place(data) {
        return api.post("/orders", data);
    },
    getOrders() {
        return api.get("/orders");
    },
    getOrder(id) {
        return api.get(`/orders/${id}`);
    },
    cancel(id) {
        return api.patch(`/orders/${id}/cancel`);
    },
};

export default orderService;

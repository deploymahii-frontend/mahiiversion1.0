// src/services/payment.service.js

import api from "./api";

const paymentService = {
    createOrder(payload) {
        return api.post("/payments/create-order", payload);
    },
    verifyPayment(payload) {
        return api.post("/payments/verify", payload);
    },
    getTransaction(transactionId) {
        return api.get(`/payments/${transactionId}`);
    },
    refund(transactionId) {
        return api.post(`/payments/${transactionId}/refund`);
    },
    getHistory() {
        return api.get("/payments/history");
    },
};

export default paymentService;

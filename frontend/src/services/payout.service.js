// src/services/payout.service.js

import api from "./api";

const payoutService = {
    getHistory() {
        return api.get("/payouts");
    },
    request(amount) {
        return api.post(
            "/payouts/request",
            { amount }
        );
    },
};

export default payoutService;

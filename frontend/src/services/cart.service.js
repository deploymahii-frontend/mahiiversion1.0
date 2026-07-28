// src/services/cart.service.js

import api from "./api";

const cartService = {
    getCart() {
        return api.get("/cart");
    },
    add(productId, quantity = 1) {
        return api.post("/cart", {
            productId,
            quantity,
        });
    },
    update(productId, quantity) {
        return api.put("/cart", {
            productId,
            quantity,
        });
    },
    remove(productId) {
        return api.delete(`/cart/${productId}`);
    },
};

export default cartService;

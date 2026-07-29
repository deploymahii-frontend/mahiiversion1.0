// src/services/wishlist.service.js

import api from "./api";

const wishlistService = {
    getWishlist() {
        return api.get("/wishlist");
    },
    add(productId) {
        return api.post("/wishlist", {
            productId,
        });
    },
    remove(productId) {
        return api.delete(`/wishlist/${productId}`);
    },
};

export default wishlistService;

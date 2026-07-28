// src/services/product.service.js

import api from "./api";

const productService = {
    getProducts(shopId) {
        return api.get(`/products`, {
            params: {
                shopId,
            },
        });
    },
    getProduct(id) {
        return api.get(`/products/${id}`);
    },
};

export default productService;

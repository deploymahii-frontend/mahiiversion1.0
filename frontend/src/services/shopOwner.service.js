// src/services/shopOwner.service.js

import api from "./api";

const shopOwnerService = {
    getDashboard() {
        return api.get("/shops/owner/dashboard");
    },
    getMyShop() {
        return api.get("/shops/owner");
    },
    updateShop(data) {
        return api.put("/shops/owner", data);
    },
    uploadLogo(formData) {
        return api.post(
            "/shops/owner/logo",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    },
};

export default shopOwnerService;

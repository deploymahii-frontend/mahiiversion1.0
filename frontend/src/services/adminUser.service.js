// src/services/adminUser.service.js

import api from "./api";

const adminUserService = {
    getUsers(params = {}) {
        return api.get("/admin/users", { params });
    },
    getUser(id) {
        return api.get(`/admin/users/${id}`);
    },
    updateStatus(id, active) {
        return api.patch(`/admin/users/${id}/status`, {
            active,
        });
    },
    deleteUser(id) {
        return api.delete(`/admin/users/${id}`);
    },
};

export default adminUserService;

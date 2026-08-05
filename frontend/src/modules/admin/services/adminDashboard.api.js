import api from "@/services/api";

export const adminDashboardApi = {
    dashboard() {
        return api.get("/admin/dashboard/overview");
    },

    getRevenue() {
        return api.get("/admin/dashboard/revenue");
    },

    getTopShops() {
        return api.get("/admin/dashboard/top-shops");
    },

    getRecentOrders() {
        return api.get("/admin/dashboard/recent-orders");
    },

    getPendingActions() {
        return api.get("/admin/dashboard/pending-actions");
    },

    getShops(params) {
        const normalizedParams = { ...params };
        if (normalizedParams.status === "ACTIVE") {
            normalizedParams.status = "APPROVED";
        }
        return api.get("/admin/shops", { params: normalizedParams });
    },

    approveShop(id) {
        return api.patch(`/admin/shops/${id}/approve`);
    },

    rejectShop(id) {
        return api.patch(`/admin/shops/${id}/reject`);
    }
};

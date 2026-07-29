import api from "@/services/api";

export const adminDashboardApi = {

    dashboard(){

        return api.get("/admin/dashboard");

    },

    approveShop(id){

        return api.patch(`/admin/shops/${id}/approve`);

    },

    rejectShop(id){

        return api.patch(`/admin/shops/${id}/reject`);

    }

};

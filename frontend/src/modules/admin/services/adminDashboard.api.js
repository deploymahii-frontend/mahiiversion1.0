import api from "@/services/api";

export const adminDashboardApi = {

    dashboard(){
        return api.get("/admin/dashboard");
    },
    
    getShops(params){
        return api.get("/admin/shops", { params });
    },

    approveShop(id){

        return api.patch(`/admin/shops/${id}/approve`);

    },

    rejectShop(id){

        return api.patch(`/admin/shops/${id}/reject`);

    }

};

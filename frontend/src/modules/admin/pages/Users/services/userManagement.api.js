import api from "@/services/api";

export const userManagementApi={

    list(){

        return api.get("/admin/users");

    },

    suspend(id){

        return api.patch(`/admin/users/${id}/suspend`);

    },

    activate(id){

        return api.patch(`/admin/users/${id}/activate`);

    },

    verify(id){

        return api.patch(`/admin/users/${id}/verify`);

    }

}

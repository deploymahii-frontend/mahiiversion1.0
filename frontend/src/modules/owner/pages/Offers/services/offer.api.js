import api from "@/services/api";

export const offerApi = {
  list(){
    return api.get("/owner/offers");
  },
  create(payload){
    return api.post("/owner/offers", payload);
  },
  update(id, payload){
    return api.put(`/owner/offers/${id}`, payload);
  },
  remove(id){
    return api.delete(`/owner/offers/${id}`);
  },
  updateStatus(id, status){
    return api.patch(`/owner/offers/${id}/status`, { active: status });
  }
};

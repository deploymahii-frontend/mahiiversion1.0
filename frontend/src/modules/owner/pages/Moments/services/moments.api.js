import api from "@/services/api";

export const momentsApi = {
  list(){
    return api.get("/owner/moments");
  },
  create(payload){
    return api.post("/owner/moments", payload);
  },
  remove(id){
    return api.delete(`/owner/moments/${id}`);
  },
  update(id, payload){
    return api.patch(`/owner/moments/${id}`, payload);
  }
};

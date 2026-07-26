import api from "@/services/api";

export const categoriesApi = {
  list(){
    return api.get('/admin/categories');
  },
  create(payload){
    return api.post('/admin/categories', payload);
  },
  update(id,payload){
    return api.put(`/admin/categories/${id}`, payload);
  },
  remove(id){
    return api.delete(`/admin/categories/${id}`);
  },
  updateStatus(id, status){
    return api.patch(`/admin/categories/${id}/status`, { active: status });
  }
};

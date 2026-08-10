import api from "./api";

const momentService = {
  getFeed: async (params = {}) => {
    const { data } = await api.get("/moments/feed", { params });
    return data;
  },

  getStories: async () => {
    const { data } = await api.get("/moments/stories");
    return data;
  },

  getShopMoments: async (shopId, params = {}) => {
    const { data } = await api.get(`/moments/shop/${shopId}`, { params });
    return data;
  },

  getProductMoments: async (productId, params = {}) => {
    const { data } = await api.get(`/moments/product/${productId}`, { params });
    return data;
  },

  getMomentById: async (id) => {
    const { data } = await api.get(`/moments/${id}`);
    return data;
  },

  createMoment: async (momentData) => {
    const { data } = await api.post("/moments", momentData);
    return data;
  },

  createStory: async (storyData) => {
    const { data } = await api.post("/moments/stories", storyData);
    return data;
  },

  toggleLike: async (id) => {
    const { data } = await api.post(`/moments/${id}/like`);
    return data;
  },

  toggleSave: async (id) => {
    const { data } = await api.post(`/moments/${id}/save`);
    return data;
  },

  getSavedMoments: async (params = {}) => {
    const { data } = await api.get("/moments/saved", { params });
    return data;
  },

  getComments: async (id) => {
    const { data } = await api.get(`/moments/${id}/comments`);
    return data;
  },

  postComment: async (id, commentData) => {
    const { data } = await api.post(`/moments/${id}/comments`, commentData);
    return data;
  },

  deleteComment: async (commentId) => {
    const { data } = await api.delete(`/moments/comments/${commentId}`);
    return data;
  },

  reportMoment: async (id, reportData) => {
    const { data } = await api.post(`/moments/${id}/report`, reportData);
    return data;
  },

  trackView: async (id) => {
    return api.post(`/moments/${id}/view`).catch(() => {});
  },

  trackShopClick: async (id) => {
    return api.post(`/moments/${id}/shop-click`).catch(() => {});
  },

  trackProductClick: async (id) => {
    return api.post(`/moments/${id}/product-click`).catch(() => {});
  },

  trackCartAddition: async (id) => {
    return api.post(`/moments/${id}/cart-addition`).catch(() => {});
  },

  // Owner Analytics
  getOwnerAnalytics: async () => {
    const { data } = await api.get("/moments/owner/analytics");
    return data;
  },

  // Admin Moderation
  adminGetMoments: async (params = {}) => {
    const { data } = await api.get("/moments/admin/all", { params });
    return data;
  },

  adminUpdateStatus: async (id, status) => {
    const { data } = await api.patch(`/moments/admin/${id}/status`, { status });
    return data;
  },

  adminToggleFeatured: async (id) => {
    const { data } = await api.post(`/moments/admin/${id}/feature`);
    return data;
  },
};

export default momentService;

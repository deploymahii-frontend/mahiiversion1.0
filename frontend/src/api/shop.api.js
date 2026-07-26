import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

export const shopAPI = {
  async getNearby(params = {}) {
    const { data } = await API.get("/shops/nearby", {
      params,
    });
    return data;
  },

  async search(query) {
    const { data } = await API.get("/shops/search", {
      params: { q: query },
    });
    return data;
  },

  async getTrending() {
    const { data } = await API.get("/shops/trending");
    return data;
  },

  async getRecommended() {
    const { data } = await API.get("/shops/recommended");
    return data;
  },

  async getShop(slug) {
    const { data } = await API.get(`/shops/${slug}`);
    return data;
  },
};

export default shopAPI;

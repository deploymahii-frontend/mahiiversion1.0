import api from "@/services/api";

const reviewService = {
  async getReviews() {
    const { data } = await api.get("/customer/reviews");
    return data.data;
  },

  async createReview(payload) {
    const { data } = await api.post("/customer/reviews", payload);
    return data.data;
  },

  async updateReview(id, payload) {
    const { data } = await api.put(`/customer/reviews/${id}`, payload);
    return data.data;
  },
};

export default reviewService;

import api from "@/services/api";

const wishlistService = {
  async getWishlist() {
    const { data } = await api.get("/customer/wishlist");
    return data.data;
  },

  async toggleWishlist(id, entityType = "SHOP") {
    const { data } = await api.post(`/customer/wishlist/${id}`, { entityType });
    return data;
  },
};

export default wishlistService;

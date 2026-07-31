import api from "@/services/api";

const notificationService = {
  async getNotifications() {
    const { data } = await api.get("/customer/notifications");
    return data.data;
  },

  async markAsRead(id) {
    await api.patch(`/customer/notifications/${id}/read`);
  },

  async markAllAsRead() {
    await api.patch("/customer/notifications/read-all");
  },

  async deleteNotification(id) {
    await api.delete(`/customer/notifications/${id}`);
  },
};

export default notificationService;

import client from "./client.js";

export const notificationApi = {
  getNotifications: (params) => client.get("/notifications", { params }),
  markAsRead: (id) => client.put(`/notifications/${id}/read`),
  markAllAsRead: () => client.put("/notifications/read-all"),
  getUnreadCount: () => client.get("/notifications/unread-count"),
};

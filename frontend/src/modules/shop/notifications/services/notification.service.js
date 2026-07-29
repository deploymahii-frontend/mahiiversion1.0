import api from "@/services/api";

export const getNotifications = (params = {}) =>
    api.get("/notifications", { params });

export const markAsRead = (id) =>
    api.patch(`/notifications/${id}/read`);

export const markAllAsRead = () =>
    api.patch("/notifications/read-all");

export const deleteNotification = (id) =>
    api.delete(`/notifications/${id}`);

export const clearNotifications = () =>
    api.delete("/notifications");

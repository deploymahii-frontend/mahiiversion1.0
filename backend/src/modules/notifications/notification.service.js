import * as repository from "./notification.repository.js";

export const createNotification = (data) => repository.create(data);

export const getNotifications = (userId) =>
  repository.findUserNotifications(userId);

export const markNotificationRead = (id) => repository.markRead(id);

export const deleteNotification = (id) => repository.remove(id);

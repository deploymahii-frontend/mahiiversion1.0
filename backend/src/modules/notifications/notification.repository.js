import Notification from "./notification.model.js";

export const create = (data) => Notification.create(data);

export const findUserNotifications = (userId) =>
  Notification.find({ user: userId }).sort({ createdAt: -1 });

export const markRead = (id) =>
  Notification.findByIdAndUpdate(
    id,
    { isRead: true, readAt: new Date() },
    { new: true }
  );

export const remove = (id) => Notification.findByIdAndDelete(id);

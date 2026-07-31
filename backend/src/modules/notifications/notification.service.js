import Notification from "./notification.model.js";

export const createNotification = async ({
  recipient,
  type,
  title,
  message,
  data = {},
}) => {
  return Notification.create({
    recipient,
    type,
    title,
    message,
    data,
  });
};

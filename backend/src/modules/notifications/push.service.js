import { sendPush } from "./fcm.provider.js";

export async function sendPushNotification({ token, title, body, data }) {
  return sendPush({ token, title, body, data });
}

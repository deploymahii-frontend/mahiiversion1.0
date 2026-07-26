import { sendSMS } from "./sms.provider.js";

export async function sendSMSNotification({ phone, message }) {
  return sendSMS({ phone, message });
}

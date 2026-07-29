import { sendSMSNotification } from "./sms.service.js";

export async function processSMSJob(job) {
  await sendSMSNotification({
    phone: job.phone,
    message: job.message,
  });
}

import { sendPushNotification } from "./push.service.js";

export async function processPushJob(job) {
  await sendPushNotification({
    token: job.token,
    title: job.title,
    body: job.body,
    data: job.data,
  });
}

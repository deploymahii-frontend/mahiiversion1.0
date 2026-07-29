import { getApps, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

// Initialize Firebase Admin if not already initialized
if (!getApps().length) {
  initializeApp(); // Uses default credentials or env config if not passed
}

export async function sendPush({ token, title, body, data = {} }) {
  return getMessaging().send({
    token,
    notification: {
      title,
      body,
    },
    data,
  });
}

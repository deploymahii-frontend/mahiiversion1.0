import admin from "firebase-admin";

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

export async function sendPush({ token, title, body, data = {} }) {
  return admin.messaging().send({
    token,
    notification: {
      title,
      body,
    },
    data,
  });
}

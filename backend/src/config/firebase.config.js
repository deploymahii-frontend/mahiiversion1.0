import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

let isFirebaseInitialized = false;

try {
  // Option 1: Parse from a JSON string in Environment Variables (Recommended for Render)
  // Format: FIREBASE_SERVICE_ACCOUNT='{"type": "service_account", "project_id": "...", ...}'
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    isFirebaseInitialized = true;
    console.log("✅ Firebase Admin Initialized (via Env Var)");
  } 
  // Option 2: Fallback to local file if path is provided
  else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    admin.initializeApp({
      credential: admin.credential.cert(process.env.FIREBASE_SERVICE_ACCOUNT_PATH),
    });
    isFirebaseInitialized = true;
    console.log("✅ Firebase Admin Initialized (via File Path)");
  } else {
    console.warn("⚠️ Firebase Admin skipped: No FIREBASE_SERVICE_ACCOUNT provided in environment variables.");
  }
} catch (error) {
  console.error("❌ Failed to initialize Firebase Admin:", error.message);
}

export const firebaseAdmin = admin;
export { isFirebaseInitialized };

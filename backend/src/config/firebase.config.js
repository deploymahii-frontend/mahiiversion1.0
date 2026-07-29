import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

let isFirebaseInitialized = false;
let firebaseApp = null;

const databaseURL = process.env.FIREBASE_DATABASE_URL || "https://mahiiversion1-default-rtdb.asia-southeast1.firebasedatabase.app";

try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccountPath = path.resolve(process.cwd(), "..", process.env.FIREBASE_SERVICE_ACCOUNT);
    const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    firebaseApp = initializeApp({
      credential: cert(serviceAccount),
      databaseURL: databaseURL
    });
    isFirebaseInitialized = true;
    console.log("✅ Firebase Admin Initialized (via Env File)");
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    firebaseApp = initializeApp({
      credential: cert(process.env.FIREBASE_SERVICE_ACCOUNT_PATH),
      databaseURL: databaseURL
    });
    isFirebaseInitialized = true;
    console.log("✅ Firebase Admin Initialized (via File Path)");
  } else {
    console.warn("⚠️ Firebase Admin skipped: No FIREBASE_SERVICE_ACCOUNT provided in environment variables.");
  }
} catch (error) {
  console.error("❌ Failed to initialize Firebase Admin:", error.message);
}

// Export a backward-compatible object for other files expecting `admin.auth()`
export const firebaseAdmin = {
  auth: () => getAuth(firebaseApp)
};
export { isFirebaseInitialized };

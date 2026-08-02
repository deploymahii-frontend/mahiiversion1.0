import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "../../../");
dotenv.config({ path: path.resolve(projectRoot, ".env") });

let isFirebaseInitialized = false;
let firebaseApp = null;

const databaseURL = process.env.FIREBASE_DATABASE_URL || "https://mahiiversion1-default-rtdb.asia-southeast1.firebasedatabase.app";

function resolveServiceAccountPath(filePath) {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(projectRoot, filePath);
}

function parseServiceAccountValue(value) {
  if (!value) return null;

  // Try raw JSON first
  try {
    return JSON.parse(value);
  } catch {
    // If the value is base64-encoded JSON, decode then parse
    try {
      const decoded = Buffer.from(value, "base64").toString("utf8");
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
}

try {
  const serviceAccountValue = process.env.FIREBASE_SERVICE_ACCOUNT;
  const serviceAccountPathValue = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

  if (serviceAccountValue) {
    const serviceAccount = parseServiceAccountValue(serviceAccountValue);
    if (serviceAccount) {
      firebaseApp = initializeApp({
        credential: cert(serviceAccount),
        databaseURL: databaseURL
      });
      isFirebaseInitialized = true;
      console.log("✅ Firebase Admin Initialized (via Env JSON)");
    } else {
      const serviceAccountPath = resolveServiceAccountPath(serviceAccountValue);
      const serviceAccountFile = fs.readFileSync(serviceAccountPath, "utf8");
      firebaseApp = initializeApp({
        credential: cert(JSON.parse(serviceAccountFile)),
        databaseURL: databaseURL
      });
      isFirebaseInitialized = true;
      console.log("✅ Firebase Admin Initialized (via Env Path)", serviceAccountPath);
    }
  } else if (serviceAccountPathValue) {
    const serviceAccountPath = resolveServiceAccountPath(serviceAccountPathValue);
    firebaseApp = initializeApp({
      credential: cert(serviceAccountPath),
      databaseURL: databaseURL
    });
    isFirebaseInitialized = true;
    console.log("✅ Firebase Admin Initialized (via File Path)", serviceAccountPath);
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

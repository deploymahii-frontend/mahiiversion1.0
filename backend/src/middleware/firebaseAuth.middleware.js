import { firebaseAdmin, isFirebaseInitialized } from "../config/firebase.config.js";

export const verifyFirebaseAuth = async (req, res, next) => {
  if (!isFirebaseInitialized) {
    return res.status(500).json({
      success: false,
      message: "Firebase Admin is not configured on the server.",
    });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access Denied: No Firebase Token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    // Attach the verified Firebase UID to the request
    req.firebaseUser = decodedToken;
    next();
  } catch (error) {
    console.error("Firebase Token Verification Failed:", error.message);
    return res.status(401).json({
      success: false,
      message: "Access Denied: Invalid or Expired Firebase Token.",
      error: error.message,
    });
  }
};

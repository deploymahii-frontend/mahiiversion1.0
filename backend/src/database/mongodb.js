import mongoose from "mongoose";
import config from "../config/server.config.js";

export async function connectDatabase(retries = 3) {
  if (!config.database.uri) {
    console.warn("⚠️ MONGODB_URI is not set. Skipping database connection.");
    return false;
  }

  if (mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    await mongoose.connect(config.database.uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB Connected");
    return true;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);

    if (retries > 0) {
      console.warn(`Retrying MongoDB connection (${retries} attempts remaining)...`);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return connectDatabase(retries - 1);
    }

    console.warn("⚠️ Continuing without MongoDB connection. Set a reachable MONGODB_URI to enable database features.");
    return false;
  }
}

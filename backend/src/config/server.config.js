import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

const config = {
  app: {
    name: "Mahii API",
    version: "1.0.0",
    env: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT) || 10000,
    clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  },

  database: {
    uri: process.env.MONGODB_URI || "",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
};

export default config;


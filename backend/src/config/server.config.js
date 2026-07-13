import dotenv from "dotenv";

dotenv.config();

const config = {
  app: {
    name: "Mahii API",
    version: "1.0.0",
    env: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT) || 5000,
    clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  },

  database: {
    uri: process.env.MONGODB_URI || "",
  },

  jwt: {
    secret: process.env.JWT_SECRET || "",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
};

export default config;

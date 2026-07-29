import { v2 as cloudinary } from "cloudinary";
import config from "../../config/server.config.js";

const { cloudName, apiKey, apiSecret } = config.cloudinary || {};

if (!cloudName || !apiKey || !apiSecret) {
  console.warn(
    "Cloudinary configuration missing. Upload features will be unavailable until CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are set."
  );
} else {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

export default cloudinary;

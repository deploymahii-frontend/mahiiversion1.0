import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";
import config from "../../config/server.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../../../public/uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const hasCloudinary = !!(config.cloudinary?.cloudName && config.cloudinary?.apiKey && config.cloudinary?.apiSecret);

const cloudinaryStorage = hasCloudinary
  ? new CloudinaryStorage({
      cloudinary: cloudinary,
      params: async (req, file) => {
        let resource_type = "auto";
        if (file.mimetype.startsWith("video/")) {
          resource_type = "video";
        }
        return {
          folder: "mahii_uploads",
          resource_type: resource_type,
          allowed_formats: ["jpg", "png", "jpeg", "webp", "mp4", "mov"],
        };
      },
    })
  : null;

const activeStorage = hasCloudinary ? cloudinaryStorage : localStorage;

export const imageUpload = multer({
  storage: activeStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export const videoUpload = multer({
  storage: activeStorage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

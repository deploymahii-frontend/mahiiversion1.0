import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mahii/images",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "svg"],
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  },
});

const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mahii/videos",
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "mkv", "webm"],
  },
});

export const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export const videoUpload = multer({
  storage: videoStorage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

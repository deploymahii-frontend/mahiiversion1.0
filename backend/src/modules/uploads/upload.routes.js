import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import * as controller from "./upload.controller.js";
import { imageUpload, videoUpload } from "./multer.js";

const router = Router();

const handleUpload = (uploadMiddleware) => (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || "File upload failed",
      });
    }
    next();
  });
};

router.post("/image", authenticate, handleUpload(imageUpload.single("file")), controller.uploadImage);
router.post("/images", authenticate, handleUpload(imageUpload.array("files", 10)), controller.uploadImages);
router.post("/video", authenticate, handleUpload(videoUpload.single("file")), controller.uploadVideo);

router.post(
  "/user/profile",
  authenticate,
  imageUpload.single("file"),
  controller.updateUserProfileImage
);

router.post(
  "/shops/:shopId/logo",
  authenticate,
  imageUpload.single("file"),
  controller.updateShopLogo
);

router.post(
  "/shops/:shopId/cover",
  authenticate,
  imageUpload.single("file"),
  controller.updateShopCover
);

router.post(
  "/products/:productId/images",
  authenticate,
  imageUpload.array("files", 10),
  controller.updateProductImages
);

router.post(
  "/moments/:momentId/thumbnail",
  authenticate,
  imageUpload.single("file"),
  controller.updateMomentThumbnail
);

router.post(
  "/moments/:momentId/video",
  authenticate,
  videoUpload.single("file"),
  controller.updateMomentVideo
);

router.post(
  "/promotions/:promotionId/video",
  authenticate,
  videoUpload.single("file"),
  controller.updatePromotionVideo
);

export default router;

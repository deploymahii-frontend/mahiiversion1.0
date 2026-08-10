import { Router } from "express";
import jwt from "jsonwebtoken";
import config from "../../config/server.config.js";
import User from "../users/user.model.js";
import * as momentController from "./moment.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

// Optional auth helper to attach req.user if bearer token present
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const payload = jwt.verify(token, config.jwt.secret);
      const user = await User.findById(payload.id).populate("role");
      if (user) req.user = user;
    }
  } catch (err) {
    // Ignore invalid tokens for optional endpoints
  }
  next();
};

const authorizeAdmin = (req, res, next) => {
  const roleName = String(req.user?.role?.name || req.user?.role || "").toUpperCase();
  if (roleName !== "ADMIN") {
    return res.status(403).json({ success: false, message: "Forbidden: Admin access required" });
  }
  next();
};

// Public Feeds & Reads
router.get("/feed", optionalAuth, momentController.getFeed);
router.get("/stories", momentController.getActiveStories);
router.get("/shop/:shopId", momentController.getShopMoments);
router.get("/product/:productId", momentController.getProductMoments);
router.get("/saved", authenticate, momentController.getSavedMoments);
router.get("/owner/analytics", authenticate, momentController.getOwnerAnalytics);

// Admin Moderation
router.get("/admin/all", authenticate, authorizeAdmin, momentController.adminGetMoments);
router.patch("/admin/:id/status", authenticate, authorizeAdmin, momentController.adminUpdateStatus);
router.post("/admin/:id/feature", authenticate, authorizeAdmin, momentController.adminToggleFeatured);

// Moment Detail
router.get("/:id", optionalAuth, momentController.getMomentById);

// Creation
router.post("/", authenticate, momentController.createMoment);
router.post("/stories", authenticate, momentController.createStory);

// Social Interactions
router.post("/:id/like", optionalAuth, momentController.likeMoment);
router.post("/:id/save", authenticate, momentController.saveMoment);
router.get("/:id/comments", momentController.getComments);
router.post("/:id/comments", authenticate, momentController.commentOnMoment);
router.delete("/comments/:commentId", authenticate, momentController.deleteComment);
router.post("/:id/report", authenticate, momentController.reportMoment);

// Tracking analytics
router.post("/:id/view", momentController.trackView);
router.post("/:id/shop-click", momentController.trackShopClick);
router.post("/:id/product-click", momentController.trackProductClick);
router.post("/:id/cart-addition", momentController.trackCartAddition);

export default router;

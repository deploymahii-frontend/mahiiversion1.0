import { Router } from "express";
import * as momentController from "./moment.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.get("/feed", authenticate, momentController.getFeed);
router.get("/shop/:shopId", momentController.getShopMoments);
router.post("/", authenticate, momentController.createMoment);
router.post("/:id/like", authenticate, momentController.likeMoment);
router.post("/:id/save", authenticate, momentController.saveMoment);
router.post("/:id/follow", authenticate, momentController.followMomentShop);
router.post("/:id/comment", authenticate, momentController.commentOnMoment);
router.post("/:id/view", authenticate, momentController.viewMoment);
router.post("/:id/shop-click", authenticate, momentController.trackShopClick);

export default router;

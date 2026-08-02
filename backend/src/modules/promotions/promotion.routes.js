import express from "express";
import * as controller from "./promotion.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";

const router = express.Router();

router.get("/nearby", controller.getNearbyPromotions);
router.get("/shop/:id", controller.getShopPromotions);
router.post("/", authenticate, authorize(["SHOP_OWNER", "ADMIN"]), controller.createPromotion);
router.post("/:id/view", authenticate, controller.viewPromotion);
router.post("/:id/click", authenticate, controller.clickPromotion);

export default router;

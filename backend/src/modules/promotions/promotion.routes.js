import express from "express";
import * as controller from "./promotion.controller.js";
import { authenticate, authorize } from "../auth/auth.middleware.js";

const router = express.Router();

router.post("/", authenticate, authorize(["SHOP_OWNER", "ADMIN"]), controller.createPromotion);
router.get("/nearby", authenticate, controller.getNearbyPromotions);
router.get("/shop/:id", authenticate, controller.getShopPromotions);
router.post("/:id/view", authenticate, controller.viewPromotion);
router.post("/:id/click", authenticate, controller.clickPromotion);

export default router;

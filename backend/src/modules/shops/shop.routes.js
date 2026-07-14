import { Router } from "express";

import * as shopController from "./shop.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createShopSchema,
  updateShopSchema,
  updateLocationSchema,
  updateBusinessHoursSchema,
} from "./shop.validation.js";

const router = Router();

/**
 * Public Routes
 */
router.get("/", shopController.listShops);

router.get("/search", shopController.searchShops);
router.get("/nearby", shopController.nearbyShops);

router.get("/:slug", shopController.getShopBySlug);

/**
 * Protected Routes
 */
router.post(
  "/",
  authenticate,
  validate(createShopSchema),
  shopController.createShop
);

router.put(
  "/:id",
  authenticate,
  validate(updateShopSchema),
  shopController.updateShop
);

router.delete("/:id", authenticate, shopController.deleteShop);

export default router;


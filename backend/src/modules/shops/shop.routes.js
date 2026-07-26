import { Router } from "express";

import * as shopController from "./shop.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createShopSchema,
  updateShopSchema,
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
  authorize("SHOP_OWNER"),
  validate(createShopSchema),
  shopController.createShop
);

router.get(
  "/mine",
  authenticate,
  authorize("SHOP_OWNER"),
  shopController.getMyShop
);

router.patch(
  "/:id",
  authenticate,
  authorize("SHOP_OWNER"),
  validate(updateShopSchema),
  shopController.updateShop
);

export default router;


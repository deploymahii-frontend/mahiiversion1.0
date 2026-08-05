import { Router } from "express";

import * as shopController from "./shop.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";
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
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN, ROLES.CUSTOMER, ""),
  validate(createShopSchema),
  shopController.createShop
);

router.get(
  "/mine",
  authenticate,
  authorize(ROLES.SHOP_OWNER),
  shopController.getMyShop
);

router.patch(
  "/:id",
  authenticate,
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  validate(updateShopSchema),
  shopController.updateShop
);

export default router;


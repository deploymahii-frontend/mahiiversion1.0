import { Router } from "express";
import * as controller from "./product.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "./product.validation.js";

const router = Router();

/**
 * Public Routes
 */
router.get("/", controller.getProducts);

router.get("/search", controller.searchProducts);

router.get("/shop/:shopId", controller.getShopProducts);

router.get("/slug/:slug", controller.getProductBySlug);

router.get("/:id", controller.getProduct);

/**
 * Protected Routes
 */
router.post(
  "/",
  authenticate,
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  validate(createProductSchema),
  controller.createProduct
);

router.put(
  "/:id",
  authenticate,
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  validate(updateProductSchema),
  controller.updateProduct
);

router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  controller.deleteProduct
);

export default router;

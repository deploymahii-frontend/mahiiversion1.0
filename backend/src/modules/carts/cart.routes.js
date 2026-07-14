import { Router } from "express";
import * as controller from "./cart.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  addToCartSchema,
  updateCartQuantitySchema,
} from "./cart.validation.js";

const router = Router();

/**
 * All cart routes require authentication.
 */
router.use(authenticate);

/**
 * Only customers can manage their cart.
 */
router.use(authorize(ROLES.CUSTOMER));

router.get("/", controller.getCart);

router.post(
  "/",
  validate(addToCartSchema),
  controller.addToCart
);

router.put(
  "/:productId",
  validate(updateCartQuantitySchema),
  controller.updateQuantity
);

router.delete("/:productId", controller.removeFromCart);

router.delete("/", controller.clearCart);

export default router;

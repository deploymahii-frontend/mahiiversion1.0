import { Router } from "express";
import * as controller from "./cart.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  addItemSchema,
  updateQuantitySchema,
} from "./cart.validation.js";

const router = Router();

router.use(authenticate);

router.get("/", controller.getCart);

router.post(
  "/add",
  validate(addItemSchema),
  controller.addItem
);

router.patch(
  "/item/:productId",
  validate(updateQuantitySchema),
  controller.updateQuantity
);

router.delete(
  "/item/:productId",
  controller.removeItem
);

router.delete("/", controller.clearCart);

export default router;

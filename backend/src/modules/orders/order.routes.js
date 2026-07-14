import { Router } from "express";
import * as controller from "./order.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "./order.validation.js";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  authorize(ROLES.CUSTOMER),
  validate(createOrderSchema),
  controller.createOrder
);

router.get(
  "/my-orders",
  authorize(ROLES.CUSTOMER),
  controller.getMyOrders
);

router.get(
  "/shop/:shopId",
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  controller.getShopOrders
);

router.patch(
  "/:id/status",
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  validate(updateOrderStatusSchema),
  controller.updateOrderStatus
);

router.get("/:id", controller.getOrder);

router.put(
  "/:id",
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  controller.updateOrder
);

router.delete(
  "/:id",
  authorize(ROLES.ADMIN),
  controller.deleteOrder
);

export default router;

import { Router } from "express";
import * as controller from "./product.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";

const router = Router();

router.get(
  "/",
  controller.list
);

router.post(
  "/",
  authenticate,
  authorize("SHOP_OWNER"),
  controller.create
);

router.get(
  "/shop",
  authenticate,
  authorize("SHOP_OWNER"),
  controller.list
);

router.get(
  "/shop/:shopId",
  controller.list
);

router.get(
  "/:id",
  controller.getOne
);

router.put(
  "/:id",
  authenticate,
  authorize("SHOP_OWNER"),
  controller.update
);

router.patch(
  "/:id",
  authenticate,
  authorize("SHOP_OWNER"),
  controller.update
);

router.patch(
  "/:id/stock",
  authenticate,
  authorize("SHOP_OWNER"),
  controller.updateStock
);

router.patch(
  "/:id/availability",
  authenticate,
  authorize("SHOP_OWNER"),
  controller.toggleAvailability
);

router.delete(
  "/:id",
  authenticate,
  authorize("SHOP_OWNER"),
  controller.remove
);

export default router;

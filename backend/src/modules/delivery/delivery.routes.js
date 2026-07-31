import express from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import * as deliveryController from "./delivery.controller.js";

const router = express.Router();

router.get(
  "/available-orders",
  authenticate,
  authorize("DELIVERY_PARTNER"),
  deliveryController.availableOrders
);

router.post(
  "/orders/:id/accept",
  authenticate,
  authorize("DELIVERY_PARTNER"),
  deliveryController.acceptOrder
);

router.patch(
  "/orders/:id/status",
  authenticate,
  authorize("DELIVERY_PARTNER"),
  deliveryController.updateDeliveryStatus
);

router.get(
  "/earnings",
  authenticate,
  authorize("DELIVERY_PARTNER"),
  deliveryController.getEarnings
);

router.patch(
  "/availability",
  authenticate,
  authorize("DELIVERY_PARTNER"),
  deliveryController.updateAvailability
);

export default router;

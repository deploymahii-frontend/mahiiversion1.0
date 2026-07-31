import express from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import * as subscriptionController from "./subscription.controller.js";

const router = express.Router();

router.get(
  "/current",
  authenticate,
  authorize("SHOP_OWNER"),
  subscriptionController.getCurrentSubscription
);

router.post(
  "/upgrade",
  authenticate,
  authorize("SHOP_OWNER"),
  subscriptionController.upgradePlan
);

export default router;

import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { ROLES } from "../../../shared/constants/roles.js";
import { validate } from "../../../middleware/validate.middleware.js";
import * as deliveryController from "../controllers/delivery.controller.js";
import * as locationController from "../controllers/location.controller.js";
import * as walletController from "../controllers/wallet.controller.js";
import * as assignmentController from "../controllers/assignment.controller.js";
import {
  updateStatusSchema,
  updateLocationSchema,
} from "../validations/delivery.validation.js";

const router = Router();

router.use(authenticate);
router.use(authorize(ROLES.DELIVERY_PARTNER));

router.get("/profile", deliveryController.getProfile);
router.get("/orders", assignmentController.getOrders);
router.patch("/status", validate(updateStatusSchema), deliveryController.updateStatus);
router.patch(
  "/location",
  validate(updateLocationSchema),
  locationController.updateLocation
);
router.get("/wallet", walletController.getWallet);
router.get("/earnings", walletController.getEarnings);

export default router;

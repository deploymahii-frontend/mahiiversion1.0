import { Router } from "express";
import * as controller from "./payment.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";
import { validate } from "../../middleware/validate.middleware.js";
import { createOrderSchema, verifySchema } from "./payment.validation.js";

const router = Router();

router.use(authenticate);

router.post(
  "/create-order",
  authorize(ROLES.CUSTOMER),
  validate(createOrderSchema),
  controller.createOrder
);
router.post(
  "/verify",
  authorize(ROLES.CUSTOMER, ROLES.ADMIN),
  validate(verifySchema),
  controller.verify
);

export default router;

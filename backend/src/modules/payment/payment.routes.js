import { Router } from "express";
import * as controller from "./payment.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { createOrderSchema, verifySchema } from "./payment.validation.js";

const router = Router();

router.use(authenticate);

router.post("/create-order", validate(createOrderSchema), controller.createOrder);
router.post("/verify", validate(verifySchema), controller.verify);

export default router;

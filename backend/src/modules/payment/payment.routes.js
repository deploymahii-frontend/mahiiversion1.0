import express from "express";
import { authenticate } from "../../middleware/authenticate.js";
import * as paymentController from "./payment.controller.js";

const router = express.Router();

router.post("/create", authenticate, paymentController.createPaymentHandler);
router.post("/verify", authenticate, paymentController.verifyPaymentHandler);
router.get("/:paymentId", authenticate, paymentController.getPayment);

export default router;

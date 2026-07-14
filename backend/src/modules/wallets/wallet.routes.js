import { Router } from "express";
import * as walletController from "./wallet.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/", walletController.getWallet);
router.get("/transactions", walletController.getTransactions);
router.post("/reward", walletController.addReward);

export default router;

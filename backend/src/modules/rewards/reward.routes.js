import { Router } from "express";
import * as rewardController from "./reward.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.use(authenticate);

router.get("/my", authorize(ROLES.SHOP_OWNER, ROLES.ADMIN), rewardController.getMyRewards);
router.post("/", authorize(ROLES.SHOP_OWNER, ROLES.ADMIN), rewardController.createReward);
router.patch("/:id/approve", authorize(ROLES.ADMIN), rewardController.approveReward);

export default router;

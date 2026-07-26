import { Router } from "express";

import * as controller from "./trialBalance.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { permission } from "../../../middleware/permission.js";

const router = Router();

router.use(authenticate);

router.get(

    "/",

    permission("trialBalance:view"),

    controller.getTrialBalance

);

export default router;

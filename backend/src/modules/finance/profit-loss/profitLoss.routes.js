import { Router } from "express";

import * as controller from "./profitLoss.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { permission } from "../../../middleware/permission.js";

const router = Router();

router.use(authenticate);

router.get(

    "/",

    permission("profitLoss:view"),

    controller.getProfitLoss

);

export default router;

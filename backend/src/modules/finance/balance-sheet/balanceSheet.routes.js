import { Router } from "express";

import * as controller from "./balanceSheet.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { permission } from "../../../middleware/permission.js";

const router = Router();

router.use(authenticate);

router.get(

    "/",

    permission("balanceSheet:view"),

    controller.getBalanceSheet

);

export default router;

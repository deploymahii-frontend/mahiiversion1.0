import { Router } from "express";

import * as controller from "./payroll.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import { processPayrollSchema } from "./payroll.validation.js";

const router = Router();

router.use(authenticate);

/*
|--------------------------------------------------------------------------
| Process Payroll
|--------------------------------------------------------------------------
*/

router.post(
    "/process",
    authorize("SUPER_ADMIN", "ADMIN", "HR"),
    permission("payroll:process"),
    validate(processPayrollSchema),
    controller.processPayroll
);

/*
|--------------------------------------------------------------------------
| Payroll List
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    authorize("SUPER_ADMIN", "ADMIN", "HR"),
    permission("payroll:view"),
    controller.getPayrolls
);

/*
|--------------------------------------------------------------------------
| Payroll Details
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN", "HR"),
    permission("payroll:view"),
    controller.getPayroll
);

export default router;

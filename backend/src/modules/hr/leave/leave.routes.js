import { Router } from "express";

import * as controller from "./leave.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {
    applyLeaveSchema,
    rejectLeaveSchema
} from "./leave.validation.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| All Leave APIs Require Authentication
|--------------------------------------------------------------------------
*/

router.use(authenticate);

/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

router.get(
    "/statistics",
    permission("leave:view"),
    controller.statistics
);

/*
|--------------------------------------------------------------------------
| Leave List
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    permission("leave:view"),
    controller.getLeaveList
);

/*
|--------------------------------------------------------------------------
| Pending Leave Requests
|--------------------------------------------------------------------------
*/

router.get(
    "/pending",
    authorize("SUPER_ADMIN", "ADMIN", "HR"),
    permission("leave:approve"),
    controller.getPendingLeaves
);

/*
|--------------------------------------------------------------------------
| Employee Leave History
|--------------------------------------------------------------------------
*/

router.get(
    "/employee/:employeeId",
    permission("leave:view"),
    controller.getEmployeeLeaves
);

/*
|--------------------------------------------------------------------------
| Apply Leave
|--------------------------------------------------------------------------
*/

router.post(
    "/apply",
    validate(applyLeaveSchema),
    permission("leave:create"),
    controller.applyLeave
);

/*
|--------------------------------------------------------------------------
| Approve Leave
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/approve",
    authorize("SUPER_ADMIN", "ADMIN", "HR"),
    permission("leave:approve"),
    controller.approveLeave
);

/*
|--------------------------------------------------------------------------
| Reject Leave
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/reject",
    authorize("SUPER_ADMIN", "ADMIN", "HR"),
    validate(rejectLeaveSchema),
    permission("leave:approve"),
    controller.rejectLeave
);

/*
|--------------------------------------------------------------------------
| Cancel Leave
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/cancel",
    permission("leave:cancel"),
    controller.cancelLeave
);

export default router;

import { Router } from "express";

import * as controller from "./attendance.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {
    checkInSchema,
    checkOutSchema
} from "./attendance.validation.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| All Attendance APIs Require Authentication
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
    permission("attendance:view"),
    controller.statistics
);

/*
|--------------------------------------------------------------------------
| Attendance List
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    permission("attendance:view"),
    controller.getAttendanceList
);

/*
|--------------------------------------------------------------------------
| Employee Attendance
|--------------------------------------------------------------------------
*/

router.get(
    "/employee/:employeeId",
    permission("attendance:view"),
    controller.getEmployeeAttendance
);

/*
|--------------------------------------------------------------------------
| Attendance Details
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    permission("attendance:view"),
    controller.getAttendance
);

/*
|--------------------------------------------------------------------------
| Daily Report
|--------------------------------------------------------------------------
*/

router.get(
    "/report/daily",
    authorize("SUPER_ADMIN","ADMIN","HR"),
    permission("attendance:report"),
    controller.dailyReport
);

/*
|--------------------------------------------------------------------------
| Monthly Report
|--------------------------------------------------------------------------
*/

router.get(
    "/report/monthly/:employeeId",
    authorize("SUPER_ADMIN","ADMIN","HR"),
    permission("attendance:report"),
    controller.monthlyReport
);

/*
|--------------------------------------------------------------------------
| Employee Check In
|--------------------------------------------------------------------------
*/

router.post(
    "/check-in",
    validate(checkInSchema),
    permission("attendance:checkin"),
    controller.checkIn
);

/*
|--------------------------------------------------------------------------
| Employee Check Out
|--------------------------------------------------------------------------
*/

router.post(
    "/check-out/:id",
    validate(checkOutSchema),
    permission("attendance:checkout"),
    controller.checkOut
);

export default router;
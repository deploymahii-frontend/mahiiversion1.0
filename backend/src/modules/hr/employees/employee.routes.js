import { Router } from "express";

import * as controller from "./employee.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {
    createEmployeeSchema,
    updateEmployeeSchema,
    resignEmployeeSchema
} from "./employee.validation.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| All Employee APIs require authentication
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
    permission("employee:view"),
    controller.statistics
);

/*
|--------------------------------------------------------------------------
| Search Employees
|--------------------------------------------------------------------------
*/

router.get(
    "/search",
    permission("employee:view"),
    controller.searchEmployees
);

/*
|--------------------------------------------------------------------------
| Employee List
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    permission("employee:view"),
    controller.getEmployees
);

/*
|--------------------------------------------------------------------------
| Employee Details
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    permission("employee:view"),
    controller.getEmployee
);

/*
|--------------------------------------------------------------------------
| Create Employee
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN", "HR"),
    permission("employee:create"),
    validate(createEmployeeSchema),
    controller.createEmployee
);

/*
|--------------------------------------------------------------------------
| Update Employee
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN", "HR"),
    permission("employee:update"),
    validate(updateEmployeeSchema),
    controller.updateEmployee
);

/*
|--------------------------------------------------------------------------
| Activate Employee
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/activate",
    authorize("SUPER_ADMIN", "ADMIN", "HR"),
    permission("employee:update"),
    controller.activateEmployee
);

/*
|--------------------------------------------------------------------------
| Resign Employee
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/resign",
    authorize("SUPER_ADMIN", "ADMIN", "HR"),
    validate(resignEmployeeSchema),
    controller.resignEmployee
);

/*
|--------------------------------------------------------------------------
| Terminate Employee
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/terminate",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("employee:terminate"),
    controller.terminateEmployee
);

export default router;

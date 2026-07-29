import { Router } from "express";

import * as controller from "./salary-structure.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {
    createSalaryStructureSchema,
    updateSalaryStructureSchema
} from "./salary-structure.validation.js";

const router = Router();

router.use(authenticate);

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN", "HR"),
    permission("payroll:create"),
    validate(createSalaryStructureSchema),
    controller.createSalaryStructure
);

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN", "HR"),
    permission("payroll:update"),
    validate(updateSalaryStructureSchema),
    controller.updateSalaryStructure
);

router.get(
    "/employee/:employeeId",
    permission("payroll:view"),
    controller.getSalaryStructure
);

router.get(
    "/history/:employeeId",
    permission("payroll:view"),
    controller.getSalaryStructure
);

router.get(
    "/",
    permission("payroll:view"),
    controller.getSalaryStructures
);

export default router;

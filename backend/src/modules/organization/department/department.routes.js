import { Router } from "express";
import * as controller from "./department.controller.js";
import { validate } from "../../../middleware/validate.js";
import { createDepartmentSchema, updateDepartmentSchema } from "./department.validation.js";

const router = Router();

router.get("/", controller.getDepartments);
router.get("/search", controller.searchDepartments);
router.get("/company/:companyId", controller.getDepartmentsByCompany);
router.get("/branch/:branchId", controller.getDepartmentsByBranch);
router.get("/:id", controller.getDepartment);
router.post("/", validate(createDepartmentSchema), controller.createDepartment);
router.put("/:id", validate(updateDepartmentSchema), controller.updateDepartment);
router.delete("/:id", controller.deleteDepartment);

export default router;

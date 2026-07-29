import { Router } from "express";
import * as controller from "./designation.controller.js";
import { validate } from "../../../middleware/validate.js";
import { createDesignationSchema, updateDesignationSchema } from "./designation.validation.js";

const router = Router();

router.get("/", controller.getDesignations);
router.get("/search", controller.searchDesignations);
router.get("/department/:departmentId", controller.getDesignationsByDepartment);
router.get("/:id", controller.getDesignation);
router.post("/", validate(createDesignationSchema), controller.createDesignation);
router.put("/:id", validate(updateDesignationSchema), controller.updateDesignation);
router.delete("/:id", controller.deleteDesignation);

export default router;

import { Router } from "express";
import * as controller from "./company.controller.js";
import { validate } from "../../../middleware/validate.js";
import { createCompanySchema, updateCompanySchema } from "./company.validation.js";

const router = Router();

router.get("/", controller.getCompanies);
router.get("/search", controller.searchCompanies);
router.get("/:id", controller.getCompany);
router.post("/", validate(createCompanySchema), controller.createCompany);
router.put("/:id", validate(updateCompanySchema), controller.updateCompany);
router.delete("/:id", controller.deleteCompany);

export default router;

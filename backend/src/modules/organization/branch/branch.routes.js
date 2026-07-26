import { Router } from "express";
import * as controller from "./branch.controller.js";
import { validate } from "../../../middleware/validate.js";
import { createBranchSchema, updateBranchSchema } from "./branch.validation.js";

const router = Router();

router.get("/", controller.getBranches);
router.get("/company/:companyId", controller.getBranchesByCompany);
router.get("/search", controller.searchBranches);
router.get("/:id", controller.getBranch);
router.post("/", validate(createBranchSchema), controller.createBranch);
router.put("/:id", validate(updateBranchSchema), controller.updateBranch);
router.delete("/:id", controller.deleteBranch);

export default router;

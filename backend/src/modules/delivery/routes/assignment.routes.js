import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { ROLES } from "../../../shared/constants/roles.js";
import * as assignmentController from "../controllers/assignment.controller.js";

const router = Router();

router.use(authenticate);
router.use(authorize(ROLES.DELIVERY_PARTNER));

router.post("/assign/:id", assignmentController.assignOrder);
router.post("/:id/accept", assignmentController.acceptAssignment);
router.post("/:id/reject", assignmentController.rejectAssignment);
router.post("/:id/pick-up", assignmentController.pickedUp);
router.post("/:id/delivered", assignmentController.delivered);

export default router;

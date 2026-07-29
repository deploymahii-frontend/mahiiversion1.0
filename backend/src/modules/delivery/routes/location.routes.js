import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { ROLES } from "../../../shared/constants/roles.js";
import * as locationController from "../controllers/location.controller.js";

const router = Router();

router.use(authenticate);
router.use(authorize(ROLES.DELIVERY_PARTNER));

router.get("/:assignmentId", locationController.getLocationByAssignment);

export default router;

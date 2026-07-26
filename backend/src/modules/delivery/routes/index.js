import { Router } from "express";
import deliveryRoutes from "./delivery.routes.js";
import assignmentRoutes from "./assignment.routes.js";
import locationRoutes from "./location.routes.js";

const router = Router();

router.use("/delivery", deliveryRoutes);
router.use("/assignment", assignmentRoutes);
router.use("/location", locationRoutes);

export default router;

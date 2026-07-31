import express from "express";
const router = express.Router();
import dashboardRoutes from "./dashboard/dashboard.routes.js";
import shopsRoutes from "./shops/shops.routes.js";

import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import { ROLES } from "../../shared/constants/roles.js";

router.use(authenticate, authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN));
router.use("/dashboard", dashboardRoutes);
router.use("/shops", shopsRoutes);

export default router;
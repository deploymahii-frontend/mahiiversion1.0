import { Router } from "express";
import * as dashboardController from "./dashboard.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";

const router = Router();

router.use(authenticate);

router.get(
  "/overview",
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  dashboardController.getOverview
);

router.get(
  "/shop",
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  dashboardController.getShopOverview
);

router.get(
  "/sales",
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  dashboardController.getSalesAnalytics
);

router.get(
  "/products",
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  dashboardController.getPopularProducts
);

router.get(
  "/customers",
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  dashboardController.getCustomerInsights
);

router.get(
  "/stats",
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  dashboardController.getStats
);

export default router;

import express from "express";
const router = express.Router();
import dashboardRoutes from "./dashboard/dashboard.routes.js";
import shopsRoutes from "./shops/shops.routes.js";
import categoryRoutes from "../categories/category.routes.js";
import {
  getUsers,
  getUserById,
  activateUser,
  suspendUser,
  verifyUser,
  getProducts,
  getOrders,
  getPayments,
  updatePaymentStatus,
} from "./admin.controller.js";

import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import { ROLES } from "../../shared/constants/roles.js";

router.use(authenticate, authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN));
router.use("/dashboard", dashboardRoutes);
router.use("/shops", shopsRoutes);
router.use("/categories", categoryRoutes);
router.get("/products", getProducts);
router.get("/orders", getOrders);
router.get("/payments", getPayments);
router.patch("/payments/:id/status", updatePaymentStatus);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id/activate", activateUser);
router.patch("/users/:id/suspend", suspendUser);
router.patch("/users/:id/verify", verifyUser);

export default router;
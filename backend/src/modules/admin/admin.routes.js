import { Router } from "express";
import * as adminController from "./admin.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";

const router = Router();

router.use(authenticate);
router.use(authorize("admin", "super_admin"));

router.get("/dashboard", adminController.getDashboard);

router.get("/shops", adminController.getShops);
router.get("/shops/:id", adminController.getShopById);
router.patch("/shops/:id/status", adminController.updateShopStatus);
router.delete("/shops/:id", adminController.deleteShop);

router.get("/users", adminController.getUsers);
router.get("/users/:id", adminController.getUserById);
router.patch("/users/:id/activate", adminController.activateUser);
router.patch("/users/:id/suspend", adminController.suspendUser);
router.patch("/users/:id/verify", adminController.verifyUser);

export default router;

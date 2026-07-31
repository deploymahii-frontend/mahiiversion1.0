import express from "express";
const router = express.Router();
import dashboardController from "./dashboard.controller.js";

router.get("/overview", dashboardController.getOverview);
router.get("/stats", dashboardController.getStats);
router.get("/revenue", dashboardController.getRevenue);
router.get("/recent-orders", dashboardController.getRecentOrders);
router.get("/top-shops", dashboardController.getTopShops);
router.get("/pending-actions", dashboardController.getPendingActions);

export default router;
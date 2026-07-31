import express from "express";
const router = express.Router();
import shopsController from "./shops.controller.js";

router.get("/", shopsController.getShops);
router.get("/:id", shopsController.getShopById);
router.patch("/:id/approve", shopsController.approveShop);
router.patch("/:id/reject", shopsController.rejectShop);
router.patch("/:id/suspend", shopsController.suspendShop);
router.put("/:id", shopsController.updateShop);

export default router;
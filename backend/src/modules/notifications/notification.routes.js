import express from "express";
import { authenticate } from "../../middleware/authenticate.js";
import * as notificationController from "./notification.controller.js";

const router = express.Router();

router.get("/", authenticate, notificationController.getNotifications);

router.patch("/:id/read", authenticate, notificationController.markAsRead);

router.patch("/read-all", authenticate, notificationController.markAllAsRead);

export default router;

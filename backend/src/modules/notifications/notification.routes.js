import { Router } from "express";
import * as notificationController from "./notification.controller.js";
import * as deviceTokenController from "./deviceToken.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/", notificationController.getNotifications);
router.patch("/:id/read", notificationController.markNotificationRead);
router.delete("/:id", notificationController.deleteNotification);

router.post("/device-token", deviceTokenController.registerDeviceToken);
router.delete("/device-token", deviceTokenController.deleteDeviceToken);
router.get("/device-token", deviceTokenController.getDeviceTokens);

export default router;

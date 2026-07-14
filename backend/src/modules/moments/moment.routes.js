import { Router } from "express";
import * as momentController from "./moment.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", momentController.createMoment);
router.get("/feed", momentController.getFeed);
router.get("/shop/:shopId", momentController.getShopMoments);
router.post("/:id/like", momentController.likeMoment);
router.post("/:id/view", momentController.viewMoment);
router.post("/:id/shop-click", momentController.trackShopClick);

export default router;

import { Router } from "express";
import * as offerController from "./offer.controller.js";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

/**
 * Public Routes
 */
router.get("/", offerController.getActiveOffers);

router.get("/shop/:shopId", offerController.getShopOffers);

/**
 * Protected Routes
 */
router.post("/", authenticate, offerController.createOffer);

router.put("/:id", authenticate, offerController.updateOffer);

router.delete("/:id", authenticate, offerController.deleteOffer);

router.post("/:id/claim", authenticate, offerController.claimOffer);

export default router;

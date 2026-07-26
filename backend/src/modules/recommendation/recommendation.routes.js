import { Router } from "express";
import * as recommendationController from "./recommendation.controller.js";

const router = Router();

router.get("/trending", recommendationController.getTrending);

router.get("/featured", recommendationController.getFeatured);

router.get(
  "/shop/:shopId/similar",
  recommendationController.getSimilar
);

export default router;

import { Router } from "express";
import * as reviewController from "./review.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";
import { validate } from "../../middleware/validate.middleware.js";
import { createReviewSchema } from "./review.validation.js";

const router = Router();

router.get("/shop/:shopId", reviewController.getShopReviews);
router.get("/me", authenticate, reviewController.getMyReviews);
router.post(
  "/",
  authenticate,
  validate(createReviewSchema),
  reviewController.createReview
);
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.ADMIN),
  reviewController.deleteReview
);

export default router;

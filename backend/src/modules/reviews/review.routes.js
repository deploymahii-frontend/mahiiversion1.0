import { Router } from "express";
import * as reviewController from "./review.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createReviewSchema,
  updateReviewSchema,
  ownerReplySchema,
  reportReviewSchema,
} from "./review.validation.js";

const router = Router();

// Public routes
router.get("/shop/:shopId", reviewController.getShopReviews);

// Customer authenticated routes
router.get(
  "/eligibility/:orderId",
  authenticate,
  reviewController.checkOrderEligibility
);
router.get("/me", authenticate, reviewController.getMyReviews);

router.post(
  "/",
  authenticate,
  validate(createReviewSchema),
  reviewController.createReview
);

router.patch(
  "/:id",
  authenticate,
  validate(updateReviewSchema),
  reviewController.updateReview
);

router.delete("/:id", authenticate, reviewController.deleteReview);

// Helpful voting
router.post("/:id/helpful", authenticate, reviewController.toggleHelpful);
router.delete("/:id/helpful", authenticate, reviewController.toggleHelpful);

// Report review
router.post(
  "/:id/report",
  authenticate,
  validate(reportReviewSchema),
  reviewController.reportReview
);

// Shop Owner reply routes
router.post(
  "/:id/reply",
  authenticate,
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validate(ownerReplySchema),
  reviewController.replyToReview
);

router.delete(
  "/:id/reply",
  authenticate,
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN, ROLES.SUPER_ADMIN),
  reviewController.deleteOwnerReply
);

// Admin Moderation routes
router.get(
  "/admin/all",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  reviewController.adminGetReviews
);

router.patch(
  "/admin/:id/status",
  authenticate,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  reviewController.adminUpdateStatus
);

export default router;

import { Router } from "express";
import {
  createBusiness,
  getBusiness,
  updateBusiness,
  listBusinesses,
  deleteBusiness,
} from "./business.controller.js";

import { authenticate } from "../auth/auth.middleware.js";
import { validate } from "../../shared/validation/validate.middleware.js";

import {
  createBusinessSchema,
  updateBusinessSchema,
} from "./business.validation.js";

const router = Router();

// Public
router.get("/", listBusinesses);
router.get("/:id", getBusiness);

// Protected
router.post(
  "/",
  authenticate,
  validate(createBusinessSchema),
  createBusiness
);

router.put(
  "/:id",
  authenticate,
  validate(updateBusinessSchema),
  updateBusiness
);

router.delete(
  "/:id",
  authenticate,
  deleteBusiness
);

export default router;

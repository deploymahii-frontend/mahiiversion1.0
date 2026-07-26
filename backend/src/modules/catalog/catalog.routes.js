import { Router } from "express";
import {
  createCatalogItem,
  getCatalogItem,
  listCatalogItems,
  updateCatalogItem,
  deleteCatalogItem,
} from "./catalog.controller.js";

import { authenticate } from "../auth/auth.middleware.js";
import { validate } from "../../shared/validation/validate.middleware.js";
import {
  createCatalogSchema,
  updateCatalogSchema,
} from "./catalog.validation.js";

const router = Router();

router.get("/", listCatalogItems);
router.get("/:id", getCatalogItem);

router.post(
  "/",
  authenticate,
  validate(createCatalogSchema),
  createCatalogItem
);

router.put(
  "/:id",
  authenticate,
  validate(updateCatalogSchema),
  updateCatalogItem
);

router.delete(
  "/:id",
  authenticate,
  deleteCatalogItem
);

export default router;

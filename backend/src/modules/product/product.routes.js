import { Router } from "express";
import * as productController from "./product.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";
import { ROLES } from "../../shared/constants/roles.js";
import { validate } from "../../middleware/validate.middleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "./product.validation.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/", productController.listProducts);

router.get("/search", productController.searchProducts);

router.get("/shop/:shopId", productController.getShopProducts);

router.get("/:id", productController.getProduct);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authenticate,
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  validate(createProductSchema),
  productController.createProduct
);

router.put(
  "/:id",
  authenticate,
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  validate(updateProductSchema),
  productController.updateProduct
);

router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.SHOP_OWNER, ROLES.ADMIN),
  productController.deleteProduct
);

export default router;

import { Router } from "express";
import * as productController from "./product.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
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
  validate(createProductSchema),
  productController.createProduct
);

router.put(
  "/:id",
  authenticate,
  validate(updateProductSchema),
  productController.updateProduct
);

router.delete(
  "/:id",
  authenticate,
  productController.deleteProduct
);

export default router;

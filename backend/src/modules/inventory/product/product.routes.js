import { Router } from "express";

import * as controller from "./product.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createProductSchema,

    updateProductSchema

} from "./product.validation.js";

const router = Router();

router.use(authenticate);

/*
|--------------------------------------------------------------------------
| Product List
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    permission("product:view"),
    controller.getProducts
);

/*
|--------------------------------------------------------------------------
| Product Details
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    permission("product:view"),
    controller.getProduct
);

/*
|--------------------------------------------------------------------------
| Create Product
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(createProductSchema),
    permission("product:create"),
    controller.createProduct
);

/*
|--------------------------------------------------------------------------
| Update Product
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(updateProductSchema),
    permission("product:update"),
    controller.updateProduct
);

/*
|--------------------------------------------------------------------------
| Delete Product
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("product:delete"),
    controller.deleteProduct
);

export default router;

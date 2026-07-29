import { Router } from "express";

import * as controller from "./category.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {
    createCategorySchema,
    updateCategorySchema
} from "./category.validation.js";

const router = Router();

router.use(authenticate);

/*
|--------------------------------------------------------------------------
| Category Tree
|--------------------------------------------------------------------------
*/

router.get(
    "/tree",
    permission("category:view"),
    controller.getCategoryTree
);

/*
|--------------------------------------------------------------------------
| Category List
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    permission("category:view"),
    controller.getCategories
);

/*
|--------------------------------------------------------------------------
| Category Details
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    permission("category:view"),
    controller.getCategory
);

/*
|--------------------------------------------------------------------------
| Create Category
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(createCategorySchema),
    permission("category:create"),
    controller.createCategory
);

/*
|--------------------------------------------------------------------------
| Update Category
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(updateCategorySchema),
    permission("category:update"),
    controller.updateCategory
);

/*
|--------------------------------------------------------------------------
| Delete Category
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("category:delete"),
    controller.deleteCategory
);

export default router;

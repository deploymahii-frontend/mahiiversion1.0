import { Router } from "express";

import * as controller from "./supplier.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createSupplierSchema,

    updateSupplierSchema

} from "./supplier.validation.js";

const router = Router();

router.use(authenticate);

/*
|--------------------------------------------------------------------------
| Supplier List
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    permission("supplier:view"),
    controller.getSuppliers
);

/*
|--------------------------------------------------------------------------
| Supplier Details
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    permission("supplier:view"),
    controller.getSupplier
);

/*
|--------------------------------------------------------------------------
| Create Supplier
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(createSupplierSchema),
    permission("supplier:create"),
    controller.createSupplier
);

/*
|--------------------------------------------------------------------------
| Update Supplier
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(updateSupplierSchema),
    permission("supplier:update"),
    controller.updateSupplier
);

/*
|--------------------------------------------------------------------------
| Delete Supplier
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("supplier:delete"),
    controller.deleteSupplier
);

export default router;

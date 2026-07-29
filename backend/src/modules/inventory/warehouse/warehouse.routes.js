import { Router } from "express";

import * as controller from "./warehouse.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {
    createWarehouseSchema,
    updateWarehouseSchema
} from "./warehouse.validation.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/

router.use(authenticate);

/*
|--------------------------------------------------------------------------
| Statistics
|--------------------------------------------------------------------------
*/

router.get(
    "/statistics",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("warehouse:view"),
    controller.statistics
);

/*
|--------------------------------------------------------------------------
| Warehouse List
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    permission("warehouse:view"),
    controller.getWarehouses
);

/*
|--------------------------------------------------------------------------
| Warehouse Details
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    permission("warehouse:view"),
    controller.getWarehouse
);

/*
|--------------------------------------------------------------------------
| Create Warehouse
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    authorize("SUPER_ADMIN","ADMIN"),
    validate(createWarehouseSchema),
    permission("warehouse:create"),
    controller.createWarehouse
);

/*
|--------------------------------------------------------------------------
| Update Warehouse
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    authorize("SUPER_ADMIN","ADMIN"),
    validate(updateWarehouseSchema),
    permission("warehouse:update"),
    controller.updateWarehouse
);

/*
|--------------------------------------------------------------------------
| Delete Warehouse
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    authorize("SUPER_ADMIN","ADMIN"),
    permission("warehouse:delete"),
    controller.deleteWarehouse
);

export default router;

import { Router } from "express";

import * as controller from "./stock.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createStockSchema,

    stockMovementSchema

} from "./stock.validation.js";

const router = Router();

router.use(authenticate);

/*
|--------------------------------------------------------------------------
| Stock List
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    permission("stock:view"),
    controller.getStocks
);

/*
|--------------------------------------------------------------------------
| Stock Details
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    permission("stock:view"),
    controller.getStock
);

/*
|--------------------------------------------------------------------------
| Create Stock
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(createStockSchema),
    permission("stock:create"),
    controller.createStock
);

/*
|--------------------------------------------------------------------------
| Increase Stock
|--------------------------------------------------------------------------
*/

router.post(
    "/increase",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(stockMovementSchema),
    permission("stock:update"),
    controller.increaseStock
);

/*
|--------------------------------------------------------------------------
| Decrease Stock
|--------------------------------------------------------------------------
*/

router.post(
    "/decrease",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(stockMovementSchema),
    permission("stock:update"),
    controller.decreaseStock
);

/*
|--------------------------------------------------------------------------
| Product History
|--------------------------------------------------------------------------
*/

router.get(
    "/history/product/:product",
    permission("stock:view"),
    controller.getHistory
);

/*
|--------------------------------------------------------------------------
| Warehouse History
|--------------------------------------------------------------------------
*/

router.get(
    "/history/warehouse/:warehouse",
    permission("stock:view"),
    controller.getWarehouseHistory
);

export default router;

import { Router } from "express";

import * as controller from "./salesOrder.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createSalesOrderSchema,

    updateSalesOrderSchema

} from "./salesOrder.validation.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    permission("salesOrder:view"),
    controller.getSalesOrders
);

router.get(
    "/:id",
    permission("salesOrder:view"),
    controller.getSalesOrder
);

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN", "SALES_MANAGER"),
    validate(createSalesOrderSchema),
    permission("salesOrder:create"),
    controller.createSalesOrder
);

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN", "SALES_MANAGER"),
    validate(updateSalesOrderSchema),
    permission("salesOrder:update"),
    controller.updateSalesOrder
);

router.delete(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("salesOrder:delete"),
    controller.deleteSalesOrder
);

export default router;

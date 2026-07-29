import { Router } from "express";

import * as controller from "./purchaseOrder.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createPurchaseOrderSchema,

    updatePurchaseOrderSchema

} from "./purchaseOrder.validation.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    permission("purchase:view"),
    controller.getPurchaseOrders
);

router.get(
    "/:id",
    permission("purchase:view"),
    controller.getPurchaseOrder
);

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(createPurchaseOrderSchema),
    permission("purchase:create"),
    controller.createPurchaseOrder
);

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(updatePurchaseOrderSchema),
    permission("purchase:update"),
    controller.updatePurchaseOrder
);

router.delete(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("purchase:delete"),
    controller.deletePurchaseOrder
);

export default router;

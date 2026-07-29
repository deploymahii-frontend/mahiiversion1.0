import { Router } from "express";

import * as controller from "./purchaseInvoice.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createPurchaseInvoiceSchema,

    updatePurchaseInvoiceSchema

} from "./purchaseInvoice.validation.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    permission("purchaseInvoice:view"),
    controller.getPurchaseInvoices
);

router.get(
    "/:id",
    permission("purchaseInvoice:view"),
    controller.getPurchaseInvoice
);

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(createPurchaseInvoiceSchema),
    permission("purchaseInvoice:create"),
    controller.createPurchaseInvoice
);

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(updatePurchaseInvoiceSchema),
    permission("purchaseInvoice:update"),
    controller.updatePurchaseInvoice
);

router.delete(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("purchaseInvoice:delete"),
    controller.deletePurchaseInvoice
);

export default router;

import { Router } from "express";

import * as controller from "./supplierPayment.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createSupplierPaymentSchema,

    updateSupplierPaymentSchema

} from "./supplierPayment.validation.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    permission("supplierPayment:view"),
    controller.getSupplierPayments
);

router.get(
    "/:id",
    permission("supplierPayment:view"),
    controller.getSupplierPayment
);

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(createSupplierPaymentSchema),
    permission("supplierPayment:create"),
    controller.createSupplierPayment
);

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(updateSupplierPaymentSchema),
    permission("supplierPayment:update"),
    controller.updateSupplierPayment
);

router.delete(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("supplierPayment:delete"),
    controller.deleteSupplierPayment
);

export default router;

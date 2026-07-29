import { Router } from "express";

import * as controller from "./customerPayment.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createCustomerPaymentSchema,

    updateCustomerPaymentSchema

} from "./customerPayment.validation.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    permission("customerPayment:view"),
    controller.getCustomerPayments
);

router.get(
    "/:id",
    permission("customerPayment:view"),
    controller.getCustomerPayment
);

router.post(
    "/",
    authorize(
        "SUPER_ADMIN",
        "ADMIN",
        "ACCOUNT_MANAGER"
    ),
    validate(createCustomerPaymentSchema),
    permission("customerPayment:create"),
    controller.createCustomerPayment
);

router.put(
    "/:id",
    authorize(
        "SUPER_ADMIN",
        "ADMIN",
        "ACCOUNT_MANAGER"
    ),
    validate(updateCustomerPaymentSchema),
    permission("customerPayment:update"),
    controller.updateCustomerPayment
);

router.delete(
    "/:id",
    authorize(
        "SUPER_ADMIN",
        "ADMIN"
    ),
    permission("customerPayment:delete"),
    controller.deleteCustomerPayment
);

export default router;

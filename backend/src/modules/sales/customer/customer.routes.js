import { Router } from "express";

import * as controller from "./customer.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createCustomerSchema,

    updateCustomerSchema

} from "./customer.validation.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    permission("customer:view"),
    controller.getCustomers
);

router.get(
    "/:id",
    permission("customer:view"),
    controller.getCustomer
);

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN", "SALES_MANAGER"),
    validate(createCustomerSchema),
    permission("customer:create"),
    controller.createCustomer
);

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN", "SALES_MANAGER"),
    validate(updateCustomerSchema),
    permission("customer:update"),
    controller.updateCustomer
);

router.delete(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("customer:delete"),
    controller.deleteCustomer
);

export default router;

import { Router } from "express";

import * as controller from "./quotation.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createQuotationSchema,

    updateQuotationSchema

} from "./quotation.validation.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    permission("quotation:view"),
    controller.getQuotations
);

router.get(
    "/:id",
    permission("quotation:view"),
    controller.getQuotation
);

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN", "SALES_MANAGER"),
    validate(createQuotationSchema),
    permission("quotation:create"),
    controller.createQuotation
);

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN", "SALES_MANAGER"),
    validate(updateQuotationSchema),
    permission("quotation:update"),
    controller.updateQuotation
);

router.delete(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("quotation:delete"),
    controller.deleteQuotation
);

export default router;

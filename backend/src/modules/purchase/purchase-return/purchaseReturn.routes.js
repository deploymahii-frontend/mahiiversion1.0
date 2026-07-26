import { Router } from "express";

import * as controller from "./purchaseReturn.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createPurchaseReturnSchema,

    updatePurchaseReturnSchema

} from "./purchaseReturn.validation.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    permission("purchaseReturn:view"),
    controller.getPurchaseReturns
);

router.get(
    "/:id",
    permission("purchaseReturn:view"),
    controller.getPurchaseReturn
);

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(createPurchaseReturnSchema),
    permission("purchaseReturn:create"),
    controller.createPurchaseReturn
);

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(updatePurchaseReturnSchema),
    permission("purchaseReturn:update"),
    controller.updatePurchaseReturn
);

router.delete(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("purchaseReturn:delete"),
    controller.deletePurchaseReturn
);

export default router;

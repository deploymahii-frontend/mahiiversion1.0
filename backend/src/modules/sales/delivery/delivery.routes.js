import { Router } from "express";

import * as controller from "./delivery.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createDeliverySchema,

    updateDeliverySchema

} from "./delivery.validation.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    permission("delivery:view"),
    controller.getDeliveries
);

router.get(
    "/:id",
    permission("delivery:view"),
    controller.getDelivery
);

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN", "WAREHOUSE_MANAGER"),
    validate(createDeliverySchema),
    permission("delivery:create"),
    controller.createDelivery
);

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN", "WAREHOUSE_MANAGER"),
    validate(updateDeliverySchema),
    permission("delivery:update"),
    controller.updateDelivery
);

router.delete(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("delivery:delete"),
    controller.deleteDelivery
);

export default router;

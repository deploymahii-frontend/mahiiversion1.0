import { Router } from "express";

import * as controller from "./grn.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createGRNSchema

} from "./grn.validation.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    permission("grn:view"),
    controller.getGRNs
);

router.get(
    "/:id",
    permission("grn:view"),
    controller.getGRN
);

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(createGRNSchema),
    permission("grn:create"),
    controller.createGRN
);

export default router;

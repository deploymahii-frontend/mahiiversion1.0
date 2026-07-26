import { Router } from "express";

import * as controller from "./coa.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createAccountSchema,

    updateAccountSchema

} from "./coa.validation.js";

const router = Router();

router.use(authenticate);

router.get(

    "/",

    permission("coa:view"),

    controller.getChart

);

router.get(

    "/:id",

    permission("coa:view"),

    controller.getAccount

);

router.post(

    "/",

    authorize("SUPER_ADMIN"),

    validate(createAccountSchema),

    permission("coa:create"),

    controller.createAccount

);

router.put(

    "/:id",

    authorize("SUPER_ADMIN"),

    validate(updateAccountSchema),

    permission("coa:update"),

    controller.updateAccount

);

router.delete(

    "/:id",

    authorize("SUPER_ADMIN"),

    permission("coa:delete"),

    controller.deleteAccount

);

export default router;

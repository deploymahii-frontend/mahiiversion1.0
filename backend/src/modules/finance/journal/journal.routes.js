import { Router } from "express";

import * as controller from "./journal.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";
import { validate } from "../../../middleware/validate.js";

import {

    createJournalSchema,

    updateJournalSchema

} from "./journal.validation.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    permission("journal:view"),
    controller.getJournals
);

router.get(
    "/:id",
    permission("journal:view"),
    controller.getJournal
);

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(createJournalSchema),
    permission("journal:create"),
    controller.createJournal
);

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    validate(updateJournalSchema),
    permission("journal:update"),
    controller.updateJournal
);

router.delete(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("journal:delete"),
    controller.deleteJournal
);

export default router;

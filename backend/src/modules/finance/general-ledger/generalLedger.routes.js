import { Router } from "express";

import * as controller from "./generalLedger.controller.js";

import { authenticate } from "../../../middleware/authenticate.js";
import { authorize } from "../../../middleware/authorize.js";
import { permission } from "../../../middleware/permission.js";

const router = Router();

router.use(authenticate);

router.get(
    "/",
    permission("ledger:view"),
    controller.getLedgerList
);

router.get(
    "/account/:accountId",
    permission("ledger:view"),
    controller.getAccountLedger
);

router.get(
    "/:id",
    permission("ledger:view"),
    controller.getLedger
);

router.post(
    "/post/:journalId",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("ledger:post"),
    controller.postJournal
);

export default router;

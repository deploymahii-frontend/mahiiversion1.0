import { Router } from "express";
import * as controller from "./product.controller.js";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/authorize.middleware.js";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize("SHOP_OWNER"),
    controller.create
);

router.get(
    "/shop/:shopId",
    controller.list
);

router.patch(
    "/:id",
    authenticate,
    authorize("SHOP_OWNER"),
    controller.update
);

router.delete(
    "/:id",
    authenticate,
    authorize("SHOP_OWNER"),
    controller.remove
);

export default router;

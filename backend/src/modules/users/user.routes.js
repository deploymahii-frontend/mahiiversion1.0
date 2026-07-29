import { Router } from "express";

import * as controller from "./user.controller.js";

import { authenticate } from "../../middleware/authenticate.js";
import { authorize } from "../../middleware/authorize.js";
import { permission } from "../../middleware/permission.js";
import { validate } from "../../middleware/validate.js";

import {
    createUserSchema,
    updateUserSchema,
    updateProfileSchema
} from "./user.validation.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| All routes require authentication
|--------------------------------------------------------------------------
*/

router.use(authenticate);

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get(
    "/dashboard/statistics",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("user:view"),
    controller.getDashboardStatistics
);

/*
|--------------------------------------------------------------------------
| Search
|--------------------------------------------------------------------------
*/

router.get(
    "/search",
    permission("user:view"),
    controller.searchUsers
);

/*
|--------------------------------------------------------------------------
| List Users
|--------------------------------------------------------------------------
*/

router.get(
    "/",
    permission("user:view"),
    controller.getUsers
);

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

router.put(
    "/profile",
    validate(updateProfileSchema),
    controller.updateProfile
);

/*
|--------------------------------------------------------------------------
| Single User
|--------------------------------------------------------------------------
*/

router.get(
    "/:id",
    permission("user:view"),
    controller.getUser
);

/*
|--------------------------------------------------------------------------
| Create User
|--------------------------------------------------------------------------
*/

router.post(
    "/",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("user:create"),
    validate(createUserSchema),
    controller.createUser
);

/*
|--------------------------------------------------------------------------
| Update User
|--------------------------------------------------------------------------
*/

router.put(
    "/:id",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("user:update"),
    validate(updateUserSchema),
    controller.updateUser
);

/*
|--------------------------------------------------------------------------
| Activate User
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/activate",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("user:update"),
    controller.activateUser
);

/*
|--------------------------------------------------------------------------
| Suspend User
|--------------------------------------------------------------------------
*/

router.patch(
    "/:id/suspend",
    authorize("SUPER_ADMIN", "ADMIN"),
    permission("user:update"),
    controller.suspendUser
);

/*
|--------------------------------------------------------------------------
| Delete User
|--------------------------------------------------------------------------
*/

router.delete(
    "/:id",
    authorize("SUPER_ADMIN"),
    permission("user:delete"),
    controller.deleteUser
);

export default router;

import { Router } from "express";
import customerController from "../controllers/customer.controller.js";
import { authenticate } from "../../../middleware/authenticate.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Customer Profile & Dashboard
|--------------------------------------------------------------------------
*/
router.get("/profile", authenticate, customerController.getProfile);
router.put("/profile", authenticate, customerController.updateProfile);
router.get("/dashboard", authenticate, customerController.getDashboard);

export default router;

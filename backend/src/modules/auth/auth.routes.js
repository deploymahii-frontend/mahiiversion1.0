import { Router } from "express";
import { signup, login } from "./auth.controller.js";
import { validate } from "../../shared/validation/validate.middleware.js";
import {
  signupSchema,
  loginSchema,
} from "./auth.validation.js";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;

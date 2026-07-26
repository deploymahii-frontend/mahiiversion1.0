import express from "express";

import AuthController from "./controllers/auth.controller.js";

import {
  signupSchema,
  loginSchema,
} from "./auth.validation.js";

import { validate } from "../../middleware/validate.middleware.js";

import { authenticate } from "./middleware/auth.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/signup",
  validate(signupSchema),
  AuthController.signup
);

router.post(
  "/login",
  validate(loginSchema),
  AuthController.login
);

router.post(
  "/refresh",
  AuthController.refreshToken
);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/logout",
  authenticate,
  AuthController.logout
);

export default router;

import express from "express";

import AuthController from "./controllers/auth.controller.js";

import {
  signupSchema,
  loginSchema,
} from "./auth.validation.js";

import { validate } from "../../middleware/validate.middleware.js";

import { authenticate } from "./middleware/auth.middleware.js";
import { verifyFirebaseAuth } from "../../middleware/firebaseAuth.middleware.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/signup",
  validate(signupSchema),
  (req, res, next) => AuthController.signup(req, res, next)
);

router.post(
  "/login",
  validate(loginSchema),
  (req, res, next) => AuthController.login(req, res, next)
);

router.post(
  "/refresh",
  (req, res, next) => AuthController.refreshToken(req, res, next)
);

// Dev-only activation endpoint (enable only when NODE_ENV !== 'production')
if (process.env.NODE_ENV !== 'production') {
  router.post(
    "/dev/activate",
    (req, res, next) => AuthController.activateUser(req, res, next)
  );
}

router.post(
  "/firebase-sync",
  verifyFirebaseAuth,
  (req, res, next) => AuthController.firebaseSync(req, res, next)
);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/logout",
  authenticate,
  (req, res, next) => AuthController.logout(req, res, next)
);

export default router;

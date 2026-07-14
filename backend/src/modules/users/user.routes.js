import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";

const router = Router();

router.get("/me", authenticate, (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

export default router;

import express from "express";

import { health } from "./controllers/health.controller.js";

const router = express.Router();

router.get("/health", health);

router.get("/ready", health);

router.get("/live", health);

export default router;

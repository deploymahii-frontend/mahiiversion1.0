import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import routes from "./routes/index.js";
import businessRoutes from "./modules/business/business.routes.js";
import catalogRoutes from "./modules/catalog/catalog.routes.js";
import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.set("trust proxy", true);

/* Security */
app.use(helmet());

/* Compression */
app.use(compression());

/* Logger */
app.use(morgan("dev"));

/* Body Parser */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* Cookies */
app.use(cookieParser());

/* CORS */
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

/* Rate Limit */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

app.use(limiter);

/* Root Health Check — required by Render.com */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Mahii API is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

/* API */
app.use("/api/v1", routes);
app.use("/api/v1/businesses", businessRoutes);
app.use("/api/v1/catalog", catalogRoutes);

/* 404 */
app.use(notFound);

/* Error */
app.use(errorHandler);

// Serve static files (frontend build)
// path imported earlier (duplicate removed)
const staticPath = path.resolve(__dirname, "../../frontend/dist");
app.use(express.static(staticPath));

// Fallback for SPA routes – serve index.html
app.use((req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});
export default app;

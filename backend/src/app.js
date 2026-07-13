import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import routes from "./routes/index.js";
import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

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

/* API */
app.use("/api/v1", routes);

/* 404 */
app.use(notFound);

/* Error */
app.use(errorHandler);

export default app;

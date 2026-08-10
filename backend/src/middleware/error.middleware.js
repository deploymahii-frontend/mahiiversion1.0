export default function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === "production";

  // Log full error in non-production
  if (!isProduction) {
    console.error(`[${new Date().toISOString()}] ${err.name || "Error"}: ${err.message}`, err.stack || "");
  } else {
    console.error(`[${new Date().toISOString()}] ${err.name || "Error"} (${status}): ${err.message}`);
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors || {}).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // Mongoose duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {}).join(", ") || "field";
    return res.status(409).json({
      success: false,
      message: `Duplicate value for: ${field}. Please use a different value.`,
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: err.name === "TokenExpiredError" ? "Session expired. Please log in again." : "Invalid or malformed token.",
    });
  }

  // Mongoose CastError (bad ObjectId)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(isProduction ? {} : { stack: err.stack }),
  });
}

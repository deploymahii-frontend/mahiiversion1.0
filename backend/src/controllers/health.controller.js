export const health = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Mahii API is running",
    version: "1.0.0",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};

import config from "./config/server.config.js";
import app from "./app.js";
import connectDB from "./config/mongodb.js";

async function startServer() {
  app.listen(config.app.port, () => {
    console.log("===================================");
    console.log("🚀 Mahii API Started");
    console.log(`🌐 Environment : ${config.app.env}`);
    console.log(`🚪 Port        : ${config.app.port}`);
    console.log(`📌 Version     : ${config.app.version}`);
    console.log("===================================");
  });

  connectDB().catch((error) => {
    console.error("❌ MongoDB Connection Error:", error.message);
  });
}

startServer().catch((error) => {
  console.error("❌ Server startup failed");
  console.error(error.message);
  process.exit(1);
});

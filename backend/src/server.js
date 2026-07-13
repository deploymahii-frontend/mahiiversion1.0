import app from "./app.js";
import config from "./config/server.config.js";
import { connectDatabase } from "./database/mongodb.js";

async function startServer() {
  await connectDatabase();

  app.listen(config.app.port, () => {
    console.log("===================================");
    console.log("🚀 Mahii API Started");
    console.log(`🌐 Environment : ${config.app.env}`);
    console.log(`🚪 Port        : ${config.app.port}`);
    console.log(`📌 Version     : ${config.app.version}`);
    console.log("===================================");
  });
}

startServer().catch((error) => {
  console.error("❌ Server startup failed");
  console.error(error.message);
  process.exit(1);
});

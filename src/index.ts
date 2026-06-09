import { server } from "./server";
import { config } from "./core/config";
import { prisma } from "./lib/prisma";
import { redis } from "./lib/redis";

const app = server.listen(config.port);

console.log(
  `🚀 Glory Backend is running in ${config.env} mode at http://${app.server?.hostname}:${app.server?.port}`,
);

async function gracefulShutdown(signal: string) {
  console.log(`\n⚠️  Received ${signal}, shutting down gracefully...`);

  try {
    app.server?.stop(true);
    await prisma.$disconnect();
    await redis.quit();
    console.log("✅ Server shut down cleanly.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error during shutdown:", err);
    process.exit(1);
  }
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
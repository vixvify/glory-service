import { createClient } from "redis";
import { config } from "../core/config";

export const redis = createClient({
  url: config.redisUrl,
});

redis.on("error", (err) => {
  console.error("Redis Error:", err);
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("reconnecting", () => {
  console.log("Redis reconnecting");
});

redis.on("end", () => {
  console.log("Redis disconnected");
});

export const redisReady = redis.connect().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error("Redis connection failed:", message);
});

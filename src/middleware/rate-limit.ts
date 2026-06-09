import { redis } from "../lib/redis";
import { RateLimiterRedis } from "rate-limiter-flexible";

export const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "rl",
  points: 100,
  duration: 60,
});

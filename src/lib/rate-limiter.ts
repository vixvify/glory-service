import { RateLimiterRedis } from "rate-limiter-flexible";
import { redis } from "./redis";

export const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "rl",
  points: 100,
  duration: 60,
});

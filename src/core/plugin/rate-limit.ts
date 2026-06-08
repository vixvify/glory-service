import { Elysia } from "elysia";
import { rateLimiter } from "../../middleware/rate-limit";

export const rateLimitPlugin = new Elysia().onBeforeHandle(
  async ({ request, set }) => {
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";

    try {
      await rateLimiter.consume(ip);
    } catch {
      set.status = 429;

      return {
        message: "Too Many Requests",
      };
    }
  },
);

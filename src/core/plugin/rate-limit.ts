import { Elysia } from "elysia";
import { rateLimiter } from "../../lib/rate-limiter";

export const rateLimitPlugin = new Elysia().onBeforeHandle(
  async ({ request, set }) => {
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";

    try {
      await rateLimiter.consume(ip);
    } catch {
      set.status = 429;

      return {
        data: null,
        error: "Too Many Requests",
        status: 429,
        statusCode: "TOO_MANY_REQUESTS",
      };
    }
  },
);

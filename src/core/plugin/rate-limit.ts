import { Elysia } from "elysia";
import { rateLimiter } from "../../lib/rate-limiter";

export const rateLimitPlugin = new Elysia().onBeforeHandle(
  async ({ request, set }) => {
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";

    try {
      await rateLimiter.consume(ip);
    } catch (error: any) {
      if (error && typeof error === "object" && "msBeforeNext" in error) {
        set.status = 429;
        return {
          data: null,
          error: "Too Many Requests",
          status: 429,
          statusCode: "TOO_MANY_REQUESTS",
        };
      }

      console.error(
        "[RateLimit] Rate limiter failed (likely Redis connection issue):",
        error,
      );
    }
  },
);

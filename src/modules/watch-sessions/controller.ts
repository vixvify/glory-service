import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { watchSessionService } from "../../lib/container";
import { formatSuccess } from "../../core/interceptor";
import { createWatchSessionBodySchema } from "./domain/watch-session";

export const watchSessionRouter = new Elysia({ prefix: "/watch-sessions" })
  .use(authMiddleware)
  .post(
    "/",
    async ({ body, user, set }) => {
      set.status = 201;
      const session = await watchSessionService.recordSession(body, user!.id);
      return formatSuccess(session, "CREATED", 201);
    },
    {
      requireAuth: true,
      body: createWatchSessionBodySchema,
    },
  );

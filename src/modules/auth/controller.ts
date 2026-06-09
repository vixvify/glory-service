import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { authService } from "../../lib/container";
import { formatSuccess } from "../../core/interceptor";
import { registerUserBodySchema, loginUserBodySchema } from "./domain/auth";
import { config } from "../../core/config";

export const authRouter = new Elysia({ prefix: "/auth" })
  .use(authMiddleware)
  .post(
    "/register",
    async ({ body }) => {
      const user = await authService.register(body);
      return formatSuccess(user);
    },
    {
      body: registerUserBodySchema,
    },
  )
  .post(
    "/login",
    async ({ body, cookie: { auth_token } }) => {
      const { token, ...safeUser } = await authService.login(body);

      const prod = config.env === "production";
      auth_token.set({
        value: token,
        httpOnly: true,
        path: "/",
        secure: prod,
        sameSite: prod ? "none" : "lax",
        maxAge: 86400,
      });

      return formatSuccess(safeUser);
    },
    {
      body: loginUserBodySchema,
    },
  )
  .post("/logout", async ({ cookie: { auth_token } }) => {
    auth_token.remove();
    return formatSuccess(null);
  })
  .get(
    "/me",
    async ({ user }) => {
      const fullUser = await authService.me(user!.id);
      return formatSuccess(fullUser);
    },
    {
      requireAuth: true,
    },
  );

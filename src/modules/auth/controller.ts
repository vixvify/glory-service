import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { AuthRepositoryImpl } from "../../infrastructure/auth.repository";
import { CrewMemberRepositoryImpl } from "../../infrastructure/crew-member.repository";
import { AuthService } from "./service";
import { formatSuccess } from "../../core/interceptor";
import {
  registerUserBodySchema,
  loginUserBodySchema,
  User,
} from "./domain/auth";
import { config } from "../../core/config";

const repo = new AuthRepositoryImpl();
const crewMemberRepo = new CrewMemberRepositoryImpl();
const service = new AuthService(repo, crewMemberRepo);

export const authRouter = new Elysia({ prefix: "/auth" })
  .use(authMiddleware)
  .post(
    "/register",
    async ({ body }) => {
      const user = await service.register(body);
      return formatSuccess(user, "User registered successfully");
    },
    {
      body: registerUserBodySchema,
    },
  )
  .post(
    "/login",
    async ({ body, cookie: { auth_token } }) => {
      const { token, ...safeUser } = await service.login(body);

      const isProd = config.env === "production";
      auth_token.set({
        value: token,
        httpOnly: true,
        path: "/",
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
        maxAge: 86400,
      });

      return formatSuccess(safeUser, "Logged in successfully");
    },
    {
      body: loginUserBodySchema,
    },
  )
  .post("/logout", async ({ cookie: { auth_token } }) => {
    auth_token.remove();
    return formatSuccess(null, "Logged out successfully");
  })
  .get(
    "/me",
    async ({ user }) => {
      return formatSuccess(user as User);
    },
    {
      requireAuth: true,
    },
  );

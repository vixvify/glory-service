import { Elysia } from "elysia";
import { AuthRepositoryImpl } from "../infrastructure/auth.repository";
import { AuthService } from "../modules/auth/service";
import { UnauthorizedError, ForbiddenError } from "../core/error";
import { User } from "../modules/auth/domain/auth";

const repo = new AuthRepositoryImpl();
const service = new AuthService(repo);

type Role = "admin" | "user";

const hasRole = (userRole: Role, requiredRoles?: Role | Role[]) => {
  if (!requiredRoles) return true;

  if (Array.isArray(requiredRoles)) {
    return requiredRoles.includes(userRole);
  }

  return userRole === requiredRoles;
};

export const authMiddleware = new Elysia({ name: "auth-middleware" })
  .derive({ as: "global" }, async ({ request, cookie: { auth_token } }) => {
    let token = auth_token.value as string | undefined;

    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    if (!token) {
      return { user: null };
    }

    try {
      const user = await service.verifyToken(token);
      return { user };
    } catch (error) {
      return { user: null };
    }
  })
  .macro(({ onBeforeHandle }) => ({
    requireAuth(required = true) {
      if (!required) return;

      onBeforeHandle(({ user }: { user?: User | null }) => {
        if (!user) {
          throw new UnauthorizedError("Unauthorized");
        }
      });
    },

    requireRole(role: Role | Role[]) {
      onBeforeHandle(({ user }: { user?: User | null }) => {
        if (!user) {
          throw new UnauthorizedError("Unauthorized");
        }

        const roles = Array.isArray(role) ? role : [role];

        if (!roles.includes(user.role as Role)) {
          throw new ForbiddenError("Forbidden");
        }
      });
    },
  }));

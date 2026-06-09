import { Elysia } from "elysia";
import { authService, movieService, crewMemberService } from "../lib/container";
import { UnauthorizedError, ForbiddenError } from "../core/error";
import { User } from "../modules/auth/domain/auth";

type Role = "admin" | "user";

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
      const user = await authService.verifyToken(token);
      return { user };
    } catch {
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
        if (!roles.includes(user.role)) {
          throw new ForbiddenError("Forbidden");
        }
      });
    },

    requireMovieOwner() {
      onBeforeHandle(
        async ({
          params,
          user,
        }: {
          params: { id: string };
          user?: User | null;
        }) => {
          if (!user) {
            throw new UnauthorizedError("Unauthorized");
          }

          const movie = await movieService.getMovieById(
            (params as { id: string }).id,
          );

          if (movie.createdBy !== user.id && user.role !== "admin") {
            throw new ForbiddenError("You do not have permission");
          }
        },
      );
    },

    requireCrewMemberOwner() {
      onBeforeHandle(
        async ({
          params,
          user,
        }: {
          params: { id: string };
          user?: User | null;
        }) => {
          if (!user) {
            throw new UnauthorizedError("Unauthorized");
          }

          const crewMember = await crewMemberService.getCrewMemberById(
            (params as { id: string }).id,
          );

          if (crewMember.createdBy !== user.id && user.role !== "admin") {
            throw new ForbiddenError("You do not have permission");
          }
        },
      );
    },
  }));

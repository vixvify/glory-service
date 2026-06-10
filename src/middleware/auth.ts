import { Elysia } from "elysia";
import { authService, movieService, crewMemberService } from "../lib/container";
import { UnauthorizedError, ForbiddenError, BadRequestError } from "../core/error";
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
  .macro({
    requireAuth(required = true) {
      return {
        beforeHandle({ user }: { user?: User | null }) {
          if (required && !user) {
            throw new UnauthorizedError("Unauthorized");
          }
        }
      };
    },

    requireRole(role: Role | Role[]) {
      return {
        beforeHandle({ user }: { user?: User | null }) {
          if (!user) {
            throw new UnauthorizedError("Unauthorized");
          }

          const roles = Array.isArray(role) ? role : [role];
          if (!roles.includes(user.role)) {
            throw new ForbiddenError("Forbidden");
          }
        }
      };
    },

    requireMovieOwner() {
      return {
        async beforeHandle({
          params,
          user,
        }: {
          params: Record<string, string | undefined>;
          user?: User | null;
        }) {
          if (!user) {
            throw new UnauthorizedError("Unauthorized");
          }

          const id = params.id;
          if (!id) {
            throw new BadRequestError("Invalid movie ID");
          }

          const movie = await movieService.getMovieById(id);

          if (movie.createdBy !== user.id && user.role !== "admin") {
            throw new ForbiddenError("You do not have permission");
          }
        }
      };
    },

    requireCrewMemberOwner() {
      return {
        async beforeHandle({
          params,
          user,
        }: {
          params: Record<string, string | undefined>;
          user?: User | null;
        }) {
          if (!user) {
            throw new UnauthorizedError("Unauthorized");
          }

          const id = params.id;
          if (!id) {
            throw new BadRequestError("Invalid crew member ID");
          }

          const crewMember = await crewMemberService.getCrewMemberById(id);

          if (crewMember.createdBy !== user.id && user.role !== "admin") {
            throw new ForbiddenError("You do not have permission");
          }
        }
      };
    },
  });

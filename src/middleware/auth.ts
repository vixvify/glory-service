import { Elysia } from "elysia";
import { AuthRepositoryImpl } from "../infrastructure/auth.repository";
import { CrewMemberRepositoryImpl } from "../infrastructure/crew-member.repository";
import { AuthService } from "../modules/auth/service";
import { UnauthorizedError, ForbiddenError } from "../core/error";
import { User } from "../modules/auth/domain/auth";
import { MovieService } from "../modules/movies/service";
import { MovieRepositoryImpl } from "../infrastructure/movie.repository";
import { CrewMemberService } from "../modules/crew-members/service";

const repo = new AuthRepositoryImpl();
const crewMemberRepo = new CrewMemberRepositoryImpl();
const service = new AuthService(repo, crewMemberRepo);
const movieService = new MovieService(new MovieRepositoryImpl());
const crewMemberService = new CrewMemberService(crewMemberRepo, repo);
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
  }))
  .macro(({ onBeforeHandle }) => ({
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
  }))
  .macro(({ onBeforeHandle }) => ({
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

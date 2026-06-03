import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { MovieRepositoryImpl } from "../../infrastructure/movie.repository";
import { MasterDataRepositoryImpl } from "../../infrastructure/masterdata.repository";
import { CrewMemberRepositoryImpl } from "../../infrastructure/crew-member.repository";
import { AdminService } from "./service";
import { formatSuccess } from "../../core/interceptor";

const movieRepo = new MovieRepositoryImpl();
const masterDataRepo = new MasterDataRepositoryImpl();
const crewMemberRepo = new CrewMemberRepositoryImpl();
const service = new AdminService(movieRepo, masterDataRepo, crewMemberRepo);

export const adminRouter = new Elysia({ prefix: "/admin" })
  .use(authMiddleware)
  .get(
    "/stats",
    async () => {
      const stats = await service.getStats();
      return formatSuccess(stats);
    },
    {
      requireAuth: true,
      requireRole: "admin",
    }
  );

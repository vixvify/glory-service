import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { AdminRepositoryImpl } from "../../infrastructure/admin.repository";
import { AdminService } from "./service";
import { formatSuccess } from "../../core/interceptor";

const repo = new AdminRepositoryImpl();
const service = new AdminService(repo);

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

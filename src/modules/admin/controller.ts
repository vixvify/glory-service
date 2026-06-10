import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { adminService } from "../../lib/container";
import { formatSuccess } from "../../core/interceptor";

export const adminRouter = new Elysia({ prefix: "/admin" })
  .use(authMiddleware)
  .get(
    "/stats",
    async () => {
      const stats = await adminService.getStats();
      return formatSuccess(stats);
    },
    // {
    //   requireAuth: true,
    //   requireRole: "admin",
    // },
  );

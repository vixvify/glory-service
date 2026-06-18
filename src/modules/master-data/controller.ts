import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { masterDataService } from "../../lib/container";
import { formatSuccess } from "../../core/interceptor";

export const masterDataRouter = new Elysia({ prefix: "/masterdata" })
  .use(authMiddleware)
  .get("/categories", async () => {
    const categories = await masterDataService.getCategories();
    return formatSuccess(categories);
  })
  .get("/universities", async () => {
    const universities = await masterDataService.getUniversities();
    return formatSuccess(universities);
  })
  .get("/crew-roles", async () => {
    const crewRoles = await masterDataService.getCrewRoles();
    return formatSuccess(crewRoles);
  })
  .get("/active-university", async () => {
    const university = await masterDataService.getMostActiveUniversity();
    return formatSuccess(university);
  });

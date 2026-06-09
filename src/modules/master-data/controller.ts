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
  .get("/age-ratings", async () => {
    const ratings = await masterDataService.getAgeRatings();
    return formatSuccess(ratings);
  })
  .get("/languages", async () => {
    const languages = await masterDataService.getLanguages();
    return formatSuccess(languages);
  })
  .get("/target-groups", async () => {
    const targetGroups = await masterDataService.getTargetGroups();
    return formatSuccess(targetGroups);
  })
  .get("/crew-roles", async () => {
    const crewRoles = await masterDataService.getCrewRoles();
    return formatSuccess(crewRoles);
  });

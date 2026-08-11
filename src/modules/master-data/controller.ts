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
  .get("/schools", async () => {
    const schools = await masterDataService.getSchools();
    return formatSuccess(schools);
  })
  .get("/languages", async () => {
    const languages = await masterDataService.getLanguages();
    return formatSuccess(languages);
  })
  .get("/subtitles", async () => {
    const subtitles = await masterDataService.getSubtitles();
    return formatSuccess(subtitles);
  })
  .get("/color-types", async () => {
    const colorTypes = await masterDataService.getColorTypes();
    return formatSuccess(colorTypes);
  })
  .get("/content-warnings", async () => {
    const contentWarnings = await masterDataService.getContentWarnings();
    return formatSuccess(contentWarnings);
  })
  .get("/age-ratings", async () => {
    const ageRatings = await masterDataService.getAgeRatings();
    return formatSuccess(ageRatings);
  })
  .get("/crew-roles", async () => {
    const crewRoles = await masterDataService.getCrewRoles();
    return formatSuccess(crewRoles);
  })
  .get("/active-university", async () => {
    const university = await masterDataService.getMostActiveUniversity();
    return formatSuccess(university);
  });

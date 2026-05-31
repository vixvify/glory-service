import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { MasterDataRepositoryImpl } from "../../infrastructure/masterdata.repository";
import { MasterDataService } from "./service";
import { formatSuccess } from "../../core/interceptor";

const repo = new MasterDataRepositoryImpl();
const service = new MasterDataService(repo);

export const masterDataRouter = new Elysia({ prefix: "/masterdata" })
  .use(authMiddleware)
  .get("/categories", async () => {
    const categories = await service.getCategories();
    return formatSuccess(categories);
  })
  .get("/universities", async () => {
    const universities = await service.getUniversities();
    return formatSuccess(universities);
  })
  .get("/ratings", async () => {
    const ratings = await service.getAgeRatings();
    return formatSuccess(ratings);
  });

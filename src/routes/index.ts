import { Elysia } from "elysia";
import { authRouter } from "../modules/auth/controller";
import { movieRouter } from "../modules/movies/controller";
import { masterDataRouter } from "../modules/master-data/controller";
import { ratingRouter } from "../modules/ratings/controller";
import { favoriteRouter } from "../modules/favorites/controller";
import { crewMemberRouter } from "../modules/crew-members/controller";
import { adminRouter } from "../modules/admin/controller";

export const apiRouter = new Elysia({ prefix: "/api" })
  .use(authRouter)
  .use(movieRouter)
  .use(masterDataRouter)
  .use(ratingRouter)
  .use(favoriteRouter)
  .use(crewMemberRouter)
  .use(adminRouter);

import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { FavoriteRepositoryImpl } from "../../infrastructure/favorite.repository";
import { FavoriteService } from "./service";
import { formatSuccess } from "../../core/interceptor";
import {
  addFavoriteBodySchema,
  removeFavoriteParamsSchema,
} from "./domain/favorite";

const repo = new FavoriteRepositoryImpl();
const service = new FavoriteService(repo);

export const favoriteRouter = new Elysia({ prefix: "/movie/favorites" })
  .use(authMiddleware)
  .get(
    "/",
    async ({ user }) => {
      const favoriteMovies = await service.getUserFavorites(user!.id);
      return formatSuccess(favoriteMovies);
    },
    {
      requireAuth: true,
    },
  )
  .post(
    "/",
    async ({ user, body }) => {
      const { movieId } = body;
      await service.addMovieToFavorites(user!.id, movieId);
      return formatSuccess(null, "Movie added to favorites");
    },
    {
      requireAuth: true,
      body: addFavoriteBodySchema,
    },
  )
  .delete(
    "/:movieId",
    async ({ user, params }) => {
      const { movieId } = params;
      await service.removeMovieFromFavorites(user!.id, movieId);
      return formatSuccess(null, "Movie removed from favorites");
    },
    {
      requireAuth: true,
      params: removeFavoriteParamsSchema,
    },
  );

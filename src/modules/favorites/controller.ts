import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { favoriteService } from "../../lib/container";
import { formatSuccess } from "../../core/interceptor";
import {
  addFavoriteBodySchema,
  removeFavoriteParamsSchema,
} from "./domain/favorite";

export const favoriteRouter = new Elysia({ prefix: "/movie/favorites" })
  .use(authMiddleware)
  .get(
    "/",
    async ({ user }) => {
      const favoriteMovies = await favoriteService.getUserFavorites(user!.id);
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
      await favoriteService.addMovieToFavorites(user!.id, movieId);
      return formatSuccess(null);
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
      await favoriteService.removeMovieFromFavorites(user!.id, movieId);
      return formatSuccess(null);
    },
    {
      requireAuth: true,
      params: removeFavoriteParamsSchema,
    },
  );

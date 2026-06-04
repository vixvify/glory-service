import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { FavoriteRepositoryImpl } from "../../infrastructure/favorite.repository";
import { MovieRepositoryImpl } from "../../infrastructure/movie.repository";
import { FavoriteService } from "./service";
import { formatSuccess } from "../../core/interceptor";
import {
  addFavoriteBodySchema,
  removeFavoriteParamsSchema,
} from "./domain/favorite";

const repo = new FavoriteRepositoryImpl();
const movieRepo = new MovieRepositoryImpl();
const service = new FavoriteService(repo, movieRepo);

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
      await service.removeMovieFromFavorites(user!.id, movieId);
      return formatSuccess(null);
    },
    {
      requireAuth: true,
      params: removeFavoriteParamsSchema,
    },
  );

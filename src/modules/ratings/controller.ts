import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { ratingService } from "../../lib/container";
import { formatSuccess } from "../../core/interceptor";
import {
  addRatingBodySchema,
  getRatingsQuerySchema,
  deleteRatingBodySchema,
  checkRatingQuerySchema,
  updateRatingBodySchema,
} from "./domain/rating";

export const ratingRouter = new Elysia({ prefix: "/movie/ratings" })
  .use(authMiddleware)
  .post(
    "/",
    async ({ body, user }) => {
      const { movieId, stars, comment } = body;
      await ratingService.addRating({
        userId: user!.id,
        movieId,
        stars,
        comment,
      });
      return formatSuccess(null);
    },
    {
      body: addRatingBodySchema,
      requireAuth: true,
    },
  )
  .get(
    "/",
    async ({ query, user }) => {
      const rating = await ratingService.getRatingsByUserIdAndMovieId({
        userId: user!.id,
        movieId: query.movieId,
      });
      return formatSuccess(rating);
    },
    {
      query: getRatingsQuerySchema,
      requireAuth: true,
    },
  )
  .delete(
    "/",
    async ({ body, user }) => {
      const { movieId } = body;
      await ratingService.deleteRating(user!.id, movieId);
      return formatSuccess(null);
    },
    {
      body: deleteRatingBodySchema,
      requireAuth: true,
    },
  )
  .get(
    "/check",
    async ({ query, user }) => {
      const { movieId } = query;
      const rating = await ratingService.checkRating(user!.id, movieId);
      return formatSuccess(rating);
    },
    {
      query: checkRatingQuerySchema,
      requireAuth: true,
    },
  )
  .put(
    "/",
    async ({ body, user }) => {
      const { movieId, stars, comment } = body;
      await ratingService.updateRating({
        userId: user!.id,
        movieId,
        stars,
        comment,
      });
      return formatSuccess(null);
    },
    {
      body: updateRatingBodySchema,
      requireAuth: true,
    },
  );

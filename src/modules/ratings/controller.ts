import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { RatingRepositoryImpl } from "../../infrastructure/rating.repository";
import { RatingService } from "./service";
import { formatSuccess } from "../../core/interceptor";
import {
  addRatingBodySchema,
  getRatingsQuerySchema,
  deleteRatingBodySchema,
  checkRatingQuerySchema,
  updateRatingBodySchema,
} from "./domain/rating";

const repo = new RatingRepositoryImpl();
const service = new RatingService(repo);

export const ratingRouter = new Elysia({ prefix: "/movie/ratings" })
  .use(authMiddleware)
  .post(
    "/",
    async ({ body, user }) => {
      await service.addRating({
        userId: user!.id,
        movieId: body.movieId,
        stars: body.stars,
        comment: body.comment,
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
      const rating = await service.getRatingsByUserIdAndMovieId({
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
      await service.deleteRating(user!.id, body.movieId);
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
      const rating = await service.checkRating(user!.id, movieId);
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
      await service.updateRating({
        userId: user!.id,
        movieId: body.movieId,
        stars: body.stars,
        comment: body.comment,
      });
      return formatSuccess(null);
    },
    {
      body: updateRatingBodySchema,
      requireAuth: true,
    },
  );

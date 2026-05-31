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
    async ({ body }) => {
      await service.addRating(body);
      return formatSuccess(null, "Rating added successfully");
    },
    {
      body: addRatingBodySchema,
      requireAuth: true,
    },
  )
  .get(
    "/",
    async ({ query }) => {
      const ratings = await service.getRatingsByUserIdAndMovieId(query);
      return formatSuccess(ratings);
    },
    {
      query: getRatingsQuerySchema,
      requireAuth: true,
    },
  )
  .delete(
    "/",
    async ({ body }) => {
      await service.deleteRating(body.userId, body.movieId);
      return formatSuccess(null, "Rating deleted successfully");
    },
    {
      body: deleteRatingBodySchema,
      requireAuth: true,
    },
  )
  .get(
    "/check",
    async ({ query }) => {
      const { userId, movieId } = query;
      const rating = await service.checkRating(userId, movieId);
      return formatSuccess(rating);
    },
    {
      query: checkRatingQuerySchema,
      requireAuth: true,
    },
  )
  .put(
    "/",
    async ({ body }) => {
      await service.updateRating(body);
      return formatSuccess(null, "Rating updated successfully");
    },
    {
      body: updateRatingBodySchema,
      requireAuth: true,
    },
  );

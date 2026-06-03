import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { MovieRepositoryImpl } from "../../infrastructure/movie.repository";
import { MovieService } from "./service";
import { formatSuccess } from "../../core/interceptor";
import {
  createMovieBodySchema,
  updateMovieParamsSchema,
  updateMovieBodySchema,
  getMovieByIdParamsSchema,
  getMoviesByCategoryParamsSchema,
  getMoviesByUniversityParamsSchema,
  deleteMovieParamsSchema,
  getMoviesQuerySchema,
} from "./domain/movie";

const repo = new MovieRepositoryImpl();
const service = new MovieService(repo);

export const movieRouter = new Elysia({ prefix: "/movie" })
  .use(authMiddleware)
  .get(
    "/",
    async ({ query }) => {
      const movies = await service.getMovies(query);
      return formatSuccess(movies);
    },
    {
      query: getMoviesQuerySchema,
    },
  )

  .get(
    "/category/:category",
    async ({ params }) => {
      const { category } = params;
      const movies = await service.getMoviesByCategory(category);
      return formatSuccess(movies);
    },
    {
      params: getMoviesByCategoryParamsSchema,
    },
  )
  .get(
    "/university/:university",
    async ({ params }) => {
      const { university } = params;
      const movies = await service.getMoviesByUniversity(university);
      return formatSuccess(movies);
    },
    {
      params: getMoviesByUniversityParamsSchema,
    },
  )
  .get(
    "/:id",
    async ({ params }) => {
      const { id } = params;
      const movie = await service.getMovieById(id);
      return formatSuccess(movie);
    },
    {
      params: getMovieByIdParamsSchema,
    },
  )
  .post(
    "/",
    async ({ body }) => {
      const movie = await service.createMovie(body);
      return formatSuccess(movie, "Movie created successfully");
    },
    {
      body: createMovieBodySchema,
      requireAuth: true,
    },
  )
  .put(
    "/:id",
    async ({ params, body }) => {
      const { id } = params;
      const payload = {
        ...body,
        year: Number(body.year),
        duration: Number(body.duration),
        matchRate: Number(body.matchRate),
      };
      const movie = await service.updateMovie(id, payload);
      return formatSuccess(movie, "Movie updated successfully");
    },
    {
      params: updateMovieParamsSchema,
      body: updateMovieBodySchema,
      requireAuth: true,
    },
  )
  .delete(
    "/:id",
    async ({ params }) => {
      const { id } = params;
      const movie = await service.deleteMovie(id);
      return formatSuccess(movie, "Movie deleted successfully");
    },
    {
      params: deleteMovieParamsSchema,
      requireAuth: true,
    },
  );

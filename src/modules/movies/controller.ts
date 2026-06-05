import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { MovieRepositoryImpl } from "../../infrastructure/movie.repository";
import { MovieBtsRepositoryImpl } from "../../infrastructure/movie-bts.repository";
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
const btsRepo = new MovieBtsRepositoryImpl();
const service = new MovieService(repo, btsRepo);

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
    "/my-movies",
    async ({ user }) => {
      const movies = await service.getMyMovies(user!.id);
      return formatSuccess(movies);
    },
    {
      requireAuth: true,
    },
  )
  .get(
    "/my-contributions",
    async ({ user }) => {
      const movies = await service.getContributedMovies(user!.id);
      return formatSuccess(movies);
    },
    {
      requireAuth: true,
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
    async ({ body, user }) => {
      const movie = await service.createMovie(body, user!.id);
      return formatSuccess(movie);
    },
    {
      body: createMovieBodySchema,
      requireAuth: true,
    },
  )
  .put(
    "/:id",
    async ({ params, body, user }) => {
      const { id } = params;
      const payload = {
        ...body,
        year: Number(body.year),
        duration: Number(body.duration),
      };
      const movie = await service.updateMovie(id, payload, user!.id, user!.role);
      return formatSuccess(movie);
    },
    {
      params: updateMovieParamsSchema,
      body: updateMovieBodySchema,
      requireAuth: true,
    },
  )
  .delete(
    "/:id",
    async ({ params, user }) => {
      const { id } = params;
      const movie = await service.deleteMovie(id, user!.id, user!.role);
      return formatSuccess(movie);
    },
    {
      params: deleteMovieParamsSchema,
      requireAuth: true,
    },
  );

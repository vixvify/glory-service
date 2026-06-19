import { Elysia } from "elysia";
import { authMiddleware } from "../../middleware/auth";
import { movieService } from "../../lib/container";
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

export const movieRouter = new Elysia({ prefix: "/movie" })
  .use(authMiddleware)
  .get(
    "/",
    async ({ query }) => {
      const movies = await movieService.getMovies(query);
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
      const movies = await movieService.getMoviesByCategory(category);
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
      const movies = await movieService.getMoviesByUniversity(university);
      return formatSuccess(movies);
    },
    {
      params: getMoviesByUniversityParamsSchema,
    },
  )
  .get(
    "/my-movies",
    async ({ user }) => {
      const movies = await movieService.getMyMovies(user!.id);
      return formatSuccess(movies);
    },
    {
      requireAuth: true,
    },
  )
  .get(
    "/my-contributions",
    async ({ user }) => {
      const movies = await movieService.getContributedMovies(user!.id);
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
      const movie = await movieService.getMovieById(id);
      return formatSuccess(movie);
    },
    {
      params: getMovieByIdParamsSchema,
    },
  )
  .get("/movies-with-award", async () => {
    const movies = await movieService.getMovieWithAward();
    return formatSuccess(movies);
  })
  .get("/movies-with-bts", async () => {
    const movies = await movieService.getMovieWithBts();
    return formatSuccess(movies);
  })
  .post(
    "/",
    async ({ body, user, set }) => {
      set.status = 201;
      const movie = await movieService.createMovie(body, user!.id);
      return formatSuccess(movie, "CREATED", 201);
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
      const movie = await movieService.updateMovie(id, body, user!.id);
      return formatSuccess(movie);
    },
    {
      params: updateMovieParamsSchema,
      body: updateMovieBodySchema,
      requireAuth: true,
      requireMovieOwner: true,
    },
  )
  .delete(
    "/:id",
    async ({ params }) => {
      const { id } = params;
      const movie = await movieService.deleteMovie(id);
      return formatSuccess(movie);
    },
    {
      params: deleteMovieParamsSchema,
      requireAuth: true,
      requireMovieOwner: true,
    },
  );

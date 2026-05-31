import { t, Static } from "elysia";
import { Rating } from "../../ratings/domain/rating";
import { User } from "../../auth/domain/auth";

export interface CrewMember {
  id: string;
  name: string;
  photoUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MovieCrew {
  id: string;
  movieId: string;
  crewMemberId: string;
  role: string;
  crewMember?: CrewMember;
  createdAt: Date;
  updatedAt: Date;
}

export interface MovieBts {
  id: string;
  movieId: string;
  btsVideo: string[];
  btsPhotos: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  youtubeUrl: string;
  views: number;
  ratings: Rating[];
  year: number;
  matchRate: number;
  ageRating: string;
  duration: number;
  university?: string | null;
  crew: MovieCrew[];
  bts?: MovieBts | null;
  createdAt: Date;
  updatedAt: Date;
}

export const createMovieBodySchema = t.Object({
  title: t.String(),
  description: t.String(),
  category: t.String(),
  thumbnail: t.File(),
  youtubeUrl: t.String(),
  year: t.Numeric(),
  duration: t.Numeric(),
  matchRate: t.Numeric(),
  ageRating: t.String(),
  university: t.Optional(t.String()),
  director: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  producer: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  writer: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  cast: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  btsVideo: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  btsPhotos: t.Optional(
    t.Union([t.File(), t.Array(t.File()), t.String(), t.Array(t.String())]),
  ),
});
export type CreateMovieBodyInput = Static<typeof createMovieBodySchema>;

export const updateMovieParamsSchema = t.Object({
  id: t.String({ format: "uuid" }),
});
export type UpdateMovieParamsInput = Static<typeof updateMovieParamsSchema>;

export const updateMovieBodySchema = t.Object({
  title: t.String(),
  description: t.String(),
  category: t.String(),
  thumbnail: t.Union([t.File(), t.String()]),
  youtubeUrl: t.String(),
  year: t.Numeric(),
  duration: t.Numeric(),
  matchRate: t.Numeric(),
  ageRating: t.String(),
  university: t.Optional(t.String()),
  director: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  producer: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  writer: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  cast: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  btsVideo: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  btsPhotos: t.Optional(
    t.Union([t.File(), t.Array(t.File()), t.String(), t.Array(t.String())]),
  ),
});
export type UpdateMovieBodyInput = Static<typeof updateMovieBodySchema>;

export const getMovieByIdParamsSchema = t.Object({
  id: t.String({ format: "uuid" }),
});
export type GetMovieByIdParamsInput = Static<typeof getMovieByIdParamsSchema>;

export const getMoviesByCategoryParamsSchema = t.Object({
  category: t.String(),
});
export type GetMoviesByCategoryParamsInput = Static<
  typeof getMoviesByCategoryParamsSchema
>;

export const getMoviesByUniversityParamsSchema = t.Object({
  university: t.String(),
});
export type GetMoviesByUniversityParamsInput = Static<
  typeof getMoviesByUniversityParamsSchema
>;

export const deleteMovieParamsSchema = t.Object({
  id: t.String({ format: "uuid" }),
});
export type DeleteMovieParamsInput = Static<typeof deleteMovieParamsSchema>;

export const searchMoviesQuerySchema = t.Object({
  q: t.Optional(t.String()),
});
export type SearchMoviesQueryInput = Static<typeof searchMoviesQuerySchema>;

export const getMoviesQuerySchema = t.Object({
  search: t.Optional(t.String()),
  searchby: t.Optional(t.String()),
  page: t.Optional(t.String()),
  pagenumber: t.Optional(t.String()),
  sort: t.Optional(t.String()),
  sortby: t.Optional(t.String()),
});
export type GetMoviesQueryInput = Static<typeof getMoviesQuerySchema>;

export interface MovieFilterParams {
  search?: string;
  searchby?: string;
  page?: number;
  pagenumber?: number;
  sort?: string;
  sortby?: string;
}



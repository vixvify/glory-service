import { t, Static } from "elysia";
import { Rating } from "../../ratings/domain/rating";
export interface CrewMember {
  id: string;
  name: string;
  email?: string | null;
  photoUrl?: string | null;
  userId?: string | null;
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
  trailerUrl?: string | null;
  views: number;
  ratings: Rating[];
  year: number;
  matchRate: number;
  ageRating: string;
  duration: number;
  university?: string | null;
  language?: string | null;
  targetGroup?: string | null;
  hasProfanity: boolean;
  hasDrugs: boolean;
  colorType: string;
  studio?: string | null;
  crew: MovieCrew[];
  bts?: MovieBts | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MovieRepositoryCreateInput {
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  trailerUrl?: string | null;
  category: string;
  year: number;
  duration: number;
  matchRate: number;
  ageRating: string;
  university?: string | null;
  language?: string | null;
  targetGroup?: string | null;
  hasProfanity?: boolean;
  hasDrugs?: boolean;
  colorType?: string;
  studio?: string | null;
}

export interface MovieRepositoryUpdateInput {
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  trailerUrl?: string | null;
  category: string;
  year: number;
  duration: number;
  matchRate: number;
  ageRating: string;
  university?: string | null;
  language?: string | null;
  targetGroup?: string | null;
  hasProfanity?: boolean;
  hasDrugs?: boolean;
  colorType?: string;
  studio?: string | null;
}

export const createMovieBodySchema = t.Object({
  title: t.String(),
  description: t.String(),
  category: t.String(),
  thumbnail: t.File(),
  youtubeUrl: t.String(),
  trailerUrl: t.Optional(t.String()),
  year: t.Numeric(),
  duration: t.Numeric(),
  matchRate: t.Numeric(),
  ageRating: t.String(),
  university: t.Optional(t.String()),
  language: t.Optional(t.String()),
  targetGroup: t.Optional(t.String()),
  hasProfanity: t.Optional(t.Union([t.Boolean(), t.String()])),
  hasDrugs: t.Optional(t.Union([t.Boolean(), t.String()])),
  colorType: t.String(),
  studio: t.Optional(t.String()),
  director: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  producer: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  writer: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  cast: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  dop: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  editor: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  btsVideo: t.Optional(t.Union([t.String(), t.Array(t.String())])),
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
  trailerUrl: t.Optional(t.String()),
  year: t.Numeric(),
  duration: t.Numeric(),
  matchRate: t.Numeric(),
  ageRating: t.String(),
  university: t.Optional(t.String()),
  language: t.Optional(t.String()),
  targetGroup: t.Optional(t.String()),
  hasProfanity: t.Optional(t.Union([t.Boolean(), t.String()])),
  hasDrugs: t.Optional(t.Union([t.Boolean(), t.String()])),
  colorType: t.String(),
  studio: t.Optional(t.String()),
  director: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  producer: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  writer: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  cast: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  dop: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  editor: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  btsVideo: t.Optional(t.Union([t.String(), t.Array(t.String())])),
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
  pagesize: t.Optional(t.String()),
  sort: t.Optional(t.String()),
  sortby: t.Optional(t.String()),
});
export type GetMoviesQueryInput = Static<typeof getMoviesQuerySchema>;

export interface MovieFilterParams {
  search?: string;
  searchby?: string;
  page?: number;
  pagesize?: number;
  sort?: string;
  sortby?: string;
}

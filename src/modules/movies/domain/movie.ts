import { t, Static } from "elysia";
import { Rating } from "../../ratings/domain/rating";
import { tArrayCoerce } from "../../../core/utils/parser";
import { User } from "../../auth/domain/auth";

export interface CrewMember {
  id: string;
  name: string;
  email?: string | null;
  userId?: string | null;
  user?: User | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface MovieCrew {
  id: string;
  movieId: string;
  crewMemberId: string;
  role: string;
  crewMember?: CrewMember;
  movie?: Movie;
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
  aspectRatio: string;
  ageRating: string;
  duration: number;
  university?: string | null;
  language?: string | null;
  targetGroup?: string | null;
  hasProfanity: boolean;
  hasDrugs: boolean;
  colorType: string;
  studio?: string | null;
  userId: string;
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
  aspectRatio: string;
  ageRating: string;
  university?: string | null;
  language?: string | null;
  targetGroup?: string | null;
  hasProfanity?: boolean;
  hasDrugs?: boolean;
  colorType?: string;
  studio?: string | null;
  userId: string;
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
  aspectRatio: string;
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
  aspectRatio: t.String({ pattern: "^\\d+:\\d+$" }),
  ageRating: t.String(),
  university: t.Optional(t.String()),
  language: t.Optional(t.String()),
  targetGroup: t.Optional(t.String()),
  hasProfanity: t.Optional(t.Union([t.Boolean(), t.String()])),
  hasDrugs: t.Optional(t.Union([t.Boolean(), t.String()])),
  colorType: t.String(),
  studio: t.Optional(t.String()),
  director: t.Optional(tArrayCoerce),
  producer: t.Optional(tArrayCoerce),
  writer: t.Optional(tArrayCoerce),
  cast: t.Optional(tArrayCoerce),
  dop: t.Optional(tArrayCoerce),
  editor: t.Optional(tArrayCoerce),
  btsVideo: t.Optional(tArrayCoerce),
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
  aspectRatio: t.String({ pattern: "^\\d+:\\d+$" }),
  ageRating: t.String(),
  university: t.Optional(t.String()),
  language: t.Optional(t.String()),
  targetGroup: t.Optional(t.String()),
  hasProfanity: t.Optional(t.Union([t.Boolean(), t.String()])),
  hasDrugs: t.Optional(t.Union([t.Boolean(), t.String()])),
  colorType: t.String(),
  studio: t.Optional(t.String()),
  director: t.Optional(tArrayCoerce),
  producer: t.Optional(tArrayCoerce),
  writer: t.Optional(tArrayCoerce),
  cast: t.Optional(tArrayCoerce),
  dop: t.Optional(tArrayCoerce),
  editor: t.Optional(tArrayCoerce),
  btsVideo: t.Optional(tArrayCoerce),
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
  userId: t.Optional(t.String()),
});
export type GetMoviesQueryInput = Static<typeof getMoviesQuerySchema>;

export interface MovieFilterParams {
  search?: string;
  searchby?: string;
  page?: number;
  pagesize?: number;
  sort?: string;
  sortby?: string;
  userId?: string;
}

export interface AssociateCrewBulkInput {
  movieId: string;
  directors: string[];
  producers: string[];
  writers: string[];
  cast: string[];
  dops: string[];
  editors: string[];
}

export const MovieUserSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  createdAt: true,
  photoUrl: true,
  motto: true,
  bio: true,
  ig: true,
  facebook: true,
  youtube: true,
  tiktok: true,
  positions: true,
  birthday: true,
  awards: true,
} as const;

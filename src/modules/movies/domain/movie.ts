import { t, Static } from "elysia";
import { Rating } from "../../ratings/domain/rating";
import {
  tArrayCoerce,
  tCrewInputCoerce,
  MovieCrewInputItemWithRole,
} from "../../../core/utils/transform/parser";
import { User } from "../../auth/domain/auth";
import { Prisma } from "@prisma/client";
import type { CrewMember } from "../../crew-members/domain/crew-member";
import { Category, CrewRole } from "../../master-data/domain/masterdata";

export enum ColorType {
  COLOR = "color",
  BLACK_AND_WHITE = "black_and_white",
  COLOR_AND_BLACK_AND_WHITE = "color_and_black_and_white",
}

export enum AgeRating {
  G = "G",
  PG = "PG",
  PG_13 = "PG-13",
  NC_17 = "NC-17",
  R = "R",
}

export interface MovieCrew {
  id: string;
  movieId: string;
  crewMemberId: string;
  roleId: string;
  role: string;
  crewRole?: CrewRole;
  crewMember?: CrewMember;
  movie?: Movie;
  createdAt: Date;
  updatedAt: Date;
}

export enum AspectRatio {
  LANDSCAPE = "landscape",
  PORTRAIT = "portrait",
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  category: Category;
  thumbnail: string;
  youtubeUrl: string;
  trailerUrl?: string | null;
  views: number;
  ratings: Rating[];
  releaseDate: Date;
  matchRate: number;
  averageRating: number;
  aspectRatio: string;
  ageRating: string;
  duration: number;
  university?: string | null;
  school?: string | null;
  language?: string | null;
  hasProfanity: boolean;
  hasDrugs: boolean;
  colorType: string;
  studio?: string | null;
  createdBy: string;
  creator?: User;
  crew: MovieCrew[];
  btsVideos: string[];
  createdAt: Date;
  updatedAt: Date;
  awards: string[];
}

export interface CreateMovieInput {
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  trailerUrl?: string | null;
  categoryId: string;
  releaseDate: Date;
  duration: number;
  matchRate: number;
  aspectRatio: string;
  ageRating: string;
  university?: string | null;
  school?: string | null;
  language?: string | null;
  hasProfanity?: boolean;
  hasDrugs?: boolean;
  colorType: string;
  studio?: string | null;
  createdBy: string;
  btsVideos?: string[];
  awards?: string[];
}

export interface UpdateMovieInput {
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  trailerUrl?: string | null;
  categoryId: string;
  releaseDate: Date;
  duration: number;
  matchRate: number;
  aspectRatio: string;
  ageRating: string;
  university?: string | null;
  school?: string | null;
  language?: string | null;
  hasProfanity?: boolean;
  hasDrugs?: boolean;
  colorType: string;
  studio?: string | null;
  btsVideos?: string[];
  awards?: string[];
}

export const createMovieBodySchema = t.Object({
  title: t.String(),
  description: t.String(),
  categoryId: t.String({ format: "uuid" }),
  thumbnail: t.File(),
  youtubeUrl: t.String(),
  trailerUrl: t.Optional(t.String()),
  releaseDate: t.String(),
  duration: t.Numeric(),
  aspectRatio: t.Union([t.Literal("landscape"), t.Literal("portrait")]),
  ageRating: t.String(),
  university: t.Optional(t.String()),
  school: t.Optional(t.String()),
  language: t.Optional(t.String()),
  hasProfanity: t.Optional(t.Union([t.Boolean(), t.String()])),
  hasDrugs: t.Optional(t.Union([t.Boolean(), t.String()])),
  colorType: t.Union([
    t.Literal("color"),
    t.Literal("black_and_white"),
    t.Literal("color_and_black_and_white"),
  ]),
  studio: t.Optional(t.String()),
  crew: t.Optional(tCrewInputCoerce),
  btsVideo: t.Optional(tArrayCoerce),
  awards: t.Optional(tArrayCoerce),
});
export type CreateMovieBodyDTO = Static<typeof createMovieBodySchema>;

export const updateMovieParamsSchema = t.Object({
  id: t.String({ format: "uuid" }),
});
export type UpdateMovieParamsDTO = Static<typeof updateMovieParamsSchema>;

export const updateMovieBodySchema = t.Object({
  title: t.String(),
  description: t.String(),
  categoryId: t.String({ format: "uuid" }),
  thumbnail: t.Union([t.File(), t.String()]),
  youtubeUrl: t.String(),
  trailerUrl: t.Optional(t.String()),
  releaseDate: t.String(),
  duration: t.Numeric(),
  aspectRatio: t.Union([t.Literal("landscape"), t.Literal("portrait")]),
  ageRating: t.String(),
  university: t.Optional(t.String()),
  school: t.Optional(t.String()),
  language: t.Optional(t.String()),
  hasProfanity: t.Optional(t.Union([t.Boolean(), t.String()])),
  hasDrugs: t.Optional(t.Union([t.Boolean(), t.String()])),
  colorType: t.Union([
    t.Literal("color"),
    t.Literal("black_and_white"),
    t.Literal("color_and_black_and_white"),
  ]),
  studio: t.Optional(t.String()),
  crew: t.Optional(tCrewInputCoerce),
  btsVideo: t.Optional(tArrayCoerce),
  awards: t.Optional(tArrayCoerce),
});
export type UpdateMovieBodyDTO = Static<typeof updateMovieBodySchema>;

export const getMovieByIdParamsSchema = t.Object({
  id: t.String({ format: "uuid" }),
});
export type GetMovieByIdParamsDTO = Static<typeof getMovieByIdParamsSchema>;

export const getMoviesByCategoryParamsSchema = t.Object({
  category: t.String(),
});
export type GetMoviesByCategoryParamsDTO = Static<
  typeof getMoviesByCategoryParamsSchema
>;

export const getMoviesByUniversityParamsSchema = t.Object({
  university: t.String(),
});
export type GetMoviesByUniversityParamsDTO = Static<
  typeof getMoviesByUniversityParamsSchema
>;

export const deleteMovieParamsSchema = t.Object({
  id: t.String({ format: "uuid" }),
});
export type DeleteMovieParamsDTO = Static<typeof deleteMovieParamsSchema>;

export const getMoviesQuerySchema = t.Object({
  search: t.Optional(t.String()),
  searchby: t.Optional(
    t.Union([
      t.Literal("title"),
      t.Literal("description"),
      t.Literal("releaseDate"),
      t.Literal("category"),
      t.Literal("aspectRatio"),
      t.Literal("university"),
      t.Literal("school"),
      t.Literal("studio"),
    ]),
  ),
  page: t.Optional(t.String()),
  pagesize: t.Optional(t.String()),
  sort: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
  sortby: t.Optional(
    t.Union([
      t.Literal("createdAt"),
      t.Literal("title"),
      t.Literal("releaseDate"),
      t.Literal("duration"),
      t.Literal("views"),
      t.Literal("matchRate"),
      t.Literal("averageRating"),
    ]),
  ),
  aspectRatio: t.Optional(
    t.Union([t.Literal("landscape"), t.Literal("portrait")]),
  ),
});
export type GetMoviesQueryDTO = Static<typeof getMoviesQuerySchema>;

export interface MovieFilterInput {
  search?: string;
  searchby?: string;
  page?: number;
  pagesize?: number;
  sort?: string;
  sortby?: string;
  createdBy?: string;
  aspectRatio?: string;
}

export interface AssociateCrewBulkInput {
  movieId: string;
  crew: MovieCrewInputItemWithRole[];
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

export interface CreateMovieCrewInput {
  movieId: string;
  crewMemberId: string;
  roleId: string;
}

export const movieIncludes = {
  category: true,
  creator: {
    select: MovieUserSelect,
  },
  crew: {
    include: {
      crewRole: true,
      crewMember: {
        include: {
          user: {
            select: MovieUserSelect,
          },
        },
      },
    },
  },
  ratings: {
    include: {
      user: {
        select: MovieUserSelect,
      },
    },
  },
} satisfies Prisma.MovieInclude;

export type PrismaMovieWithRelations = Prisma.MovieGetPayload<{
  include: typeof movieIncludes;
}>;

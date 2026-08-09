import { t, Static } from "elysia";
import { Rating } from "../../ratings/domain/rating";
import { tArrayCoerce } from "../../../core/utils/transform/parser";
import {
  tCrewInputCoerce,
  MovieCrewInputItemWithRole,
  Award,
  tAwardArrayCoerce,
} from "../parser";
import { User } from "../../auth/domain/auth";
import { Prisma } from "@prisma/client";
import type { CrewMember } from "../../crew-members/domain/crew-member";
import { Category, CrewRole } from "../../master-data/domain/masterdata";

const nullableUuidSchema = t.Transform(
  t.Union([t.String({ format: "uuid" }), t.Literal("null"), t.Null()]),
)
  .Decode((value) => (value === "null" ? null : value))
  .Encode((value) => value);

const nullableStringSchema = t.Transform(
  t.Union([t.String(), t.Literal("null"), t.Null()]),
)
  .Decode((value) => (value === "null" ? null : value))
  .Encode((value) => value);

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
  categories: Category[];
  thumbnail: string;
  youtubeUrl: string;
  trailerUrls?: string[];
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
  subtitle?: string | null;
  contentWarnings: string[];
  otherContentWarning?: string | null;
  tags?: string[];
  colorType: string;
  studio?: string | null;
  createdBy: string;
  creator?: User;
  crew: MovieCrew[];
  btsVideos: string[];
  createdAt: Date;
  updatedAt: Date;
  awards: Award[];
}

export interface CreateMovieInput {
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  trailerUrls?: string[];
  categories: {
    connect: Array<{ id: string }>;
  };
  releaseDate: Date;
  duration: number;
  matchRate: number;
  aspectRatio: string;
  ageRatingId: string;
  universityId?: string | null;
  schoolId?: string | null;
  languageId?: string | null;
  subtitleId?: string | null;
  contentWarnings?: {
    connect: Array<{ id: string }>;
  };
  otherContentWarning?: string | null;
  tags?: {
    connect: Array<{ id: string }>;
  };
  colorTypeId: string;
  studio?: string | null;
  createdBy: string;
  btsVideos?: string[];
  awards?: {
    create: { projectName: string; awardName: string }[];
  };
}

export interface UpdateMovieInput {
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  trailerUrls?: string[];
  categories?: {
    set: Array<{ id: string }>;
  };
  releaseDate: Date;
  duration: number;
  matchRate: number;
  aspectRatio: string;
  ageRatingId?: string;
  universityId?: string | null;
  schoolId?: string | null;
  languageId?: string | null;
  subtitleId?: string | null;
  contentWarnings?: {
    set: Array<{ id: string }>;
  };
  otherContentWarning?: string | null;
  tags?: {
    set: Array<{ id: string }>;
  };
  colorTypeId?: string;
  studio?: string | null;
  btsVideos?: string[];
  awards?: {
    deleteMany: {};
    create: { projectName: string; awardName: string }[];
  };
}

export const createMovieBodySchema = t.Object({
  title: t.String(),
  description: t.String(),
  categoryIds: tArrayCoerce,
  thumbnail: t.File(),
  youtubeUrl: t.String(),
  trailerUrls: t.Optional(tArrayCoerce),
  releaseDate: t.String(),
  duration: t.Numeric(),
  aspectRatio: t.Union([t.Literal("landscape"), t.Literal("portrait")]),
  ageRatingId: t.String({ format: "uuid" }),
  universityId: t.Optional(nullableUuidSchema),
  schoolId: t.Optional(nullableUuidSchema),
  languageId: t.Optional(t.Union([t.String({ format: "uuid" }), t.Null()])),
  subtitleId: t.Optional(t.Union([t.String({ format: "uuid" }), t.Null()])),
  contentWarningIds: t.Optional(tArrayCoerce),
  otherContentWarning: t.Optional(t.String()),
  tags: t.Optional(tArrayCoerce),
  colorTypeId: t.String({ format: "uuid" }),
  studio: t.Optional(nullableStringSchema),
  crew: t.Optional(tCrewInputCoerce),
  btsVideo: t.Optional(tArrayCoerce),
  awards: t.Optional(tAwardArrayCoerce),
});
export type CreateMovieBodyDTO = Static<typeof createMovieBodySchema>;

export const updateMovieParamsSchema = t.Object({
  id: t.String({ format: "uuid" }),
});
export type UpdateMovieParamsDTO = Static<typeof updateMovieParamsSchema>;

export const updateMovieBodySchema = t.Object({
  title: t.String(),
  description: t.String(),
  categoryIds: tArrayCoerce,
  thumbnail: t.Union([t.File(), t.String()]),
  youtubeUrl: t.String(),
  trailerUrls: t.Optional(tArrayCoerce),
  releaseDate: t.String(),
  duration: t.Numeric(),
  aspectRatio: t.Union([t.Literal("landscape"), t.Literal("portrait")]),
  ageRatingId: t.Optional(t.String({ format: "uuid" })),
  universityId: t.Optional(nullableUuidSchema),
  schoolId: t.Optional(nullableUuidSchema),
  languageId: t.Optional(t.Union([t.String({ format: "uuid" }), t.Null()])),
  subtitleId: t.Optional(t.Union([t.String({ format: "uuid" }), t.Null()])),
  contentWarningIds: t.Optional(tArrayCoerce),
  otherContentWarning: t.Optional(t.String()),
  tags: t.Optional(tArrayCoerce),
  colorTypeId: t.Optional(t.String({ format: "uuid" })),
  studio: t.Optional(nullableStringSchema),
  crew: t.Optional(tCrewInputCoerce),
  btsVideo: t.Optional(tArrayCoerce),
  awards: t.Optional(tAwardArrayCoerce),
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
  categories: true,
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
  awards: true,
  ageRating: true,
  university: true,
  school: true,
  language: true,
  subtitle: true,
  contentWarnings: true,
  colorType: true,
  tags: true,
} satisfies Prisma.MovieInclude;

export type PrismaMovieWithRelations = Prisma.MovieGetPayload<{
  include: typeof movieIncludes;
}>;

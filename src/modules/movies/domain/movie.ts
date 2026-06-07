import { t, Static } from "elysia";
import { Rating } from "../../ratings/domain/rating";
import { tArrayCoerce } from "../../../core/utils/parser";
import { User } from "../../auth/domain/auth";
import { ColorType, Prisma } from "@prisma/client";

export interface MasterDataField {
  id: string;
  name: string;
  createdAt: Date;
}

export interface CrewRole {
  id: string;
  name: string;
  createdAt: Date;
}

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
  roleId: string;
  role: string;
  crewRole?: CrewRole;
  crewMember?: CrewMember;
  movie?: Movie;
  createdAt: Date;
  updatedAt: Date;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  category: MasterDataField;
  thumbnail: string;
  youtubeUrl: string;
  trailerUrl?: string | null;
  views: number;
  ratings: Rating[];
  year: number;
  matchRate: number;
  aspectRatio: string;
  ageRating: MasterDataField;
  duration: number;
  university?: MasterDataField | null;
  language?: MasterDataField | null;
  targetGroup?: MasterDataField | null;
  hasProfanity: boolean;
  hasDrugs: boolean;
  colorType: ColorType;
  studio?: string | null;
  createdBy: string;
  creator?: User;
  crew: MovieCrew[];
  btsVideos: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMovieInput {
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  trailerUrl?: string | null;
  categoryId: string;
  year: number;
  duration: number;
  matchRate: number;
  aspectRatio: string;
  ageRatingId: string;
  universityId?: string | null;
  languageId?: string | null;
  targetGroupId?: string | null;
  hasProfanity?: boolean;
  hasDrugs?: boolean;
  colorType?: ColorType;
  studio?: string | null;
  createdBy: string;
  btsVideos?: string[];
}

export interface UpdateMovieInput {
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  trailerUrl?: string | null;
  categoryId: string;
  year: number;
  duration: number;
  matchRate: number;
  aspectRatio: string;
  ageRatingId: string;
  universityId?: string | null;
  languageId?: string | null;
  targetGroupId?: string | null;
  hasProfanity?: boolean;
  hasDrugs?: boolean;
  colorType?: ColorType;
  studio?: string | null;
  btsVideos?: string[];
}

export const createMovieBodySchema = t.Object({
  title: t.String(),
  description: t.String(),
  categoryId: t.String({ format: "uuid" }),
  thumbnail: t.File(),
  youtubeUrl: t.String(),
  trailerUrl: t.Optional(t.String()),
  year: t.Numeric(),
  duration: t.Numeric(),
  aspectRatio: t.String({ pattern: "^\\d+:\\d+$" }),
  ageRatingId: t.String({ format: "uuid" }),
  universityId: t.Optional(t.String({ format: "uuid" })),
  languageId: t.Optional(t.String({ format: "uuid" })),
  targetGroupId: t.Optional(t.String({ format: "uuid" })),
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
  year: t.Numeric(),
  duration: t.Numeric(),
  aspectRatio: t.String({ pattern: "^\\d+:\\d+$" }),
  ageRatingId: t.String({ format: "uuid" }),
  universityId: t.Optional(t.String({ format: "uuid" })),
  languageId: t.Optional(t.String({ format: "uuid" })),
  targetGroupId: t.Optional(t.String({ format: "uuid" })),
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

export const searchMoviesQuerySchema = t.Object({
  q: t.Optional(t.String()),
});
export type SearchMoviesQueryDTO = Static<typeof searchMoviesQuerySchema>;

export const getMoviesQuerySchema = t.Object({
  search: t.Optional(t.String()),
  searchby: t.Optional(t.String()),
  page: t.Optional(t.String()),
  pagesize: t.Optional(t.String()),
  sort: t.Optional(t.String()),
  sortby: t.Optional(t.String()),
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

export interface CreateMovieCrewInput {
  movieId: string;
  crewMemberId: string;
  roleId: string;
}

export const movieIncludes = {
  category: true,
  ageRating: true,
  university: true,
  language: true,
  targetGroup: true,
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

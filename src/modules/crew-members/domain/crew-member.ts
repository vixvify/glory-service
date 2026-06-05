import { t, Static } from "elysia";
import { User } from "../../auth/domain/auth";
import { MovieCrew } from "../../movies/domain/movie";
import {
  CrewMember as PrismaCrewMember,
  Movie as PrismaMovie,
  MovieCrew as PrismaMovieCrew,
  User as PrismaUser,
} from "@prisma/client";

export interface CrewMember {
  id: string;
  name: string;
  email?: string | null;
  userId?: string | null;
  user?: User | null;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  movieCrews?: MovieCrew[];
}

export const createCrewMemberSchema = t.Object({
  name: t.String({ minLength: 1 }),
  email: t.Optional(t.Union([t.String(), t.Null()])),
});
export type CreateCrewMemberInput = Static<typeof createCrewMemberSchema>;

export const updateCrewMemberParamsSchema = t.Object({
  id: t.String({ format: "uuid" }),
});
export type UpdateCrewMemberParamsInput = Static<
  typeof updateCrewMemberParamsSchema
>;

export const updateCrewMemberBodySchema = t.Object({
  name: t.String({ minLength: 1 }),
  email: t.Optional(t.Union([t.String(), t.Null()])),
});

export type UpdateCrewMemberBodyInput = Static<
  typeof updateCrewMemberBodySchema
>;

export const getCrewMemberByIdParamsSchema = t.Object({
  id: t.String({ format: "uuid" }),
});
export type GetCrewMemberByIdParamsInput = Static<
  typeof getCrewMemberByIdParamsSchema
>;

export const deleteCrewMemberParamsSchema = t.Object({
  id: t.String({ format: "uuid" }),
});
export type DeleteCrewMemberParamsInput = Static<
  typeof deleteCrewMemberParamsSchema
>;

export const searchCrewMembersQuerySchema = t.Object({
  q: t.Optional(t.String()),
});
export type SearchCrewMembersQueryInput = Static<
  typeof searchCrewMembersQuerySchema
>;

export const getCrewMembersQuerySchema = t.Object({
  search: t.Optional(t.String()),
  searchby: t.Optional(t.String()),
  page: t.Optional(t.String()),
  pagesize: t.Optional(t.String()),
  sort: t.Optional(t.String()),
  sortby: t.Optional(t.String()),
});
export type GetCrewMembersQueryInput = Static<typeof getCrewMembersQuerySchema>;

export interface CrewFilterParams {
  search?: string;
  searchby?: string;
  page?: number;
  pagesize?: number;
  sort?: string;
  sortby?: string;
  createdBy?: string;
}

export interface CreateCrewMemberRepositoryInput {
  name: string;
  email?: string | null;
  userId?: string | null;
  createdBy: string;
}

export interface UpdateCrewMemberRepositoryInput {
  name: string;
  email?: string | null;
  userId?: string | null;
}

export const CrewMemberUserSelect = {
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

export type CrewMemberUserSelected = Pick<
  PrismaUser,
  | "id"
  | "email"
  | "name"
  | "role"
  | "createdAt"
  | "photoUrl"
  | "motto"
  | "bio"
  | "ig"
  | "facebook"
  | "youtube"
  | "tiktok"
  | "positions"
  | "birthday"
  | "awards"
>;

export type CrewMemberWithRelations = PrismaCrewMember & {
  user: CrewMemberUserSelected | null;
  movieCrews: (PrismaMovieCrew & {
    movie: PrismaMovie;
  })[];
};


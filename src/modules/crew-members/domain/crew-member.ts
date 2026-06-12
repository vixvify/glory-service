import { t, Static } from "elysia";
import { User } from "../../auth/domain/auth";
import { MovieCrew } from "../../movies/domain/movie";
import {
  User as PrismaUser,
  Prisma,
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
  movies?: MovieCrew[];
}

export const createCrewMemberSchema = t.Object({
  name: t.String({ minLength: 1 }),
  email: t.Optional(t.Union([t.String(), t.Null()])),
});
export type CreateCrewMemberDTO = Static<typeof createCrewMemberSchema>;

export const updateCrewMemberParamsSchema = t.Object({
  id: t.String({ format: "uuid" }),
});
export type UpdateCrewMemberParamsDTO = Static<
  typeof updateCrewMemberParamsSchema
>;

export const updateCrewMemberBodySchema = t.Object({
  name: t.String({ minLength: 1 }),
  email: t.Optional(t.Union([t.String(), t.Null()])),
});

export type UpdateCrewMemberBodyDTO = Static<
  typeof updateCrewMemberBodySchema
>;

export const getCrewMemberByIdParamsSchema = t.Object({
  id: t.String({ format: "uuid" }),
});
export type GetCrewMemberByIdParamsDTO = Static<
  typeof getCrewMemberByIdParamsSchema
>;

export const deleteCrewMemberParamsSchema = t.Object({
  id: t.String({ format: "uuid" }),
});
export type DeleteCrewMemberParamsDTO = Static<
  typeof deleteCrewMemberParamsSchema
>;

export const searchCrewMembersQuerySchema = t.Object({
  q: t.Optional(t.String()),
});
export type SearchCrewMembersQueryDTO = Static<
  typeof searchCrewMembersQuerySchema
>;

export const getCrewMembersQuerySchema = t.Object({
  search: t.Optional(t.String()),
  searchby: t.Optional(t.Union([t.Literal("name"), t.Literal("email"), t.Literal("role")])),
  page: t.Optional(t.String()),
  pagesize: t.Optional(t.String()),
  sort: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")])),
  sortby: t.Optional(t.Union([t.Literal("name"), t.Literal("email"), t.Literal("createdAt")])),
});
export type GetCrewMembersQueryDTO = Static<typeof getCrewMembersQuerySchema>;

export interface CrewFilterInput {
  search?: string;
  searchby?: string;
  page?: number;
  pagesize?: number;
  sort?: string;
  sortby?: string;
  createdBy?: string;
}

export interface CreateCrewMemberInput {
  name: string;
  email?: string | null;
  userId?: string | null;
  createdBy: string;
}

export interface UpdateCrewMemberInput {
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

export const crewMemberIncludes = {
  movies: {
    include: {
      crewRole: true,
      movie: {
        include: {
          category: true,
        },
      },
    },
  },
  user: {
    select: CrewMemberUserSelect,
  },
} satisfies Prisma.CrewMemberInclude;

export type CrewMemberWithRelations = Prisma.CrewMemberGetPayload<{
  include: typeof crewMemberIncludes;
}>;

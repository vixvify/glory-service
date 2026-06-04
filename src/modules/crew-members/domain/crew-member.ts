import { t, Static } from "elysia";

export interface CrewMember {
  id: string;
  name: string;
  email?: string | null;
  userId?: string | null;
  createdAt: Date;
  updatedAt: Date;
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
}

export interface CreateCrewMemberRepositoryInput {
  name: string;
  email?: string | null;
  userId?: string | null;
}

export interface UpdateCrewMemberRepositoryInput {
  name: string;
  email?: string | null;
  userId?: string | null;
}

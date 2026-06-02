import { t, Static } from "elysia";

export interface CrewMember {
  id: string;
  name: string;
  email?: string | null;
  photoUrl?: string | null;
  userId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const createCrewMemberSchema = t.Object({
  name: t.String({ minLength: 1 }),
  email: t.Optional(t.String()),
  photo: t.Optional(t.File()),
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
  email: t.Optional(t.String()),
  photo: t.Optional(t.Union([t.File(), t.String()])),
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
  pagenumber: t.Optional(t.String()),
  sort: t.Optional(t.String()),
  sortby: t.Optional(t.String()),
});
export type GetCrewMembersQueryInput = Static<typeof getCrewMembersQuerySchema>;

export interface CrewFilterParams {
  search?: string;
  searchby?: string;
  page?: number;
  pagenumber?: number;
  sort?: string;
  sortby?: string;
}

export interface CreateCrewMemberRepositoryInput {
  name: string;
  photoUrl?: string;
  email?: string;
  userId?: string;
}

export interface UpdateCrewMemberRepositoryInput {
  name: string;
  photoUrl?: string;
  email?: string | null;
  userId?: string | null;
}

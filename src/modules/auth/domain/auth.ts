import { t, Static } from "elysia";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "admin" | "user";
  photoUrl?: string | null;
  motto?: string | null;
  bio?: string | null;
  ig?: string | null;
  facebook?: string | null;
  youtube?: string | null;
  tiktok?: string | null;
  positions?: string[];
  birthday?: Date | null;
  awards?: string[];
}

export interface CreateUserRepositoryInput {
  email: string;
  passwordHash: string;
  name: string;
  photoUrl?: string;
  motto?: string;
  bio?: string;
  ig?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  positions?: string[];
  birthday?: Date;
  awards?: string[];
}

export const registerUserBodySchema = t.Object({
  name: t.String({ minLength: 2 }),
  email: t.String(),
  password: t.String({ minLength: 6 }),
  photo: t.Optional(t.File()),
  motto: t.Optional(t.String()),
  bio: t.Optional(t.String()),
  ig: t.Optional(t.String()),
  facebook: t.Optional(t.String()),
  youtube: t.Optional(t.String()),
  tiktok: t.Optional(t.String()),
  positions: t.Optional(t.Union([t.String(), t.Array(t.String())])),
  birthday: t.Optional(t.String()),
  awards: t.Optional(t.Union([t.String(), t.Array(t.String())])),
});

export type RegisterUserBodyInput = Static<typeof registerUserBodySchema>;

export const loginUserBodySchema = t.Object({
  email: t.String(),
  password: t.String({ minLength: 6 }),
});

export type LoginUserBodyInput = Static<typeof loginUserBodySchema>;

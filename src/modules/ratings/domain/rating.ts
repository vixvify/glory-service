import { User } from "../../auth/domain/auth";
import { Movie } from "../../movies/domain/movie";
import { t, Static } from "elysia";
import { Prisma } from "@prisma/client";

type RatingMovie = Omit<Movie, "ratings">;

export interface Rating {
  movieId: string;
  userId: string;
  stars: number;
  comment: string | null;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  movie: RatingMovie;
}

export const addRatingBodySchema = t.Object({
  movieId: t.String({ format: "uuid" }),
  stars: t.Number(),
  comment: t.Optional(t.Union([t.String(), t.Null()])),
});
export type AddRatingBodyDTO = Static<typeof addRatingBodySchema>;

export interface AddRatingDTO {
  userId: string;
  movieId: string;
  stars: number;
  comment?: string | null;
}

export interface AddRatingInput {
  userId: string;
  movieId: string;
  stars: number;
  comment?: string | null;
}

export const getRatingsQuerySchema = t.Object({
  movieId: t.String({ format: "uuid" }),
});
export type GetRatingsQueryDTO = Static<typeof getRatingsQuerySchema>;

export interface GetRatingsDTO {
  userId: string;
  movieId: string;
}

export interface GetRatingsInput {
  userId: string;
  movieId: string;
}

export const deleteRatingBodySchema = t.Object({
  movieId: t.String({ format: "uuid" }),
});
export type DeleteRatingBodyDTO = Static<typeof deleteRatingBodySchema>;

export const checkRatingQuerySchema = t.Object({
  movieId: t.String({ format: "uuid" }),
});
export type CheckRatingQueryDTO = Static<typeof checkRatingQuerySchema>;

export const updateRatingBodySchema = t.Object({
  movieId: t.String({ format: "uuid" }),
  stars: t.Number(),
  comment: t.Optional(t.Union([t.String(), t.Null()])),
});
export type UpdateRatingBodyDTO = Static<typeof updateRatingBodySchema>;

export interface UpdateRatingDTO {
  userId: string;
  movieId: string;
  stars: number;
  comment?: string | null;
}

export interface UpdateRatingInput {
  userId: string;
  movieId: string;
  stars: number;
  comment?: string | null;
}

export const RatingUserSelect = {
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

export const ratingIncludes = {
  movie: {
    include: {
      category: true,
      ageRating: true,
      university: true,
      language: true,
      targetGroup: true,
    },
  },
  user: {
    select: RatingUserSelect,
  },
} satisfies Prisma.RatingInclude;

export type RatingWithRelations = Prisma.RatingGetPayload<{
  include: typeof ratingIncludes;
}>;

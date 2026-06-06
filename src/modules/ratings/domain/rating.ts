import { User } from "../../auth/domain/auth";
import { Movie } from "../../movies/domain/movie";
import { t, Static } from "elysia";
import { Movie as PrismaMovie, User as PrismaUser, Rating as PrismaRating, Prisma } from "@prisma/client";

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
  movieId: t.String(),
  stars: t.Number(),
  comment: t.Optional(t.Union([t.String(), t.Null()])),
});
export type AddRatingBodyInput = {
  userId: string;
  movieId: string;
  stars: number;
  comment?: string | null;
};

export const getRatingsQuerySchema = t.Object({
  movieId: t.String(),
});
export type GetRatingsQueryInput = {
  userId: string;
  movieId: string;
};

export const deleteRatingBodySchema = t.Object({
  movieId: t.String(),
});
export type DeleteRatingBodyInput = {
  userId: string;
  movieId: string;
};

export const checkRatingQuerySchema = t.Object({
  movieId: t.String(),
});
export type CheckRatingQueryInput = {
  userId: string;
  movieId: string;
};

export const updateRatingBodySchema = t.Object({
  movieId: t.String(),
  stars: t.Number(),
  comment: t.Optional(t.Union([t.String(), t.Null()])),
});
export type UpdateRatingBodyInput = {
  userId: string;
  movieId: string;
  stars: number;
  comment?: string | null;
};

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

export type RatingWithRelations = PrismaRating & {
  movie: PrismaMovie & {
    category: { id: string; name: string; createdAt: Date };
    ageRating: { id: string; name: string; createdAt: Date };
    university: { id: string; name: string; createdAt: Date } | null;
    language: { id: string; name: string; createdAt: Date } | null;
    targetGroup: { id: string; name: string; createdAt: Date } | null;
  };
  user: Pick<PrismaUser, "id" | "email" | "name" | "role">;
};

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

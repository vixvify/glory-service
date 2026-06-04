import { User } from "../../auth/domain/auth";
import { Movie } from "../../movies/domain/movie";
import { t, Static } from "elysia";

type RatingMovie = Omit<Movie, "ratings">;

export interface Rating {
  id: string;
  movieId: string;
  userId: string;
  stars: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  movie: RatingMovie;
}

export const addRatingBodySchema = t.Object({
  movieId: t.String(),
  stars: t.Number(),
});
export type AddRatingBodyInput = {
  userId: string;
  movieId: string;
  stars: number;
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
});
export type UpdateRatingBodyInput = {
  userId: string;
  movieId: string;
  stars: number;
};

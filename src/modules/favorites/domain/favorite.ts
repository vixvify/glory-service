import { User } from "../../auth/domain/auth";
import { Movie } from "../../movies/domain/movie";
import { t, Static } from "elysia";

export interface FavoriteMovie {
  id: string;
  userId: string;
  movieId: string;
  user: User;
  movie: Movie;
  createdAt: Date;
}

export const addFavoriteBodySchema = t.Object({
  movieId: t.String(),
});
export type AddFavoriteBodyDTO = Static<typeof addFavoriteBodySchema>;

export const removeFavoriteParamsSchema = t.Object({
  movieId: t.String({ format: "uuid" }),
});
export type RemoveFavoriteParamsDTO = Static<
  typeof removeFavoriteParamsSchema
>;

export const FavoriteUserSelect = {
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

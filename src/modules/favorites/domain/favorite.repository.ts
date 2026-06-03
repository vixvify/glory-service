import { Movie as PrismaMovie } from "@prisma/client";

export interface FavoriteRepository {
  getFavorites(userId: string): Promise<PrismaMovie[]>;
  checkFavorite(userId: string, movieId: string): Promise<boolean>;
  addFavorite(userId: string, movieId: string): Promise<void>;
  removeFavorite(userId: string, movieId: string): Promise<void>;
}

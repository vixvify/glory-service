import { PrismaMovieWithRelations } from "../../movies/domain/movie";

export interface FavoriteRepository {
  getFavorites(userId: string): Promise<PrismaMovieWithRelations[]>;
  checkFavorite(userId: string, movieId: string): Promise<boolean>;
  addFavorite(userId: string, movieId: string): Promise<void>;
  removeFavorite(userId: string, movieId: string): Promise<void>;
}

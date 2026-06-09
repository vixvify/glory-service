import { prisma } from "../lib/prisma";
import { FavoriteRepository } from "../modules/favorites/domain/favorite.repository";
import {
  movieIncludes,
  PrismaMovieWithRelations,
} from "../modules/movies/domain/movie";

export class FavoriteRepositoryImpl implements FavoriteRepository {
  async getFavorites(userId: string): Promise<PrismaMovieWithRelations[]> {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        movie: {
          include: movieIncludes,
        },
      },
    });
    return favorites.map((fav) => fav.movie);
  }

  async checkFavorite(userId: string, movieId: string): Promise<boolean> {
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });
    return !!existing;
  }

  async addFavorite(userId: string, movieId: string): Promise<void> {
    await prisma.favorite.create({
      data: {
        userId,
        movieId,
      },
    });
  }

  async removeFavorite(userId: string, movieId: string): Promise<void> {
    await prisma.favorite.delete({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });
  }
}

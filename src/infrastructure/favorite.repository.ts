import { prisma } from "../lib/prisma";
import { FavoriteRepository } from "../modules/favorites/domain/favorite.repository";
import { Movie as PrismaMovie } from "@prisma/client";

export class FavoriteRepositoryImpl implements FavoriteRepository {
  async getFavorites(userId: string): Promise<PrismaMovie[]> {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        movie: {
          include: {
            crew: {
              include: {
                crewMember: true,
              },
            },
            bts: true,
            ratings: {
              include: {
                user: {
                  select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                  },
                },
              },
            },
          },
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
    await prisma.favorite.deleteMany({
      where: {
        userId,
        movieId,
      },
    });
  }
}

import { prisma } from "../lib/prisma";
import {
  RatingRepository,
  RatingWithRelations,
} from "../modules/ratings/domain/rating.repository";
import {
  AddRatingBodyInput,
  GetRatingsQueryInput,
  UpdateRatingBodyInput,
} from "../modules/ratings/domain/rating";

export class RatingRepositoryImpl implements RatingRepository {
  async addRating(data: AddRatingBodyInput): Promise<void> {
    await prisma.rating.create({
      data,
    });
  }

  async getRatingsByUserIdAndMovieId(
    data: GetRatingsQueryInput,
  ): Promise<RatingWithRelations | null> {
    return prisma.rating.findUnique({
      where: { userId_movieId: { userId: data.userId, movieId: data.movieId } },
      include: {
        movie: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
          },
        },
      },
    });
  }

  async deleteRating(userId: string, movieId: string): Promise<void> {
    await prisma.rating.deleteMany({
      where: {
        userId,
        movieId,
      },
    });
  }

  async checkRating(userId: string, movieId: string): Promise<boolean> {
    const existing = await prisma.rating.findUnique({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
      },
    });
    return !!existing;
  }

  async updateRating(data: UpdateRatingBodyInput): Promise<void> {
    await prisma.rating.update({
      where: {
        userId_movieId: {
          userId: data.userId,
          movieId: data.movieId,
        },
      },
      data: {
        stars: data.stars,
      },
    });
  }
}

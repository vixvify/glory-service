import { prisma } from "../lib/prisma";
import { RatingRepository } from "../modules/ratings/domain/rating.repository";
import { RatingWithRelations } from "../modules/ratings/domain/rating";
import {
  AddRatingBodyInput,
  GetRatingsQueryInput,
  UpdateRatingBodyInput,
  ratingIncludes,
} from "../modules/ratings/domain/rating";

export class RatingRepositoryImpl implements RatingRepository {
  async addRating(data: AddRatingBodyInput): Promise<void> {
    await prisma.rating.create({
      data: {
        userId: data.userId,
        movieId: data.movieId,
        stars: data.stars,
        comment: data.comment ?? null,
      },
    });
  }

  async getRatingsByUserIdAndMovieId(
    data: GetRatingsQueryInput,
  ): Promise<RatingWithRelations | null> {
    const result = await prisma.rating.findUnique({
      where: { userId_movieId: { userId: data.userId, movieId: data.movieId } },
      include: ratingIncludes,
    });
    return result as unknown as RatingWithRelations | null;
  }

  async deleteRating(userId: string, movieId: string): Promise<void> {
    await prisma.rating.delete({
      where: {
        userId_movieId: {
          userId,
          movieId,
        },
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
        comment: data.comment !== undefined ? data.comment : undefined,
      },
    });
  }
}

import { prisma } from "../lib/prisma";
import { RatingRepository } from "../modules/ratings/domain/rating.repository";
import { RatingWithRelations } from "../modules/ratings/domain/rating";
import {
  AddRatingInput,
  GetRatingsInput,
  UpdateRatingInput,
  ratingIncludes,
} from "../modules/ratings/domain/rating";

export class RatingRepositoryImpl implements RatingRepository {
  async addRating(input: AddRatingInput): Promise<void> {
    await prisma.rating.create({
      data: {
        userId: input.userId,
        movieId: input.movieId,
        stars: input.stars,
        comment: input.comment ?? null,
      },
    });
  }

  async getRatingsByUserIdAndMovieId(
    input: GetRatingsInput,
  ): Promise<RatingWithRelations | null> {
    const result = await prisma.rating.findUnique({
      where: {
        userId_movieId: { userId: input.userId, movieId: input.movieId },
      },
      include: ratingIncludes,
    });
    return result;
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

  async updateRating(input: UpdateRatingInput): Promise<void> {
    await prisma.rating.update({
      where: {
        userId_movieId: {
          userId: input.userId,
          movieId: input.movieId,
        },
      },
      data: {
        stars: input.stars,
        ...(input.comment !== undefined && { comment: input.comment }),
      },
    });
  }

  async updateMovieAverageRating(movieId: string): Promise<void> {
    const result = await prisma.rating.aggregate({
      where: { movieId },
      _avg: { stars: true },
    });
    await prisma.movie.update({
      where: { id: movieId },
      data: { averageRating: result._avg.stars ?? 0 },
    });
  }
}

import { prisma } from "../lib/prisma";
import { RatingRepository } from "../modules/ratings/domain/rating.repository";
import {
  Rating,
  AddRatingBodyInput,
  GetRatingsQueryInput,
  UpdateRatingBodyInput,
} from "../modules/ratings/domain/rating";

export class RatingRepositoryImpl implements RatingRepository {
  async addRating(data: AddRatingBodyInput): Promise<void> {
    await prisma.rating.create({
      data: {
        userId: data.userId,
        movieId: data.movieId,
        stars: data.stars,
      },
    });
  }

  async getRatingsByUserIdAndMovieId(
    data: GetRatingsQueryInput,
  ): Promise<Rating[]> {
    const ratings = await prisma.rating.findMany({
      where: { userId: data.userId, movieId: data.movieId },
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

    return ratings.map((rating) => ({
      ...rating,
      user: {
        ...rating.user,
        name: rating.user.name ?? "Unknown User",
        role: rating.user.role as "user" | "admin",
      },
      movie: {
        ...rating.movie,
        crew: [],
        bts: null,
      },
    }));
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

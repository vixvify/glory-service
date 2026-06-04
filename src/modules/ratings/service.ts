import { AppError, BadRequestError, ConflictError } from "../../core/error";
import {
  AddRatingBodyInput,
  Rating,
  GetRatingsQueryInput,
  UpdateRatingBodyInput,
} from "./domain/rating";
import { RatingRepository } from "./domain/rating.repository";
import { RatingFactory } from "./factory";

export class RatingService {
  constructor(private repo: RatingRepository) {}

  async addRating(data: AddRatingBodyInput): Promise<void> {
    try {
      const existing = await this.repo.checkRating(data.userId, data.movieId);
      if (existing) {
        throw new ConflictError("You have already rated this movie. Use update instead.");
      }
      return await this.repo.addRating(data);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to add rating";
      throw new BadRequestError(message, error);
    }
  }

  async getRatingsByUserIdAndMovieId(
    data: GetRatingsQueryInput,
  ): Promise<Rating | null> {
    try {
      const rating = await this.repo.getRatingsByUserIdAndMovieId(data);
      if (!rating) return null;
      return RatingFactory.toDomain(rating);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get ratings";
      throw new BadRequestError(message, error);
    }
  }

  async deleteRating(userId: string, movieId: string): Promise<void> {
    try {
      await this.repo.deleteRating(userId, movieId);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to delete rating";
      throw new BadRequestError(message, error);
    }
  }

  async checkRating(userId: string, movieId: string): Promise<boolean> {
    try {
      return await this.repo.checkRating(userId, movieId);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to check rating";
      throw new BadRequestError(message, error);
    }
  }

  async updateRating(data: UpdateRatingBodyInput): Promise<void> {
    try {
      return await this.repo.updateRating(data);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to update rating";
      throw new BadRequestError(message, error);
    }
  }
}

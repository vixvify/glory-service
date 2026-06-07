import { AppError, BadRequestError, ConflictError } from "../../core/error";
import {
  AddRatingDTO,
  Rating,
  GetRatingsDTO,
  UpdateRatingDTO,
  AddRatingInput,
  GetRatingsInput,
  UpdateRatingInput,
} from "./domain/rating";
import { RatingRepository } from "./domain/rating.repository";
import { RatingFactory } from "./factory";

export class RatingService {
  constructor(private repo: RatingRepository) {}

  async addRating(dto: AddRatingDTO): Promise<void> {
    try {
      const existing = await this.repo.checkRating(dto.userId, dto.movieId);
      if (existing) {
        throw new ConflictError("You have already rated this movie. Use update instead.");
      }
      const input: AddRatingInput = {
        userId: dto.userId,
        movieId: dto.movieId,
        stars: dto.stars,
        comment: dto.comment,
      };
      return await this.repo.addRating(input);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to add rating";
      throw new BadRequestError(message, error);
    }
  }

  async getRatingsByUserIdAndMovieId(
    dto: GetRatingsDTO,
  ): Promise<Rating | null> {
    try {
      const input: GetRatingsInput = {
        userId: dto.userId,
        movieId: dto.movieId,
      };
      const rating = await this.repo.getRatingsByUserIdAndMovieId(input);
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

  async updateRating(dto: UpdateRatingDTO): Promise<void> {
    try {
      const input: UpdateRatingInput = {
        userId: dto.userId,
        movieId: dto.movieId,
        stars: dto.stars,
        comment: dto.comment,
      };
      return await this.repo.updateRating(input);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to update rating";
      throw new BadRequestError(message, error);
    }
  }
}

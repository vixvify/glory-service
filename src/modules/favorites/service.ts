import { AppError, NotFoundError, BadRequestError } from "../../core/error";
import { FavoriteRepository } from "./domain/favorite.repository";
import { MovieRepository } from "../movies/domain/movie.repository";
import { MovieFactory } from "../movies/factory";
import { Movie } from "../movies/domain/movie";

export class FavoriteService {
  constructor(
    private repo: FavoriteRepository,
    private movieRepo: MovieRepository,
  ) {}

  async getUserFavorites(userId: string): Promise<Movie[]> {
    try {
      const favorites = await this.repo.getFavorites(userId);
      return MovieFactory.toDomainList(favorites);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get user favorites";
      throw new BadRequestError(message, error);
    }
  }

  async addMovieToFavorites(userId: string, movieId: string): Promise<void> {
    try {
      const movie = await this.movieRepo.findById(movieId);
      if (!movie) {
        throw new NotFoundError("Movie not found");
      }

      const isFav = await this.repo.checkFavorite(userId, movieId);
      if (!isFav) {
        await this.repo.addFavorite(userId, movieId);
      }
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error
          ? error.message
          : "Failed to add movie to favorites";
      throw new BadRequestError(message, error);
    }
  }

  async removeMovieFromFavorites(
    userId: string,
    movieId: string,
  ): Promise<void> {
    try {
      await this.repo.removeFavorite(userId, movieId);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error
          ? error.message
          : "Failed to remove movie from favorites";
      throw new BadRequestError(message, error);
    }
  }
}

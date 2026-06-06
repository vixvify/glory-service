import { AppError, NotFoundError, BadRequestError, ForbiddenError } from "../../core/error";
import { ColorType } from "@prisma/client";
import {
  Movie,
  CreateMovieBodyInput,
  UpdateMovieBodyInput,
  GetMoviesQueryInput,
} from "./domain/movie";
import { MovieRepository } from "./domain/movie.repository";
import { MovieFactory, PrismaMovieWithRelations } from "./factory";
import { uploadToR2, deleteFromR2 } from "../../lib/r2";
import { isDefaultQuery } from "../../core/utils/query";
import { associateCrewBulk } from "../../lib/crew";

export class MovieService {
  constructor(
    private repo: MovieRepository,
  ) {}

  async getMovies(params?: GetMoviesQueryInput): Promise<Movie[]> {
    try {
      if (isDefaultQuery(params)) {
        const movies = await this.repo.find();
        return MovieFactory.toDomainList(movies as unknown as PrismaMovieWithRelations[]);
      }
      const { search, searchby, page, pagesize, sort, sortby } = params || {};

      const pageNum = Number(page) || 1;
      const limitNum = pagesize ? Number(pagesize) : undefined;
      const movies = await this.repo.find({
        search: search || undefined,
        searchby: searchby || undefined,
        page: pageNum,
        pagesize: limitNum,
        sort: sort || undefined,
        sortby: sortby || undefined,
      });
      return MovieFactory.toDomainList(movies as unknown as PrismaMovieWithRelations[]);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get movies";
      throw new BadRequestError(message, error);
    }
  }

  async getMyMovies(userId: string): Promise<Movie[]> {
    try {
      const movies = await this.repo.find({ createdBy: userId });
      return MovieFactory.toDomainList(movies as unknown as PrismaMovieWithRelations[]);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get my movies";
      throw new BadRequestError(message, error);
    }
  }

  async getContributedMovies(userId: string): Promise<Movie[]> {
    try {
      const movies = await this.repo.findContributed(userId);
      return MovieFactory.toDomainList(movies as unknown as PrismaMovieWithRelations[]);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get contributed movies";
      throw new BadRequestError(message, error);
    }
  }

  async getMoviesByCategory(category: string): Promise<Movie[]> {
    try {
      const movies = await this.repo.findByCategory(category);
      return MovieFactory.toDomainList(movies as unknown as PrismaMovieWithRelations[]);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error
          ? error.message
          : "Failed to get movies by category";
      throw new BadRequestError(message, error);
    }
  }

  async getMoviesByUniversity(university: string): Promise<Movie[]> {
    try {
      const movies = await this.repo.findByUniversity(university);
      return MovieFactory.toDomainList(movies as unknown as PrismaMovieWithRelations[]);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error
          ? error.message
          : "Failed to get movies by university";
      throw new BadRequestError(message, error);
    }
  }

  async getMovieById(id: string): Promise<Movie> {
    try {
      const movie = await this.repo.findById(id);
      if (!movie) {
        throw new NotFoundError(`Movie with id ${id} not found`);
      }
      return MovieFactory.toDomain(movie as unknown as PrismaMovieWithRelations);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get movie";
      throw new BadRequestError(message, error);
    }
  }

  async createMovie(data: CreateMovieBodyInput, userId: string): Promise<Movie> {
    try {
      let thumbnailUrl = "";
      if (data.thumbnail instanceof File) {
        thumbnailUrl = await uploadToR2(data.thumbnail);
      } else {
        thumbnailUrl = data.thumbnail;
      }

      const directors = data.director || [];
      const producers = data.producer || [];
      const writers = data.writer || [];
      const cast = data.cast || [];
      const dops = data.dop || [];
      const editors = data.editor || [];
      const btsVideo = data.btsVideo || [];

      const movieRecord = await this.repo.create({
        title: data.title,
        description: data.description,
        thumbnail: thumbnailUrl,
        youtubeUrl: data.youtubeUrl,
        trailerUrl: data.trailerUrl || null,
        categoryId: data.categoryId,
        year: Number(data.year),
        duration: Number(data.duration),
        matchRate: 100,
        aspectRatio: data.aspectRatio,
        ageRatingId: data.ageRatingId,
        universityId: data.universityId || null,
        languageId: data.languageId || null,
        targetGroupId: data.targetGroupId || null,
        hasProfanity: String(data.hasProfanity) === "true" || data.hasProfanity === true,
        hasDrugs: String(data.hasDrugs) === "true" || data.hasDrugs === true,
        colorType: (data.colorType as ColorType) || "color",
        studio: data.studio || null,
        createdBy: userId,
        btsVideos: btsVideo,
      });

      await associateCrewBulk({
        movieId: movieRecord.id,
        directors,
        producers,
        writers,
        cast,
        dops,
        editors,
      }, userId);

      const movie = await this.repo.findById(movieRecord.id);
      if (!movie) {
        throw new Error("Failed to retrieve created movie");
      }
      return MovieFactory.toDomain(movie as unknown as PrismaMovieWithRelations);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to create movie";
      throw new BadRequestError(message, error);
    }
  }

  async updateMovie(
    id: string,
    data: UpdateMovieBodyInput,
    userId: string,
    role: string,
  ): Promise<Movie> {
    try {
      const existing = await this.repo.findById(id);
      if (!existing) {
        throw new NotFoundError(`Movie with id ${id} not found`);
      }

      if (existing.createdBy !== userId && role !== "admin") {
        throw new ForbiddenError("You do not have permission to update this movie");
      }

      let thumbnailUrl = existing.thumbnail;
      if (data.thumbnail instanceof File) {
        thumbnailUrl = await uploadToR2(data.thumbnail);
      } else if (typeof data.thumbnail === "string") {
        thumbnailUrl = data.thumbnail;
      }

      const directors = data.director || [];
      const producers = data.producer || [];
      const writers = data.writer || [];
      const cast = data.cast || [];
      const dops = data.dop || [];
      const editors = data.editor || [];
      const btsVideo = data.btsVideo || [];

      await this.repo.update(id, {
        title: data.title,
        description: data.description,
        thumbnail: thumbnailUrl,
        youtubeUrl: data.youtubeUrl,
        trailerUrl: data.trailerUrl || null,
        categoryId: data.categoryId,
        year: Number(data.year),
        duration: Number(data.duration),
        matchRate: existing.matchRate,
        aspectRatio: data.aspectRatio,
        ageRatingId: data.ageRatingId,
        universityId: data.universityId || null,
        languageId: data.languageId || null,
        targetGroupId: data.targetGroupId || null,
        hasProfanity: String(data.hasProfanity) === "true" || data.hasProfanity === true,
        hasDrugs: String(data.hasDrugs) === "true" || data.hasDrugs === true,
        colorType: (data.colorType as ColorType) || "color",
        studio: data.studio || null,
        btsVideos: btsVideo,
      });

      await associateCrewBulk({
        movieId: id,
        directors,
        producers,
        writers,
        cast,
        dops,
        editors,
      }, userId);

      const movie = await this.repo.findById(id);
      if (!movie) {
        throw new Error("Failed to retrieve updated movie");
      }
      return MovieFactory.toDomain(movie as unknown as PrismaMovieWithRelations);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to update movie";
      throw new BadRequestError(message, error);
    }
  }

  async deleteMovie(id: string, userId: string, role: string): Promise<Movie> {
    try {
      const existing = await this.repo.findById(id);
      if (!existing) {
        throw new NotFoundError(`Movie with id ${id} not found`);
      }

      if (existing.createdBy !== userId && role !== "admin") {
        throw new ForbiddenError("You do not have permission to delete this movie");
      }
      const movie = await this.repo.delete(id);
      if (movie.thumbnail) {
        await deleteFromR2(movie.thumbnail);
      }
      return MovieFactory.toDomain(movie as unknown as PrismaMovieWithRelations);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to delete movie";
      throw new BadRequestError(message, error);
    }
  }
}

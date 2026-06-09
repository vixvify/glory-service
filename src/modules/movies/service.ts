import {
  AppError,
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} from "../../core/error";
import { ColorType } from "@prisma/client";
import {
  Movie,
  CreateMovieBodyDTO,
  UpdateMovieBodyDTO,
  GetMoviesQueryDTO,
  MovieFilterInput,
  CreateMovieInput,
  UpdateMovieInput,
} from "./domain/movie";
import { MovieRepository } from "./domain/movie.repository";
import { MovieFactory } from "./factory";
import { PrismaMovieWithRelations } from "./domain/movie";
import { uploadToR2, deleteFromR2 } from "../../lib/r2";
import { isDefaultQuery } from "../../core/utils/query";
import { associateCrewBulk } from "../../lib/crew";
import { redis } from "../../lib/redis";
import { CacheKeys } from "../../core/utils/cache-key";
import { invalidateCache } from "../../core/utils/invalidate-cache";

export class MovieService {
  constructor(private repo: MovieRepository) {}

  async getMovies(dto?: GetMoviesQueryDTO): Promise<Movie[]> {
    try {
      if (isDefaultQuery(dto)) {
        const cachedMovies = await redis.get("movies");

        if (cachedMovies) {
          return MovieFactory.toDomainList(
            JSON.parse(cachedMovies) as PrismaMovieWithRelations[],
          );
        }

        const movies = await this.repo.find();
        await redis.set("movies", JSON.stringify(movies), { EX: 3600 });
        return MovieFactory.toDomainList(
          movies,
        );
      }
      const { search, searchby, page, pagesize, sort, sortby } = dto || {};

      const pageNum = Number(page) || 1;
      const limitNum = pagesize ? Number(pagesize) : undefined;

      const input: MovieFilterInput = {
        search: search || undefined,
        searchby: searchby || undefined,
        page: pageNum,
        pagesize: limitNum,
        sort: sort || undefined,
        sortby: sortby || undefined,
      };
      const key = CacheKeys.movieList(input);

      const cached = await redis.get(key);

      if (cached) {
        return MovieFactory.toDomainList(
          JSON.parse(cached) as PrismaMovieWithRelations[],
        );
      }
      const movies = await this.repo.find(input);
      await redis.set(key, JSON.stringify(movies), { EX: 3600 });
      return MovieFactory.toDomainList(
        movies,
      );
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
      return MovieFactory.toDomainList(
        movies,
      );
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
      return MovieFactory.toDomainList(
        movies,
      );
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error
          ? error.message
          : "Failed to get contributed movies";
      throw new BadRequestError(message, error);
    }
  }

  async getMoviesByCategory(category: string): Promise<Movie[]> {
    try {
      const movies = await this.repo.findByCategory(category);
      return MovieFactory.toDomainList(
        movies,
      );
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
      return MovieFactory.toDomainList(
        movies,
      );
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
      const key = CacheKeys.movieDetail(id);

      const cached = await redis.get(key);

      if (cached) {
        return MovieFactory.toDomain(
          JSON.parse(cached) as PrismaMovieWithRelations,
        );
      }
      const movie = await this.repo.findById(id);
      if (!movie) {
        throw new NotFoundError(`Movie with id ${id} not found`);
      }

      await redis.set(key, JSON.stringify(movie), { EX: 3600 });

      return MovieFactory.toDomain(
        movie,
      );
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get movie";
      throw new BadRequestError(message, error);
    }
  }

  async createMovie(dto: CreateMovieBodyDTO, userId: string): Promise<Movie> {
    try {
      let thumbnailUrl = "";
      if (dto.thumbnail instanceof File) {
        thumbnailUrl = await uploadToR2(dto.thumbnail);
      } else {
        thumbnailUrl = dto.thumbnail;
      }

      const directors = dto.director || [];
      const producers = dto.producer || [];
      const writers = dto.writer || [];
      const cast = dto.cast || [];
      const dops = dto.dop || [];
      const editors = dto.editor || [];
      const btsVideo = dto.btsVideo || [];

      const input: CreateMovieInput = {
        title: dto.title,
        description: dto.description,
        thumbnail: thumbnailUrl,
        youtubeUrl: dto.youtubeUrl,
        trailerUrl: dto.trailerUrl || null,
        categoryId: dto.categoryId,
        year: Number(dto.year),
        duration: Number(dto.duration),
        matchRate: 100,
        aspectRatio: dto.aspectRatio,
        ageRatingId: dto.ageRatingId,
        universityId: dto.universityId || null,
        languageId: dto.languageId || null,
        targetGroupId: dto.targetGroupId || null,
        hasProfanity:
          String(dto.hasProfanity) === "true" || dto.hasProfanity === true,
        hasDrugs: String(dto.hasDrugs) === "true" || dto.hasDrugs === true,
        colorType: (dto.colorType as ColorType) || "color",
        studio: dto.studio || null,
        createdBy: userId,
        btsVideos: btsVideo,
      };

      const movieRecord = await this.repo.create(input);

      await associateCrewBulk(
        {
          movieId: movieRecord.id,
          directors,
          producers,
          writers,
          cast,
          dops,
          editors,
        },
        userId,
      );

      const movie = await this.repo.findById(movieRecord.id);
      if (!movie) {
        throw new Error("Failed to retrieve created movie");
      }

      await invalidateCache(["movies", "movie:list:*"]);

      return MovieFactory.toDomain(
        movie,
      );
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to create movie";
      throw new BadRequestError(message, error);
    }
  }

  async updateMovie(
    id: string,
    dto: UpdateMovieBodyDTO,
    userId: string,
    role: string,
  ): Promise<Movie> {
    try {
      const existing = await this.repo.findById(id);
      if (!existing) {
        throw new NotFoundError(`Movie with id ${id} not found`);
      }

      if (existing.createdBy !== userId && role !== "admin") {
        throw new ForbiddenError(
          "You do not have permission to update this movie",
        );
      }

      let thumbnailUrl = existing.thumbnail;
      if (dto.thumbnail instanceof File) {
        thumbnailUrl = await uploadToR2(dto.thumbnail);
      } else if (typeof dto.thumbnail === "string") {
        thumbnailUrl = dto.thumbnail;
      }

      const directors = dto.director || [];
      const producers = dto.producer || [];
      const writers = dto.writer || [];
      const cast = dto.cast || [];
      const dops = dto.dop || [];
      const editors = dto.editor || [];
      const btsVideo = dto.btsVideo || [];

      const input: UpdateMovieInput = {
        title: dto.title,
        description: dto.description,
        thumbnail: thumbnailUrl,
        youtubeUrl: dto.youtubeUrl,
        trailerUrl: dto.trailerUrl || null,
        categoryId: dto.categoryId,
        year: Number(dto.year),
        duration: Number(dto.duration),
        matchRate: existing.matchRate,
        aspectRatio: dto.aspectRatio,
        ageRatingId: dto.ageRatingId,
        universityId: dto.universityId || null,
        languageId: dto.languageId || null,
        targetGroupId: dto.targetGroupId || null,
        hasProfanity:
          String(dto.hasProfanity) === "true" || dto.hasProfanity === true,
        hasDrugs: String(dto.hasDrugs) === "true" || dto.hasDrugs === true,
        colorType: (dto.colorType as ColorType) || "color",
        studio: dto.studio || null,
        btsVideos: btsVideo,
      };

      await this.repo.update(id, input);

      await associateCrewBulk(
        {
          movieId: id,
          directors,
          producers,
          writers,
          cast,
          dops,
          editors,
        },
        userId,
      );

      const movie = await this.repo.findById(id);
      if (!movie) {
        throw new Error("Failed to retrieve updated movie");
      }

      await invalidateCache(["movies", "movie:list:*", `movie:${id}`]);

      return MovieFactory.toDomain(
        movie,
      );
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
        throw new ForbiddenError(
          "You do not have permission to delete this movie",
        );
      }
      const movie = await this.repo.delete(id);
      if (movie.thumbnail) {
        await deleteFromR2(movie.thumbnail);
      }

      await invalidateCache(["movies", "movie:list:*", `movie:${id}`]);

      return MovieFactory.toDomain(
        movie,
      );
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to delete movie";
      throw new BadRequestError(message, error);
    }
  }
}

import { AppError, NotFoundError, BadRequestError } from "../../core/error";
import {
  Movie,
  CreateMovieBodyInput,
  UpdateMovieBodyInput,
  GetMoviesQueryInput,
} from "./domain/movie";
import { MovieRepository } from "./domain/movie.repository";
import { MovieBtsRepository } from "./domain/movie-bts.repository";
import { MovieFactory } from "./factory";
import { uploadToSupabase } from "../../lib/supabase";
import { isDefaultQuery } from "../../core/utils/query";
import { parseStringOrArray } from "../../core/utils/parser";
import { associateCrewBulk } from "../../lib/crew";

export class MovieService {
  constructor(
    private repo: MovieRepository,
    private btsRepo: MovieBtsRepository,
  ) {}

  async getMovies(params?: GetMoviesQueryInput): Promise<Movie[]> {
    try {
      if (isDefaultQuery(params)) {
        const movies = await this.repo.find();
        return MovieFactory.toDomainList(movies);
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
      return MovieFactory.toDomainList(movies);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get movies";
      throw new BadRequestError(message, error);
    }
  }

  async getMoviesByCategory(category: string): Promise<Movie[]> {
    try {
      const movies = await this.repo.findByCategory(category);
      return MovieFactory.toDomainList(movies);
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
      return MovieFactory.toDomainList(movies);
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
      return MovieFactory.toDomain(movie);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get movie";
      throw new BadRequestError(message, error);
    }
  }

  async createMovie(data: CreateMovieBodyInput): Promise<Movie> {
    try {
      let thumbnailUrl = "";
      if (data.thumbnail instanceof File) {
        thumbnailUrl = await uploadToSupabase(data.thumbnail);
      } else {
        thumbnailUrl = data.thumbnail;
      }

      const directors = parseStringOrArray(data.director);
      const producers = parseStringOrArray(data.producer);
      const writers = parseStringOrArray(data.writer);
      const cast = parseStringOrArray(data.cast);
      const dops = parseStringOrArray(data.dop);
      const editors = parseStringOrArray(data.editor);
      const btsVideo = parseStringOrArray(data.btsVideo);

      const movieRecord = await this.repo.create({
        title: data.title,
        description: data.description,
        thumbnail: thumbnailUrl,
        youtubeUrl: data.youtubeUrl,
        trailerUrl: data.trailerUrl || null,
        category: data.category,
        year: Number(data.year),
        duration: Number(data.duration),
        matchRate: Number(data.matchRate),
        ageRating: data.ageRating,
        university: data.university || null,
        language: data.language || null,
        targetGroup: data.targetGroup || null,
        hasProfanity: String(data.hasProfanity) === "true" || data.hasProfanity === true,
        hasDrugs: String(data.hasDrugs) === "true" || data.hasDrugs === true,
        colorType: data.colorType || "COLOR",
        studio: data.studio || null,
      });

      await associateCrewBulk(movieRecord.id, directors, producers, writers, cast, dops, editors);

      await this.btsRepo.create(movieRecord.id, btsVideo);

      const movie = await this.repo.findById(movieRecord.id);
      if (!movie) {
        throw new Error("Failed to retrieve created movie");
      }
      return MovieFactory.toDomain(movie);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to create movie";
      throw new BadRequestError(message, error);
    }
  }

  async updateMovie(id: string, data: UpdateMovieBodyInput): Promise<Movie> {
    try {
      const existing = await this.repo.findById(id);
      if (!existing) {
        throw new NotFoundError(`Movie with id ${id} not found`);
      }

      let thumbnailUrl = existing.thumbnail;
      if (data.thumbnail instanceof File) {
        thumbnailUrl = await uploadToSupabase(data.thumbnail);
      } else if (typeof data.thumbnail === "string") {
        thumbnailUrl = data.thumbnail;
      }

      const directors = parseStringOrArray(data.director);
      const producers = parseStringOrArray(data.producer);
      const writers = parseStringOrArray(data.writer);
      const cast = parseStringOrArray(data.cast);
      const dops = parseStringOrArray(data.dop);
      const editors = parseStringOrArray(data.editor);
      const btsVideo = parseStringOrArray(data.btsVideo);

      await this.repo.update(id, {
        title: data.title,
        description: data.description,
        thumbnail: thumbnailUrl,
        youtubeUrl: data.youtubeUrl,
        trailerUrl: data.trailerUrl || null,
        category: data.category,
        year: Number(data.year),
        duration: Number(data.duration),
        matchRate: Number(data.matchRate),
        ageRating: data.ageRating,
        university: data.university || null,
        language: data.language || null,
        targetGroup: data.targetGroup || null,
        hasProfanity: String(data.hasProfanity) === "true" || data.hasProfanity === true,
        hasDrugs: String(data.hasDrugs) === "true" || data.hasDrugs === true,
        colorType: data.colorType || "COLOR",
        studio: data.studio || null,
      });

      await associateCrewBulk(id, directors, producers, writers, cast, dops, editors);

      await this.btsRepo.upsert(id, btsVideo);

      const movie = await this.repo.findById(id);
      if (!movie) {
        throw new Error("Failed to retrieve updated movie");
      }
      return MovieFactory.toDomain(movie);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to update movie";
      throw new BadRequestError(message, error);
    }
  }

  async deleteMovie(id: string): Promise<Movie> {
    try {
      const existing = await this.repo.findById(id);
      if (!existing) {
        throw new NotFoundError(`Movie with id ${id} not found`);
      }
      const movie = await this.repo.delete(id);
      return MovieFactory.toDomain(movie);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to delete movie";
      throw new BadRequestError(message, error);
    }
  }
}

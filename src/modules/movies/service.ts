import { AppError, NotFoundError, BadRequestError } from "../../core/error";
import {
  Movie,
  CreateMovieBodyInput,
  UpdateMovieBodyInput,
  GetMoviesQueryInput,
} from "./domain/movie";
import { MovieRepository } from "./domain/movie.repository";
import { MovieFactory } from "./factory";
import { uploadToSupabase, resolveUploadedFiles } from "../../lib/supabase";

export class MovieService {
  constructor(private repo: MovieRepository) {}

  async getMovies(params?: GetMoviesQueryInput): Promise<Movie[]> {
    try {
      const search = params?.search?.trim() || "";
      const searchby = params?.searchby?.trim() || "";
      const page = params?.page?.trim() || "1";
      const pagesize = params?.pagesize?.trim() || "";
      const sort = params?.sort?.trim() || "desc";
      const sortby = params?.sortby?.trim() || "";

      const isDefault =
        search === "" &&
        searchby === "" &&
        page === "1" &&
        pagesize === "" &&
        sort === "desc" &&
        sortby === "";

      if (isDefault) {
        const movies = await this.repo.find();
        return MovieFactory.toDomainList(movies);
      }

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
      const movie = await this.repo.create({
        ...data,
        thumbnail: thumbnailUrl,
      });
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

      const movie = await this.repo.update(id, {
        ...data,
        thumbnail: thumbnailUrl,
      });
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

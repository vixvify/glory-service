import {
  NotFoundError,
  InternalServerError,
} from "../../core/error";
import {
  Movie,
  CreateMovieBodyDTO,
  UpdateMovieBodyDTO,
  GetMoviesQueryDTO,
  MovieFilterInput,
  CreateMovieInput,
  UpdateMovieInput,
  PrismaMovieWithRelations,
} from "./domain/movie";
import { MovieRepository } from "./domain/movie.repository";
import { CrewMemberRepository } from "../crew-members/domain/crew-member.repository";
import { MovieCrewRepository } from "./domain/movie-crew.repository";
import { AuthRepository } from "../auth/domain/auth.repository";
import { MovieFactory } from "./factory";
import { uploadToR2, deleteFromR2 } from "../../lib/r2";
import { isDefaultQuery } from "../../core/utils/query";
import { associateCrewBulk } from "../../lib/crew";
import { redis } from "../../lib/redis";
import { CacheKeys } from "../../core/utils/cache-key";
import { invalidateCache } from "../../core/utils/invalidate-cache";
import { toBoolean } from "../../core/utils/coerce";
import { extractCrewInput } from "../../core/utils/movie-crew";
import { handleServiceError } from "../../core/utils/handle-error";

export class MovieService {
  constructor(
    private repo: MovieRepository,
    private crewMemberRepo: CrewMemberRepository,
    private movieCrewRepo: MovieCrewRepository,
    private authRepo: AuthRepository,
  ) {}

  private async getCachedOrFetch(
    key: string,
    fetchFn: () => Promise<PrismaMovieWithRelations[]>,
  ): Promise<Movie[]> {
    const cached = await redis.get(key);
    if (cached) {
      return MovieFactory.toDomainList(JSON.parse(cached) as PrismaMovieWithRelations[]);
    }
    const movies = await fetchFn();
    await redis.set(key, JSON.stringify(movies), { EX: 3600 });
    return MovieFactory.toDomainList(movies);
  }

  async getMovies(dto?: GetMoviesQueryDTO): Promise<Movie[]> {
    try {
      if (isDefaultQuery(dto)) {
        return this.getCachedOrFetch(
          CacheKeys.movieListDefault(),
          () => this.repo.find(),
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

      return this.getCachedOrFetch(
        CacheKeys.movieList(input),
        () => this.repo.find(input),
      );
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get movies");
    }
  }

  async getMyMovies(userId: string): Promise<Movie[]> {
    try {
      const movies = await this.repo.find({ createdBy: userId });
      return MovieFactory.toDomainList(movies);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get my movies");
    }
  }

  async getContributedMovies(userId: string): Promise<Movie[]> {
    try {
      const movies = await this.repo.findContributed(userId);
      return MovieFactory.toDomainList(movies);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get contributed movies");
    }
  }

  async getMoviesByCategory(category: string): Promise<Movie[]> {
    try {
      const movies = await this.repo.findByCategory(category);
      return MovieFactory.toDomainList(movies);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get movies by category");
    }
  }

  async getMoviesByUniversity(university: string): Promise<Movie[]> {
    try {
      const movies = await this.repo.findByUniversity(university);
      return MovieFactory.toDomainList(movies);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get movies by university");
    }
  }

  async getMovieById(id: string): Promise<Movie> {
    try {
      const key = CacheKeys.movieDetail(id);
      const cached = await redis.get(key);
      if (cached) {
        return MovieFactory.toDomain(JSON.parse(cached) as PrismaMovieWithRelations);
      }

      const movie = await this.repo.findById(id);
      if (!movie) {
        throw new NotFoundError(`Movie with id ${id} not found`);
      }

      await redis.set(key, JSON.stringify(movie), { EX: 3600 });
      return MovieFactory.toDomain(movie);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get movie");
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

      const { directors, producers, writers, cast, dops, editors, btsVideos } =
        extractCrewInput(dto);

      const input: CreateMovieInput = {
        title: dto.title,
        description: dto.description,
        thumbnail: thumbnailUrl,
        youtubeUrl: dto.youtubeUrl,
        trailerUrl: dto.trailerUrl || null,
        categoryId: dto.categoryId,
        year: dto.year,
        duration: dto.duration,
        matchRate: 100,
        aspectRatio: dto.aspectRatio,
        ageRatingId: dto.ageRatingId,
        universityId: dto.universityId || null,
        languageId: dto.languageId || null,
        targetGroupId: dto.targetGroupId || null,
        hasProfanity: toBoolean(dto.hasProfanity),
        hasDrugs: toBoolean(dto.hasDrugs),
        colorType: dto.colorType,
        studio: dto.studio || null,
        createdBy: userId,
        btsVideos,
      };

      const movieRecord = await this.repo.create(input);

      await associateCrewBulk(
        { movieId: movieRecord.id, directors, producers, writers, cast, dops, editors },
        userId,
        { crewMemberRepo: this.crewMemberRepo, movieCrewRepo: this.movieCrewRepo, authRepo: this.authRepo },
      );

      const movie = await this.repo.findById(movieRecord.id);
      if (!movie) {
        throw new InternalServerError("Failed to retrieve created movie");
      }

      await invalidateCache([CacheKeys.movieListDefault(), CacheKeys.movieListWildcard()]);
      return MovieFactory.toDomain(movie);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to create movie");
    }
  }

  async updateMovie(
    id: string,
    dto: UpdateMovieBodyDTO,
    userId: string,
  ): Promise<Movie> {
    try {
      const existing = await this.repo.findById(id);
      if (!existing) {
        throw new NotFoundError(`Movie with id ${id} not found`);
      }

      let thumbnailUrl = existing.thumbnail;
      if (dto.thumbnail instanceof File) {
        thumbnailUrl = await uploadToR2(dto.thumbnail);
      } else if (typeof dto.thumbnail === "string") {
        thumbnailUrl = dto.thumbnail;
      }

      const { directors, producers, writers, cast, dops, editors, btsVideos } =
        extractCrewInput(dto);

      const input: UpdateMovieInput = {
        title: dto.title,
        description: dto.description,
        thumbnail: thumbnailUrl,
        youtubeUrl: dto.youtubeUrl,
        trailerUrl: dto.trailerUrl || null,
        categoryId: dto.categoryId,
        year: dto.year,
        duration: dto.duration,
        matchRate: existing.matchRate,
        aspectRatio: dto.aspectRatio,
        ageRatingId: dto.ageRatingId,
        universityId: dto.universityId || null,
        languageId: dto.languageId || null,
        targetGroupId: dto.targetGroupId || null,
        hasProfanity: toBoolean(dto.hasProfanity),
        hasDrugs: toBoolean(dto.hasDrugs),
        colorType: dto.colorType,
        studio: dto.studio || null,
        btsVideos,
      };

      await this.repo.update(id, input);

      await associateCrewBulk(
        { movieId: id, directors, producers, writers, cast, dops, editors },
        userId,
        { crewMemberRepo: this.crewMemberRepo, movieCrewRepo: this.movieCrewRepo, authRepo: this.authRepo },
      );

      const movie = await this.repo.findById(id);
      if (!movie) {
        throw new InternalServerError("Failed to retrieve updated movie");
      }

      await invalidateCache([
        CacheKeys.movieListDefault(),
        CacheKeys.movieListWildcard(),
        CacheKeys.movieDetail(id),
      ]);
      return MovieFactory.toDomain(movie);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to update movie");
    }
  }

  async deleteMovie(id: string): Promise<Movie> {
    try {
      const movie = await this.repo.delete(id);
      if (movie.thumbnail) {
        await deleteFromR2(movie.thumbnail);
      }

      await invalidateCache([
        CacheKeys.movieListDefault(),
        CacheKeys.movieListWildcard(),
        CacheKeys.movieDetail(id),
      ]);

      return MovieFactory.toDomain(movie);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to delete movie");
    }
  }
}

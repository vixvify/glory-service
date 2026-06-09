import { NotFoundError, InternalServerError } from "../../core/error";
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
import { getCachedOrFetch } from "../../core/utils/cache";
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

  async getMovies(dto?: GetMoviesQueryDTO): Promise<Movie[]> {
    try {
      if (isDefaultQuery(dto)) {
        const rawMovies = await getCachedOrFetch(
          CacheKeys.movieListDefault(),
          () => this.repo.find(),
        );
        return MovieFactory.toDomainList(rawMovies);
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

      const rawMovies = await getCachedOrFetch(CacheKeys.movieList(input), () =>
        this.repo.find(input),
      );
      return MovieFactory.toDomainList(rawMovies);
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
      const rawMovie = await getCachedOrFetch(
        CacheKeys.movieDetail(id),
        async () => {
          const m = await this.repo.findById(id);
          if (!m) {
            throw new NotFoundError(`Movie with id ${id} not found`);
          }
          return m;
        },
      );
      return MovieFactory.toDomain(rawMovie);
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
        ...dto,
        thumbnail: thumbnailUrl,
        matchRate: 100,
        hasProfanity: toBoolean(dto.hasProfanity),
        hasDrugs: toBoolean(dto.hasDrugs),
        createdBy: userId,
        btsVideos,
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
        {
          crewMemberRepo: this.crewMemberRepo,
          movieCrewRepo: this.movieCrewRepo,
          authRepo: this.authRepo,
        },
      );

      const movie = await this.repo.findById(movieRecord.id);
      if (!movie) {
        throw new InternalServerError("Failed to retrieve created movie");
      }

      await invalidateCache([
        CacheKeys.movieListDefault(),
        CacheKeys.movieListWildcard(),
      ]);
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
        ...dto,
        thumbnail: thumbnailUrl,
        hasProfanity: toBoolean(dto.hasProfanity),
        hasDrugs: toBoolean(dto.hasDrugs),
        btsVideos,
        matchRate: existing.matchRate,
      };

      await this.repo.update(id, input);

      await associateCrewBulk(
        { movieId: id, directors, producers, writers, cast, dops, editors },
        userId,
        {
          crewMemberRepo: this.crewMemberRepo,
          movieCrewRepo: this.movieCrewRepo,
          authRepo: this.authRepo,
        },
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

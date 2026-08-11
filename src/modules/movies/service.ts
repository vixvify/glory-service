import { NotFoundError, InternalServerError } from "../../core/error";
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
import { CrewMemberRepository } from "../crew-members/domain/crew-member.repository";
import { MovieCrewRepository } from "./domain/movie-crew.repository";

import { AuthRepository } from "../auth/domain/auth.repository";
import { MovieFactory } from "./factory";
import { uploadToR2, deleteFromR2 } from "../../lib/r2";
import { isDefaultQuery } from "../../core/utils/db/query";
import { getCachedOrFetch } from "../../core/utils/cache/cache";
import { CacheKeys } from "../../core/utils/cache/cache-key";
import { MasterDataRepository } from "../master-data/domain/masterdata.repository";
import { AssociateCrewBulkInput } from "./domain/movie";
import { MovieCrewInputItem } from "./parser";
import { invalidateCache } from "../../core/utils/cache/invalidate-cache";
import { toBoolean } from "../../core/utils/transform/coerce";
import { extractCrewInput } from "../../core/utils/movie/movie-crew";
import { handleServiceError } from "../../core/utils/error/handle-error";

export class MovieService {
  constructor(
    private repo: MovieRepository,
    private crewMemberRepo: CrewMemberRepository,
    private movieCrewRepo: MovieCrewRepository,
    private authRepo: AuthRepository,
    private masterDataRepo: MasterDataRepository,
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

      const { search, searchby, page, pagesize, sort, sortby, aspectRatio } =
        dto || {};
      const pageNum = Number(page) || 1;
      const limitNum = pagesize ? Number(pagesize) : undefined;

      const input: MovieFilterInput = {
        search: search || undefined,
        searchby: searchby || undefined,
        page: pageNum,
        pagesize: limitNum,
        sort: sort || undefined,
        sortby: sortby || undefined,
        aspectRatio: aspectRatio || undefined,
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

  async getMoviesBySchool(school: string): Promise<Movie[]> {
    try {
      const movies = await this.repo.findBySchool(school);
      return MovieFactory.toDomainList(movies);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get movies by school");
    }
  }

  async getMoviesByStudio(studio: string): Promise<Movie[]> {
    try {
      const movies = await this.repo.findByStudio(studio);
      return MovieFactory.toDomainList(movies);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get movies by studio");
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

  async getMovieWithAward(): Promise<Movie[]> {
    try {
      const movies = await this.repo.findMovieWithAward();
      return MovieFactory.toDomainList(movies);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get movies with award");
    }
  }

  async getMovieWithBts(): Promise<Movie[]> {
    try {
      const movies = await this.repo.findMovieWithBts();
      return MovieFactory.toDomainList(movies);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get movies with bts");
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

      const { crew, btsVideos } = extractCrewInput(dto);

      let releaseDate = new Date();
      if (dto.releaseDate) {
        const parsedDate = new Date(dto.releaseDate);
        if (!isNaN(parsedDate.getTime())) {
          releaseDate = parsedDate;
        }
      }

      const {
        crew: _crew,
        btsVideo,
        categoryIds,
        contentWarningIds,
        tags,
        awards: _awards,
        ...restDto
      } = dto;

      const tagIds = await this.masterDataRepo.upsertTags(tags || []);

      const input: CreateMovieInput = {
        ...restDto,
        thumbnail: thumbnailUrl,
        releaseDate,
        duration: Number(dto.duration),
        matchRate: 100,
        otherContentWarning: dto.otherContentWarning || null,
        trailerUrls: dto.trailerUrls || [],
        createdBy: userId,
        btsVideos,
        categories: {
          connect: (categoryIds || []).map((id) => ({ id })),
        },
        contentWarnings: contentWarningIds
          ? {
              connect: contentWarningIds.map((id) => ({ id })),
            }
          : undefined,
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
        awards: {
          create: MovieFactory.toAwardPersistence(_awards),
        },
      };

      const movieRecord = await this.repo.create(input);

      await this.associateCrewBulk(
        {
          movieId: movieRecord.id,
          crew,
        },
        userId,
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

      const { crew, btsVideos } = extractCrewInput(dto);

      let releaseDate = new Date();
      if (dto.releaseDate) {
        const parsedDate = new Date(dto.releaseDate);
        if (!isNaN(parsedDate.getTime())) {
          releaseDate = parsedDate;
        }
      }

      const {
        crew: _crew,
        btsVideo,
        categoryIds,
        contentWarningIds,
        tags,
        awards: _awards,
        ...restDto
      } = dto;

      let tagConnect: { set: Array<{ id: string }> } | undefined;
      if (tags !== undefined) {
        const tagIds = await this.masterDataRepo.upsertTags(tags);
        tagConnect = {
          set: tagIds.map((id) => ({ id })),
        };
      }

      const input: UpdateMovieInput = {
        ...restDto,
        thumbnail: thumbnailUrl,
        releaseDate,
        duration: Number(dto.duration),
        matchRate: existing.matchRate,
        btsVideos,
        otherContentWarning: dto.otherContentWarning || null,
        trailerUrls: dto.trailerUrls || [],
        categories: {
          set: (categoryIds || []).map((id) => ({ id })),
        },
        contentWarnings:
          contentWarningIds !== undefined
            ? {
                set: (contentWarningIds || []).map((id) => ({ id })),
              }
            : undefined,
        tags: tagConnect,
        awards: {
          deleteMany: {},
          create: MovieFactory.toAwardPersistence(_awards),
        },
      };

      await this.repo.update(id, input);

      await this.associateCrewBulk({ movieId: id, crew }, userId);

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

  private async associateCrewBulk(
    input: AssociateCrewBulkInput,
    createdBy: string,
  ): Promise<void> {
    const { movieId, crew } = input;

    const items: Array<{ item: MovieCrewInputItem; role: string }> = [];

    for (const val of crew) {
      if (
        val &&
        val.role &&
        (val.crewMemberId || (val.name && val.name.trim()))
      ) {
        items.push({
          item: {
            crewMemberId: val.crewMemberId,
            name: val.name,
            email: val.email,
          },
          role: val.role.trim().toUpperCase(),
        });
      }
    }

    if (items.length === 0) return;

    const crewIdMap = new Map<string, string>();

    const explicitIds = Array.from(
      new Set(
        items
          .map((x) => x.item.crewMemberId)
          .filter((id): id is string => !!id),
      ),
    );

    if (explicitIds.length > 0) {
      const existingMembers =
        await this.crewMemberRepo.findManyByIds(explicitIds);

      if (existingMembers.length !== explicitIds.length) {
        const foundUuids = new Set(existingMembers.map((m) => m.id));
        const missing = explicitIds.find((id) => !foundUuids.has(id));
        throw new NotFoundError(`Crew member with ID ${missing} not found`);
      }

      for (const m of existingMembers) {
        crewIdMap.set(m.id, m.id);
      }
    }

    const itemsToResolve = items.filter((i) => !i.item.crewMemberId);

    if (itemsToResolve.length > 0) {
      const uniqueEmails = [
        ...new Set(
          itemsToResolve
            .map((i) => i.item.email?.trim().toLowerCase())
            .filter((e): e is string => !!e),
        ),
      ];
      const uniqueNames = [
        ...new Set(
          itemsToResolve
            .map((i) => i.item.name?.trim())
            .filter((n): n is string => !!n),
        ),
      ];

      const [byEmailBatch, byNameBatch] = await Promise.all([
        uniqueEmails.length > 0
          ? this.crewMemberRepo.findManyByEmails(uniqueEmails)
          : [],
        uniqueNames.length > 0
          ? this.crewMemberRepo.findManyByNames(uniqueNames)
          : [],
      ]);

      const emailMap = new Map(
        byEmailBatch.map((m) => [m.email?.toLowerCase() ?? "", m]),
      );
      const nameMap = new Map(byNameBatch.map((m) => [m.name, m]));

      const emailsNeedingUserLink = byEmailBatch
        .filter((m) => !m.email || !m.userId)
        .map((m) => m.email?.toLowerCase() ?? "")
        .filter(Boolean);

      const allEmailsForUserLookup = [
        ...new Set([...uniqueEmails, ...emailsNeedingUserLink]),
      ];
      const usersByEmail = new Map<string, string>();
      if (allEmailsForUserLookup.length > 0) {
        await Promise.all(
          allEmailsForUserLookup.map(async (email) => {
            const user = await this.authRepo.findByEmail(email);
            if (user) usersByEmail.set(email, user.id);
          }),
        );
      }

      for (const { item } of itemsToResolve) {
        const email = item.email?.trim().toLowerCase() || "";
        const name = item.name?.trim() || "";

        if (!name) continue;

        let memberId = "";

        if (email) {
          const byEmail = emailMap.get(email);
          if (byEmail) {
            memberId = byEmail.id;
            if (!byEmail.email && email) {
              const userId = usersByEmail.get(email) ?? null;
              await this.crewMemberRepo.update(byEmail.id, {
                name: byEmail.name,
                email,
                userId,
              });
            }
          }
        }

        if (!memberId) {
          const byName = nameMap.get(name);
          if (byName) {
            memberId = byName.id;
            if (!byName.email && email) {
              const userId = usersByEmail.get(email) ?? null;
              await this.crewMemberRepo.update(byName.id, {
                name: byName.name,
                email,
                userId,
              });
            }
          }
        }

        if (!memberId) {
          const userId = email ? (usersByEmail.get(email) ?? null) : null;
          const created = await this.crewMemberRepo.create({
            name,
            email: email || null,
            userId,
            createdBy,
          });
          memberId = created.id;
        }

        const itemKey = email ? `email:${email}` : `name:${name}`;
        crewIdMap.set(itemKey, memberId);
      }
    }

    const dbCrewRoles = await this.masterDataRepo.getCrewRoles();
    const crewRoleMap = new Map(
      dbCrewRoles.map((cr) => [cr.name.toUpperCase(), cr.id]),
    );

    const movieCrewsData = items.map((item) => {
      let itemKey = "";
      if (item.item.crewMemberId) {
        itemKey = item.item.crewMemberId;
      } else {
        const email = item.item.email?.trim().toLowerCase() || "";
        const name = item.item.name?.trim() || "";
        itemKey = email ? `email:${email}` : `name:${name}`;
      }

      const crewMemberId = crewIdMap.get(itemKey);
      if (!crewMemberId) {
        throw new Error(`Failed to map crew member for key: ${itemKey}`);
      }
      const roleId = crewRoleMap.get(item.role.toUpperCase());
      if (!roleId) {
        throw new Error(`Role ID not found for role: ${item.role}`);
      }
      return { movieId, crewMemberId, roleId };
    });

    await this.movieCrewRepo.replaceMovieCrew(movieId, movieCrewsData);
  }
}

import { prisma } from "../lib/prisma";
import { MovieRepository } from "../modules/movies/domain/movie.repository";
import { Movie as PrismaMovie, Prisma } from "@prisma/client";
import { MovieFilterInput } from "../modules/movies/domain/movie";
import calculatePagination from "../core/utils/calculation/pagination";
import {
  CreateMovieInput,
  UpdateMovieInput,
  movieIncludes,
  PrismaMovieWithRelations,
} from "../modules/movies/domain/movie";

export class MovieRepositoryImpl implements MovieRepository {
  async find(input?: MovieFilterInput): Promise<PrismaMovieWithRelations[]> {
    if (!input) {
      return prisma.movie.findMany({
        include: movieIncludes,
        orderBy: { createdAt: "desc" },
      });
    }
    const {
      search,
      searchby,
      page,
      pagesize,
      sort = "desc",
      sortby = "createdAt",
      createdBy,
      aspectRatio,
    } = input;

    const where: Prisma.MovieWhereInput = {
      ...(search &&
        searchby !== "releaseDate" &&
        searchby !== "category" &&
        searchby !== "aspectRatio" &&
        searchby !== "university" &&
        searchby !== "school" &&
        searchby !== "studio" && {
          [searchby || "title"]: {
            contains: search,
            mode: "insensitive",
          },
        }),
      ...(search &&
        searchby === "category" && {
          categories: {
            some: {
              OR: [
                { name: { contains: search, mode: "insensitive" } },
                { labelTh: { contains: search, mode: "insensitive" } },
              ],
            },
          },
        }),
      ...(search &&
        searchby === "releaseDate" && {
          releaseDate: new Date(search),
        }),
      ...(searchby === "university" && {
        universityId: { not: null },
        ...(search && {
          university: {
            name: { contains: search, mode: "insensitive" },
          },
        }),
      }),
      ...(searchby === "school" && {
        schoolId: { not: null },
        ...(search && {
          school: {
            name: { contains: search, mode: "insensitive" },
          },
        }),
      }),
      ...(searchby === "studio" && {
        studio: {
          not: null,
          ...(search && {
            contains: search,
            mode: "insensitive",
          }),
        },
      }),
      ...(aspectRatio && { aspectRatio: aspectRatio }),
      ...(createdBy && { createdBy }),
    };

    return prisma.movie.findMany({
      where,
      include: movieIncludes,
      orderBy: {
        [sortby]: sort,
      },
      ...calculatePagination(page, pagesize),
    });
  }

  async findByCategory(category: string): Promise<PrismaMovieWithRelations[]> {
    return prisma.movie.findMany({
      where: {
        categories: {
          some: {
            name: { equals: category, mode: "insensitive" },
          },
        },
      },
      include: movieIncludes,
      orderBy: { createdAt: "desc" },
    });
  }

  async findByUniversity(
    university: string,
  ): Promise<PrismaMovieWithRelations[]> {
    return prisma.movie.findMany({
      where: {
        university: {
          name: { equals: university, mode: "insensitive" },
        },
      },
      include: movieIncludes,
      orderBy: { createdAt: "desc" },
    });
  }

  async findBySchool(school: string): Promise<PrismaMovieWithRelations[]> {
    return prisma.movie.findMany({
      where: {
        school: {
          name: { equals: school, mode: "insensitive" },
        },
      },
      include: movieIncludes,
      orderBy: { createdAt: "desc" },
    });
  }

  async findByStudio(studio: string): Promise<PrismaMovieWithRelations[]> {
    return prisma.movie.findMany({
      where: {
        studio: { equals: studio, mode: "insensitive" },
      },
      include: movieIncludes,
      orderBy: { createdAt: "desc" },
    });
  }

  async findContributed(userId: string): Promise<PrismaMovieWithRelations[]> {
    return prisma.movie.findMany({
      where: {
        crew: {
          some: {
            crewMember: {
              userId,
            },
          },
        },
      },
      include: movieIncludes,
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string): Promise<PrismaMovieWithRelations | null> {
    return prisma.movie.findUnique({
      where: { id },
      include: movieIncludes,
    });
  }

  async findMovieWithAward(): Promise<PrismaMovieWithRelations[]> {
    return prisma.movie.findMany({
      include: movieIncludes,
      where: {
        awards: {
          some: {},
        },
      },
    });
  }

  async findMovieWithBts(): Promise<PrismaMovieWithRelations[]> {
    return prisma.movie.findMany({
      include: movieIncludes,
      where: {
        btsVideos: {
          isEmpty: false,
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async create(input: CreateMovieInput): Promise<PrismaMovie> {
    const {
      createdBy,
      ageRatingId,
      colorTypeId,
      universityId,
      schoolId,
      languageId,
      subtitleId,
      categories,
      contentWarnings,
      tags,
      ...rest
    } = input;

    return prisma.movie.create({
      data: {
        ...rest,
        creator: { connect: { id: createdBy } },
        ageRating: { connect: { id: ageRatingId } },
        colorType: { connect: { id: colorTypeId } },
        categories,
        contentWarnings,
        tags,
        ...(universityId && { university: { connect: { id: universityId } } }),
        ...(schoolId && { school: { connect: { id: schoolId } } }),
        ...(languageId && { language: { connect: { id: languageId } } }),
        ...(subtitleId && { subtitle: { connect: { id: subtitleId } } }),
      } as Prisma.MovieCreateInput,
    });
  }

  async update(id: string, input: UpdateMovieInput): Promise<PrismaMovie> {
    const {
      ageRatingId,
      colorTypeId,
      universityId,
      schoolId,
      languageId,
      subtitleId,
      categories,
      contentWarnings,
      tags,
      ...rest
    } = input;

    return prisma.movie.update({
      where: { id },
      data: {
        ...rest,
        categories,
        contentWarnings,
        tags,
        ...(ageRatingId && { ageRating: { connect: { id: ageRatingId } } }),
        ...(colorTypeId && { colorType: { connect: { id: colorTypeId } } }),
        ...(universityId !== undefined && {
          university: universityId
            ? { connect: { id: universityId } }
            : { disconnect: true },
        }),
        ...(schoolId !== undefined && {
          school: schoolId ? { connect: { id: schoolId } } : { disconnect: true },
        }),
        ...(languageId !== undefined && {
          language: languageId ? { connect: { id: languageId } } : { disconnect: true },
        }),
        ...(subtitleId !== undefined && {
          subtitle: subtitleId ? { connect: { id: subtitleId } } : { disconnect: true },
        }),
      } as Prisma.MovieUpdateInput,
    });
  }

  async delete(id: string): Promise<PrismaMovieWithRelations> {
    return prisma.movie.delete({
      where: { id },
      include: movieIncludes,
    });
  }

  async count(): Promise<number> {
    return prisma.movie.count();
  }

  async sumViews(): Promise<number> {
    const viewsResult = await prisma.movie.aggregate({
      _sum: {
        views: true,
      },
    });
    return viewsResult._sum.views || 0;
  }
}

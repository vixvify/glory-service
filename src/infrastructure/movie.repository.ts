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
        searchby !== "aspectRatio" && {
          [searchby || "title"]: {
            contains: search,
            mode: "insensitive",
          },
        }),
      ...(search &&
        searchby === "category" && {
          category: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        }),
      ...(search &&
        searchby === "releaseDate" && {
          releaseDate: new Date(search),
        }),
      ...(search &&
        searchby === "university" && {
          university: {
            equals: search,
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
        category: {
          name: { equals: category, mode: "insensitive" },
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
        university: { equals: university, mode: "insensitive" },
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

  async create(input: CreateMovieInput): Promise<PrismaMovie> {
    return prisma.movie.create({
      data: input,
    });
  }

  async update(id: string, input: UpdateMovieInput): Promise<PrismaMovie> {
    return prisma.movie.update({
      where: { id },
      data: input,
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

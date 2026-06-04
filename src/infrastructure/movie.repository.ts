import { prisma } from "../lib/prisma";
import { MovieRepository } from "../modules/movies/domain/movie.repository";
import { Movie as PrismaMovie, Prisma } from "@prisma/client";
import { MovieFilterParams } from "../modules/movies/domain/movie";
import calculatePagination from "../core/utils/pagination";
import {
  MovieRepositoryCreateInput,
  MovieRepositoryUpdateInput,
  MovieUserSelect,
} from "../modules/movies/domain/movie";

export class MovieRepositoryImpl implements MovieRepository {
  async find(params?: MovieFilterParams): Promise<PrismaMovie[]> {
    if (!params) {
      return prisma.movie.findMany({
        include: {
          crew: {
            include: {
              crewMember: {
                include: {
                  user: {
                    select: MovieUserSelect,
                  },
                },
              },
            },
          },
          bts: true,
          ratings: {
            include: {
              user: {
                select: MovieUserSelect,
              },
            },
          },
        },
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
    } = params;

    const where: Prisma.MovieWhereInput = {
      ...(search && searchby === "year" && { year: parseInt(search, 10) }),
      ...(search &&
        searchby !== "year" && {
          [searchby || "title"]: {
            contains: search,
            mode: "insensitive",
          },
        }),
    };

    return prisma.movie.findMany({
      where,
      include: {
        crew: {
          include: {
            crewMember: {
              include: {
                user: {
                  select: MovieUserSelect,
                },
              },
            },
          },
        },
        bts: true,
        ratings: {
          include: {
            user: {
              select: MovieUserSelect,
            },
          },
        },
      },
      orderBy: {
        [sortby]: sort,
      },
      ...calculatePagination(page, pagesize),
    });
  }

  async findByCategory(category: string): Promise<PrismaMovie[]> {
    return prisma.movie.findMany({
      where: {
        category: { equals: category, mode: "insensitive" },
      },
      include: {
        crew: {
          include: {
            crewMember: {
              include: {
                user: {
                  select: MovieUserSelect,
                },
              },
            },
          },
        },
        bts: true,
        ratings: {
          include: {
            user: {
              select: MovieUserSelect,
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByUniversity(university: string): Promise<PrismaMovie[]> {
    return prisma.movie.findMany({
      where: {
        university: { equals: university, mode: "insensitive" },
      },
      include: {
        crew: {
          include: {
            crewMember: {
              include: {
                user: {
                  select: MovieUserSelect,
                },
              },
            },
          },
        },
        bts: true,
        ratings: {
          include: {
            user: {
              select: MovieUserSelect,
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string): Promise<PrismaMovie | null> {
    return prisma.movie.findUnique({
      where: { id },
      include: {
        crew: {
          include: {
            crewMember: {
              include: {
                user: {
                  select: MovieUserSelect,
                },
              },
            },
          },
        },
        bts: true,
        ratings: {
          include: {
            user: {
              select: MovieUserSelect,
            },
          },
        },
      },
    });
  }

  async create(data: MovieRepositoryCreateInput): Promise<PrismaMovie> {
    return prisma.movie.create({
      data,
    });
  }

  async update(
    id: string,
    data: MovieRepositoryUpdateInput,
  ): Promise<PrismaMovie> {
    return prisma.movie.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<PrismaMovie> {
    return prisma.movie.delete({
      where: { id },
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

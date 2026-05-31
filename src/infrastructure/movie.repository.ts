import { prisma } from "../lib/prisma";
import {
  CreateMovieBodyInput,
  UpdateMovieBodyInput,
} from "../modules/movies/domain/movie";
import { MovieRepository } from "../modules/movies/domain/movie.repository";
import { Movie as PrismaMovie, Prisma } from "@prisma/client";
import { associateCrewBulk } from "../lib/crew";
import { MovieFilterParams } from "../modules/movies/domain/movie";
import calculatePagination from "../core/utils/pagination";

export class MovieRepositoryImpl implements MovieRepository {
  async find(params?: MovieFilterParams): Promise<PrismaMovie[]> {
    if (!params) {
      return prisma.movie.findMany({
        include: {
          crew: {
            include: {
              crewMember: true,
            },
          },
          bts: true,
          ratings: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                  role: true,
                },
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
      pagenumber,
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
            crewMember: true,
          },
        },
        bts: true,
        ratings: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
              },
            },
          },
        },
      },
      orderBy: {
        [sortby]: sort,
      },
      ...calculatePagination(page, pagenumber),
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
            crewMember: true,
          },
        },
        bts: true,
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
            crewMember: true,
          },
        },
        bts: true,
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
            crewMember: true,
          },
        },
        bts: true,
        ratings: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                name: true,
                role: true,
              },
            },
          },
        },
      },
    });
  }

  async create(
    data: Omit<CreateMovieBodyInput, "thumbnail" | "btsPhotos"> & {
      thumbnail: string;
      btsPhotos?: string;
    },
  ): Promise<PrismaMovie> {
    const directors = data.director
      ? Array.isArray(data.director)
        ? data.director
        : [data.director]
      : [];
    const producers = data.producer
      ? Array.isArray(data.producer)
        ? data.producer
        : [data.producer]
      : [];
    const writers = data.writer
      ? Array.isArray(data.writer)
        ? data.writer
        : [data.writer]
      : [];
    const cast = data.cast
      ? Array.isArray(data.cast)
        ? data.cast
        : [data.cast]
      : [];
    const btsVideo = data.btsVideo
      ? Array.isArray(data.btsVideo)
        ? data.btsVideo
        : [data.btsVideo]
      : [];
    const btsPhotos = data.btsPhotos
      ? data.btsPhotos
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    const movie = await prisma.movie.create({
      data: {
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        youtubeUrl: data.youtubeUrl,
        category: data.category,
        year: Number(data.year),
        duration: Number(data.duration),
        matchRate: Number(data.matchRate),
        ageRating: data.ageRating,
        university: data.university,
      },
    });

    await associateCrewBulk(movie.id, directors, producers, writers, cast);

    await prisma.movieBts.create({
      data: {
        movieId: movie.id,
        btsVideo,
        btsPhotos,
      },
    });

    const result = await this.findById(movie.id);
    if (!result) {
      throw new Error("Failed to retrieve created movie");
    }
    return result;
  }

  async update(
    id: string,
    data: Omit<UpdateMovieBodyInput, "thumbnail" | "btsPhotos"> & {
      thumbnail: string;
      btsPhotos?: string;
    },
  ): Promise<PrismaMovie> {
    const directors = data.director
      ? Array.isArray(data.director)
        ? data.director
        : [data.director]
      : [];
    const producers = data.producer
      ? Array.isArray(data.producer)
        ? data.producer
        : [data.producer]
      : [];
    const writers = data.writer
      ? Array.isArray(data.writer)
        ? data.writer
        : [data.writer]
      : [];
    const cast = data.cast
      ? Array.isArray(data.cast)
        ? data.cast
        : [data.cast]
      : [];
    const btsVideo = data.btsVideo
      ? Array.isArray(data.btsVideo)
        ? data.btsVideo
        : [data.btsVideo]
      : [];
    const btsPhotos = data.btsPhotos
      ? data.btsPhotos
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean)
      : [];

    await prisma.movie.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        youtubeUrl: data.youtubeUrl,
        category: data.category,
        year: Number(data.year),
        duration: Number(data.duration),
        matchRate: Number(data.matchRate),
        ageRating: data.ageRating,
        university: data.university,
      },
    });

    await prisma.movieCrew.deleteMany({
      where: { movieId: id },
    });

    await associateCrewBulk(id, directors, producers, writers, cast);

    await prisma.movieBts.upsert({
      where: { movieId: id },
      create: {
        movieId: id,
        btsVideo,
        btsPhotos,
      },
      update: {
        btsVideo,
        btsPhotos,
      },
    });

    const result = await this.findById(id);
    if (!result) {
      throw new Error("Failed to retrieve updated movie");
    }
    return result;
  }

  async delete(id: string): Promise<PrismaMovie> {
    return prisma.movie.delete({
      where: { id },
    });
  }
}

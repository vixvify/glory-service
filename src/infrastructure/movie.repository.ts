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
import { parseStringOrArray } from "../core/utils/parser";

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
    data: Omit<CreateMovieBodyInput, "thumbnail"> & {
      thumbnail: string;
    },
  ): Promise<PrismaMovie> {
    const directors = parseStringOrArray(data.director);
    const producers = parseStringOrArray(data.producer);
    const writers = parseStringOrArray(data.writer);
    const cast = parseStringOrArray(data.cast);
    const dops = parseStringOrArray(data.dop);
    const editors = parseStringOrArray(data.editor);
    const btsVideo = parseStringOrArray(data.btsVideo);

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
        language: data.language,
        targetGroup: data.targetGroup,
        hasProfanity: String(data.hasProfanity) === "true" || data.hasProfanity === true,
        hasDrugs: String(data.hasDrugs) === "true" || data.hasDrugs === true,
        colorType: data.colorType || "COLOR",
        studio: data.studio || null,
      },
    });

    await associateCrewBulk(movie.id, directors, producers, writers, cast, dops, editors);

    await prisma.movieBts.create({
      data: {
        movieId: movie.id,
        btsVideo,
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
    data: Omit<UpdateMovieBodyInput, "thumbnail"> & {
      thumbnail: string;
    },
  ): Promise<PrismaMovie> {
    const directors = parseStringOrArray(data.director);
    const producers = parseStringOrArray(data.producer);
    const writers = parseStringOrArray(data.writer);
    const cast = parseStringOrArray(data.cast);
    const dops = parseStringOrArray(data.dop);
    const editors = parseStringOrArray(data.editor);
    const btsVideo = parseStringOrArray(data.btsVideo);

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
        language: data.language,
        targetGroup: data.targetGroup,
        hasProfanity: String(data.hasProfanity) === "true" || data.hasProfanity === true,
        hasDrugs: String(data.hasDrugs) === "true" || data.hasDrugs === true,
        colorType: data.colorType || "COLOR",
        studio: data.studio || null,
      },
    });

    await prisma.movieCrew.deleteMany({
      where: { movieId: id },
    });

    await associateCrewBulk(id, directors, producers, writers, cast, dops, editors);

    await prisma.movieBts.upsert({
      where: { movieId: id },
      create: {
        movieId: id,
        btsVideo,
      },
      update: {
        btsVideo,
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

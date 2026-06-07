import { prisma } from "../lib/prisma";
import { MovieCrew as PrismaMovieCrew } from "@prisma/client";
import {
  MovieCrewRepository,
} from "../modules/movies/domain/movie-crew.repository";
import { CreateMovieCrewInput } from "../modules/movies/domain/movie";

export class MovieCrewRepositoryImpl implements MovieCrewRepository {
  async createMany(inputs: CreateMovieCrewInput[]): Promise<void> {
    await prisma.movieCrew.createMany({
      data: inputs,
      skipDuplicates: true,
    });
  }

  async findByMovieId(movieId: string): Promise<PrismaMovieCrew[]> {
    return prisma.movieCrew.findMany({
      where: { movieId },
    });
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prisma.movieCrew.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}

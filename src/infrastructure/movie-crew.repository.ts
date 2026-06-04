import { prisma } from "../lib/prisma";
import { MovieCrew } from "../modules/movies/domain/movie";
import {
  MovieCrewRepository,
  MovieCrewRepositoryCreateInput,
} from "../modules/movies/domain/movie-crew.repository";

export class MovieCrewRepositoryImpl implements MovieCrewRepository {
  async createMany(data: MovieCrewRepositoryCreateInput[]): Promise<void> {
    await prisma.movieCrew.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async findByMovieId(movieId: string): Promise<MovieCrew[]> {
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

import { prisma } from "../lib/prisma";
import { MovieCrewRepository } from "../modules/movies/domain/movie-crew.repository";

export class MovieCrewRepositoryImpl implements MovieCrewRepository {
  async createMany(
    data: Array<{
      movieId: string;
      crewMemberId: string;
      role: string;
    }>,
  ): Promise<void> {
    await prisma.movieCrew.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async findByMovieId(
    movieId: string,
  ): Promise<
    Array<{ id: string; movieId: string; crewMemberId: string; role: string }>
  > {
    return prisma.movieCrew.findMany({
      where: { movieId },
      select: {
        id: true,
        movieId: true,
        crewMemberId: true,
        role: true,
      },
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

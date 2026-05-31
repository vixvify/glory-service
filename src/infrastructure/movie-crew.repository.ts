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
}

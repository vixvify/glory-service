import { prisma } from "../lib/prisma";
import { MovieBtsRepository } from "../modules/movies/domain/movie-bts.repository";

export class MovieBtsRepositoryImpl implements MovieBtsRepository {
  async create(movieId: string, btsVideo: string[]): Promise<void> {
    await prisma.movieBts.create({
      data: {
        movieId,
        btsVideo,
      },
    });
  }

  async upsert(movieId: string, btsVideo: string[]): Promise<void> {
    await prisma.movieBts.upsert({
      where: { movieId },
      create: {
        movieId,
        btsVideo,
      },
      update: {
        btsVideo,
      },
    });
  }
}

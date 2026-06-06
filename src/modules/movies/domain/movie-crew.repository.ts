import { MovieCrew as PrismaMovieCrew } from "@prisma/client";
import { MovieCrewRepositoryCreateInput } from "./movie";

export interface MovieCrewRepository {
  createMany(data: MovieCrewRepositoryCreateInput[]): Promise<void>;
  findByMovieId(movieId: string): Promise<PrismaMovieCrew[]>;
  deleteMany(ids: string[]): Promise<void>;
}

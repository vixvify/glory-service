import { MovieCrew as PrismaMovieCrew } from "@prisma/client";
import { CreateMovieCrewInput } from "./movie";

export interface MovieCrewRepository {
  createMany(inputs: CreateMovieCrewInput[]): Promise<void>;
  findByMovieId(movieId: string): Promise<PrismaMovieCrew[]>;
  deleteMany(ids: string[]): Promise<void>;
}

import { MovieCrew } from "./movie";

export interface MovieCrewRepositoryCreateInput {
  movieId: string;
  crewMemberId: string;
  role: string;
}

export interface MovieCrewRepository {
  createMany(data: MovieCrewRepositoryCreateInput[]): Promise<void>;
  findByMovieId(movieId: string): Promise<MovieCrew[]>;
  deleteMany(ids: string[]): Promise<void>;
}


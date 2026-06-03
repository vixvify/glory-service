export interface MovieCrewRepository {
  createMany(
    data: Array<{
      movieId: string;
      crewMemberId: string;
      role: string;
    }>,
  ): Promise<void>;
  findByMovieId(
    movieId: string,
  ): Promise<
    Array<{ id: string; movieId: string; crewMemberId: string; role: string }>
  >;
  deleteMany(ids: string[]): Promise<void>;
}

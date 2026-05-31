export interface MovieCrewRepository {
  createMany(
    data: Array<{
      movieId: string;
      crewMemberId: string;
      role: string;
    }>,
  ): Promise<void>;
}

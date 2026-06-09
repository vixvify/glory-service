import { MovieRepository } from "../movies/domain/movie.repository";
import { MasterDataRepository } from "../master-data/domain/masterdata.repository";
import { CrewMemberRepository } from "../crew-members/domain/crew-member.repository";
import { AdminStats } from "./domain/admin";
import { handleServiceError } from "../../core/utils/handle-error";

export class AdminService {
  constructor(
    private movieRepo: MovieRepository,
    private masterDataRepo: MasterDataRepository,
    private crewMemberRepo: CrewMemberRepository,
  ) {}

  async getStats(): Promise<AdminStats> {
    try {
      const [totalMovies, totalCategories, totalCrew, totalViews, mostActiveUniversity] =
        await Promise.all([
          this.movieRepo.count(),
          this.masterDataRepo.countCategories(),
          this.crewMemberRepo.count(),
          this.movieRepo.sumViews(),
          this.masterDataRepo.getMostActiveUniversity(),
        ]);

      return {
        totalMovies,
        totalCategories,
        totalViews,
        totalCrew,
        mostActiveUniversity,
      };
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get admin stats");
    }
  }
}

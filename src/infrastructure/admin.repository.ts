import { prisma } from "../lib/prisma";
import { AdminRepository } from "../modules/admin/domain/admin.repository";
import { AdminStats } from "../modules/admin/domain/admin";

export class AdminRepositoryImpl implements AdminRepository {
  async getStats(): Promise<AdminStats> {
    const [totalMovies, totalCategories, totalCrew] = await Promise.all([
      prisma.movie.count(),
      prisma.category.count(),
      prisma.crewMember.count(),
    ]);

    const viewsResult = await prisma.movie.aggregate({
      _sum: {
        views: true,
      },
    });

    const totalViews = viewsResult._sum.views || 0;

    return {
      totalMovies,
      totalCategories,
      totalViews,
      totalCrew,
    };
  }
}

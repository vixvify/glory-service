import { prisma } from "../lib/prisma";
import { MasterDataRepository } from "../modules/master-data/domain/masterdata.repository";
import {
  Category,
  University,
  AgeRating,
} from "../modules/master-data/domain/masterdata";

export class MasterDataRepositoryImpl implements MasterDataRepository {
  async getCategories(): Promise<Category[]> {
    return prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  }

  async getUniversities(): Promise<University[]> {
    return prisma.university.findMany({
      orderBy: { name: "asc" },
    });
  }

  async getAgeRatings(): Promise<AgeRating[]> {
    return prisma.ageRating.findMany({
      orderBy: { name: "asc" },
    });
  }
}

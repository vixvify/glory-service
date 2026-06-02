import { prisma } from "../lib/prisma";
import { MasterDataRepository } from "../modules/master-data/domain/masterdata.repository";
import {
  Category,
  University,
  AgeRating,
  Language,
  TargetGroup,
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

  async getLanguages(): Promise<Language[]> {
    return prisma.language.findMany({
      orderBy: { name: "asc" },
    });
  }

  async getTargetGroups(): Promise<TargetGroup[]> {
    return prisma.targetGroup.findMany({
      orderBy: { name: "asc" },
    });
  }
}

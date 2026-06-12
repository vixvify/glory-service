import { prisma } from "../lib/prisma";
import { MasterDataRepository } from "../modules/master-data/domain/masterdata.repository";
import {
  Category,
  Language,
  CrewRole,
  DataGoUniversityResponse,
  UniversityRecord,
} from "../modules/master-data/domain/masterdata";
import axios from "axios";

export class MasterDataRepositoryImpl implements MasterDataRepository {
  async getCategories(): Promise<Category[]> {
    return prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  }

  async getUniversities(): Promise<string[]> {
    const response = await axios.get<DataGoUniversityResponse>(
      process.env.GET_UNIVERSITY_URL!,
      {
        headers: {
          "api-key": process.env.DATA_GO_TOKEN!,
        },
      },
    );

    return response.data.result.records.map(
      (university) => university.UNIV_NAME,
    );
  }

  async getCrewRoles(): Promise<CrewRole[]> {
    return prisma.crewRole.findMany({
      orderBy: { name: "asc" },
    });
  }

  async countCategories(): Promise<number> {
    return prisma.category.count();
  }

  async getMostActiveUniversity(): Promise<string | null> {
    const result = await prisma.movie.groupBy({
      by: ["university"],
      _count: {
        university: true,
      },
      where: {
        university: { not: null },
      },
      orderBy: {
        _count: {
          university: "desc",
        },
      },
      take: 1,
    });

    return result[0]?.university || null;
  }
}

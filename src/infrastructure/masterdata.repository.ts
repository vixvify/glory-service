import { prisma } from "../lib/prisma";
import { MasterDataRepository } from "../modules/master-data/domain/masterdata.repository";
import {
  AffiliationMasterDataItem,
  Category,
  Language,
  CrewRole,
  DataGoUniversityResponse,
  UniversityRecord,
  MasterDataItem,
} from "../modules/master-data/domain/masterdata";
import axios from "axios";

export class MasterDataRepositoryImpl implements MasterDataRepository {
  async getCategories(): Promise<Category[]> {
    return prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  }

  async getUniversities(): Promise<AffiliationMasterDataItem[]> {
    const universities = await prisma.university.findMany({
      include: { _count: true },
      orderBy: [
        {
          movies: {
            _count: "desc",
          },
        },
        {
          name: "asc",
        },
      ],
    });

    return universities.map((university) => ({
      id: university.id,
      name: university.name,
      movieCount: university._count.movies,
    }));
  }

  async getSchools(): Promise<AffiliationMasterDataItem[]> {
    const schools = await prisma.school.findMany({
      include: { _count: true },
      orderBy: [
        {
          movies: {
            _count: "desc",
          },
        },
        {
          name: "asc",
        },
      ],
    });

    return schools.map((school) => ({
      id: school.id,
      name: school.name,
      movieCount: school._count.movies,
    }));
  }

  async getLanguages(): Promise<MasterDataItem[]> {
    return prisma.language.findMany({
      orderBy: { name: "asc" },
    });
  }

  async getSubtitles(): Promise<MasterDataItem[]> {
    return prisma.subtitle.findMany({
      orderBy: { name: "asc" },
    });
  }

  async getColorTypes(): Promise<MasterDataItem[]> {
    return prisma.colorType.findMany({
      orderBy: { name: "asc" },
    });
  }

  async getContentWarnings(): Promise<MasterDataItem[]> {
    return prisma.contentWarning.findMany({
      orderBy: { name: "asc" },
    });
  }

  async getAgeRatings(): Promise<MasterDataItem[]> {
    return prisma.ageRating.findMany({
      orderBy: { name: "asc" },
    });
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
      by: ["universityId"],
      _count: {
        universityId: true,
      },
      where: {
        universityId: { not: null },
      },
      orderBy: {
        _count: {
          universityId: "desc",
        },
      },
      take: 1,
    });

    const activeId = result[0]?.universityId;
    if (!activeId) return null;

    const university = await prisma.university.findUnique({
      where: { id: activeId },
      select: { name: true },
    });

    return university?.name || null;
  }

  async upsertTags(names: string[]): Promise<string[]> {
    if (!names || names.length === 0) return [];
    const uniqueNames = Array.from(
      new Set(names.map((n) => n.trim()).filter(Boolean)),
    );

    const tagRecords = await Promise.all(
      uniqueNames.map((name) =>
        prisma.tag.upsert({
          where: { name },
          update: {},
          create: { name },
          select: { id: true },
        }),
      ),
    );
    return tagRecords.map((t) => t.id);
  }
}

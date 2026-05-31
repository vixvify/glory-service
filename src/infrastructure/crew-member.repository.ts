import { prisma } from "../lib/prisma";
import { CrewMemberRepository } from "../modules/crew-members/domain/crew-member.repository";
import { CrewMember } from "../modules/crew-members/domain/crew-member";
import { Prisma } from "@prisma/client";
import { CrewFilterParams } from "../modules/crew-members/domain/crew-member";
import calculatePagination from "../core/utils/pagination";

export class CrewMemberRepositoryImpl implements CrewMemberRepository {
  async find(params?: CrewFilterParams): Promise<CrewMember[]> {
    if (!params) {
      return prisma.crewMember.findMany({
        orderBy: { name: "asc" },
      });
    }

    const {
      search,
      searchby,
      page,
      pagenumber,
      sort = "asc",
      sortby = "name",
    } = params;

    const where: Prisma.CrewMemberWhereInput = {
      ...(search &&
        searchby === "role" && {
          movieCrews: {
            some: {
              role: { equals: search, mode: "insensitive" },
            },
          },
        }),
      ...(search &&
        searchby !== "role" && {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }),
    };

    return prisma.crewMember.findMany({
      where,
      orderBy: {
        [sortby]: sort,
      },
      ...calculatePagination(page || 1, pagenumber || 10),
    });
  }

  async findById(id: string): Promise<CrewMember | null> {
    return prisma.crewMember.findUnique({
      where: { id },
    });
  }

  async findByName(name: string): Promise<CrewMember | null> {
    return prisma.crewMember.findUnique({
      where: { name },
    });
  }

  async create(name: string, photoUrl?: string): Promise<CrewMember> {
    return prisma.crewMember.create({
      data: { name, photoUrl },
    });
  }

  async update(
    id: string,
    name: string,
    photoUrl?: string,
  ): Promise<CrewMember> {
    return prisma.crewMember.update({
      where: { id },
      data: {
        name,
        ...(photoUrl !== undefined ? { photoUrl } : {}),
      },
    });
  }

  async delete(id: string): Promise<CrewMember> {
    return prisma.crewMember.delete({
      where: { id },
    });
  }

  async findManyByIds(ids: string[]): Promise<CrewMember[]> {
    return prisma.crewMember.findMany({
      where: { id: { in: ids } },
    });
  }

  async findManyByNames(names: string[]): Promise<CrewMember[]> {
    return prisma.crewMember.findMany({
      where: { name: { in: names } },
    });
  }

  async createMany(names: string[]): Promise<void> {
    await prisma.crewMember.createMany({
      data: names.map((name) => ({ name })),
      skipDuplicates: true,
    });
  }
}

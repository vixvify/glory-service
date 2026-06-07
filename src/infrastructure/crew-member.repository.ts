import { prisma } from "../lib/prisma";
import { CrewMemberRepository } from "../modules/crew-members/domain/crew-member.repository";
import { Prisma, CrewMember as PrismaCrewMember } from "@prisma/client";
import {
  CreateCrewMemberInput,
  UpdateCrewMemberInput,
  CrewFilterInput,
  CrewMemberWithRelations,
  crewMemberIncludes,
} from "../modules/crew-members/domain/crew-member";
import calculatePagination from "../core/utils/pagination";

export class CrewMemberRepositoryImpl implements CrewMemberRepository {
  async find(input?: CrewFilterInput): Promise<CrewMemberWithRelations[]> {
    if (!input) {
      const results = await prisma.crewMember.findMany({
        orderBy: { name: "asc" },
        include: crewMemberIncludes,
      });
      return results as unknown as CrewMemberWithRelations[];
    }

    const {
      search,
      searchby,
      page,
      pagesize,
      sort = "asc",
      sortby = "name",
      createdBy,
    } = input;

    const where: Prisma.CrewMemberWhereInput = {
      ...(search &&
        searchby === "role" && {
          movies: {
            some: {
              crewRole: {
                name: { equals: search, mode: "insensitive" },
              },
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
      ...(createdBy && { createdBy }),
    };

    const results = await prisma.crewMember.findMany({
      where,
      orderBy: {
        [sortby]: sort,
      },
      include: crewMemberIncludes,
      ...calculatePagination(page, pagesize),
    });
    return results as unknown as CrewMemberWithRelations[];
  }

  async findById(id: string): Promise<CrewMemberWithRelations | null> {
    const result = await prisma.crewMember.findUnique({
      where: { id },
      include: crewMemberIncludes,
    });
    return result as unknown as CrewMemberWithRelations | null;
  }

  async findByEmail(email: string): Promise<CrewMemberWithRelations | null> {
    const result = await prisma.crewMember.findFirst({
      where: { email },
      include: crewMemberIncludes,
    });
    return result as unknown as CrewMemberWithRelations | null;
  }

  async findByName(name: string): Promise<CrewMemberWithRelations | null> {
    const result = await prisma.crewMember.findUnique({
      where: { name },
      include: crewMemberIncludes,
    });
    return result as unknown as CrewMemberWithRelations | null;
  }

  async create(
    input: CreateCrewMemberInput,
  ): Promise<PrismaCrewMember> {
    return prisma.crewMember.create({
      data: input,
    });
  }

  async update(
    id: string,
    input: UpdateCrewMemberInput,
  ): Promise<PrismaCrewMember> {
    const { name, email, userId } = input;
    return prisma.crewMember.update({
      where: { id },
      data: {
        name,
        ...(email !== undefined ? { email } : {}),
        ...(userId !== undefined ? { userId } : {}),
      },
    });
  }

  async delete(id: string): Promise<PrismaCrewMember> {
    return prisma.crewMember.delete({
      where: { id },
    });
  }

  async findManyByIds(ids: string[]): Promise<CrewMemberWithRelations[]> {
    const results = await prisma.crewMember.findMany({
      where: { id: { in: ids } },
      include: crewMemberIncludes,
    });
    return results as unknown as CrewMemberWithRelations[];
  }

  async findManyByNames(names: string[]): Promise<CrewMemberWithRelations[]> {
    const results = await prisma.crewMember.findMany({
      where: { name: { in: names } },
      include: crewMemberIncludes,
    });
    return results as unknown as CrewMemberWithRelations[];
  }

  async createMany(names: string[], createdBy: string): Promise<void> {
    await prisma.crewMember.createMany({
      data: names.map((name) => ({ name, createdBy })),
      skipDuplicates: true,
    });
  }

  async count(): Promise<number> {
    return prisma.crewMember.count();
  }

  async updateUserIdByEmail(email: string, userId: string): Promise<void> {
    await prisma.crewMember.updateMany({
      where: { email },
      data: { userId },
    });
  }
}

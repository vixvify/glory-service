import { prisma } from "../lib/prisma";
import { CrewMemberRepository } from "../modules/crew-members/domain/crew-member.repository";
import { Prisma, CrewMember as PrismaCrewMember } from "@prisma/client";
import {
  CreateCrewMemberRepositoryInput,
  UpdateCrewMemberRepositoryInput,
  CrewFilterParams,
  CrewMemberWithRelations,
} from "../modules/crew-members/domain/crew-member";
import calculatePagination from "../core/utils/pagination";
import { CrewMemberUserSelect } from "../modules/crew-members/domain/crew-member";


export class CrewMemberRepositoryImpl implements CrewMemberRepository {
  async find(params?: CrewFilterParams): Promise<CrewMemberWithRelations[]> {
    if (!params) {
      const results = await prisma.crewMember.findMany({
        orderBy: { name: "asc" },
        include: {
          movieCrews: {
            include: {
              movie: true,
            },
          },
          user: {
            select: CrewMemberUserSelect,
          },
        },
      });
      return results as CrewMemberWithRelations[];
    }

    const {
      search,
      searchby,
      page,
      pagesize,
      sort = "asc",
      sortby = "name",
      createdBy,
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
      ...(createdBy && { createdBy }),
    };

    const results = await prisma.crewMember.findMany({
      where,
      orderBy: {
        [sortby]: sort,
      },
      include: {
        movieCrews: {
          include: {
            movie: true,
          },
        },
        user: {
          select: CrewMemberUserSelect,
        },
      },
      ...calculatePagination(page, pagesize),
    });
    return results as CrewMemberWithRelations[];
  }

  async findById(id: string): Promise<CrewMemberWithRelations | null> {
    const result = await prisma.crewMember.findUnique({
      where: { id },
      include: {
        movieCrews: {
          include: {
            movie: true,
          },
        },
        user: {
          select: CrewMemberUserSelect,
        },
      },
    });
    return result as CrewMemberWithRelations | null;
  }

  async findByName(name: string): Promise<CrewMemberWithRelations | null> {
    const result = await prisma.crewMember.findUnique({
      where: { name },
      include: {
        movieCrews: {
          include: {
            movie: true,
          },
        },
        user: {
          select: CrewMemberUserSelect,
        },
      },
    });
    return result as CrewMemberWithRelations | null;
  }

  async create(
    data: CreateCrewMemberRepositoryInput,
  ): Promise<PrismaCrewMember> {
    return prisma.crewMember.create({
      data,
    });
  }

  async update(
    id: string,
    data: UpdateCrewMemberRepositoryInput,
  ): Promise<PrismaCrewMember> {
    const { name, email, userId } = data;
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
      include: {
        movieCrews: {
          include: {
            movie: true,
          },
        },
        user: {
          select: CrewMemberUserSelect,
        },
      },
    });
    return results as CrewMemberWithRelations[];
  }

  async findManyByNames(names: string[]): Promise<CrewMemberWithRelations[]> {
    const results = await prisma.crewMember.findMany({
      where: { name: { in: names } },
      include: {
        movieCrews: {
          include: {
            movie: true,
          },
        },
        user: {
          select: CrewMemberUserSelect,
        },
      },
    });
    return results as CrewMemberWithRelations[];
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


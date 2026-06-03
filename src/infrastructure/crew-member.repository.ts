import { prisma } from "../lib/prisma";
import { CrewMemberRepository } from "../modules/crew-members/domain/crew-member.repository";
import { Prisma } from "@prisma/client";
import {
  CrewMember,
  CreateCrewMemberRepositoryInput,
  UpdateCrewMemberRepositoryInput,
  CrewFilterParams,
} from "../modules/crew-members/domain/crew-member";
import calculatePagination from "../core/utils/pagination";

export class CrewMemberRepositoryImpl implements CrewMemberRepository {
  async find(params?: CrewFilterParams): Promise<CrewMember[]> {
    if (!params) {
      return prisma.crewMember.findMany({
        orderBy: { name: "asc" },
        include: {
          movieCrews: {
            include: {
              movie: true,
            },
          },
        },
      });
    }

    const {
      search,
      searchby,
      page,
      pagesize,
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
      include: {
        movieCrews: {
          include: {
            movie: true,
          },
        },
      },
      ...calculatePagination(page, pagesize),
    });
  }

  async findById(id: string): Promise<CrewMember | null> {
    return prisma.crewMember.findUnique({
      where: { id },
      include: {
        movieCrews: {
          include: {
            movie: true,
          },
        },
      },
    });
  }

  async findByName(name: string): Promise<CrewMember | null> {
    return prisma.crewMember.findUnique({
      where: { name },
      include: {
        movieCrews: {
          include: {
            movie: true,
          },
        },
      },
    });
  }
  async create(data: CreateCrewMemberRepositoryInput): Promise<CrewMember> {
    const { name, photoUrl, email, userId } = data;
    return prisma.crewMember.create({
      data: { name, photoUrl, email, userId },
    });
  }

  async update(
    id: string,
    data: UpdateCrewMemberRepositoryInput,
  ): Promise<CrewMember> {
    const { name, photoUrl, email, userId } = data;
    return prisma.crewMember.update({
      where: { id },
      data: {
        name,
        ...(photoUrl !== undefined ? { photoUrl } : {}),
        ...(email !== undefined ? { email } : {}),
        ...(userId !== undefined ? { userId } : {}),
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
      include: {
        movieCrews: {
          include: {
            movie: true,
          },
        },
      },
    });
  }

  async findManyByNames(names: string[]): Promise<CrewMember[]> {
    return prisma.crewMember.findMany({
      where: { name: { in: names } },
      include: {
        movieCrews: {
          include: {
            movie: true,
          },
        },
      },
    });
  }

  async createMany(names: string[]): Promise<void> {
    await prisma.crewMember.createMany({
      data: names.map((name) => ({ name })),
      skipDuplicates: true,
    });
  }
}

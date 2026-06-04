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
import { CrewMemberUserSelect } from "../modules/crew-members/domain/crew-member";

export class CrewMemberRepositoryImpl implements CrewMemberRepository {
  private toDomain(member: any): CrewMember {
    if (!member) return member;
    return {
      id: member.id,
      name: member.name,
      email: member.email,
      userId: member.userId,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      user: member.user
        ? {
            ...member.user,
            name: member.user.name || "",
            role: member.user.role as "admin" | "user",
          }
        : null,
    };
  }

  private toDomainList(members: any[]): CrewMember[] {
    return members.map((m) => this.toDomain(m));
  }

  async find(params?: CrewFilterParams): Promise<CrewMember[]> {
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
      return this.toDomainList(results);
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
    return this.toDomainList(results);
  }

  async findById(id: string): Promise<CrewMember | null> {
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
    return result ? this.toDomain(result) : null;
  }

  async findByName(name: string): Promise<CrewMember | null> {
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
    return result ? this.toDomain(result) : null;
  }

  async create(data: CreateCrewMemberRepositoryInput): Promise<CrewMember> {
    const result = await prisma.crewMember.create({
      data,
    });
    return this.toDomain(result);
  }

  async update(
    id: string,
    data: UpdateCrewMemberRepositoryInput,
  ): Promise<CrewMember> {
    const { name, email, userId } = data;
    const result = await prisma.crewMember.update({
      where: { id },
      data: {
        name,
        ...(email !== undefined ? { email } : {}),
        ...(userId !== undefined ? { userId } : {}),
      },
    });
    return this.toDomain(result);
  }

  async delete(id: string): Promise<CrewMember> {
    const result = await prisma.crewMember.delete({
      where: { id },
    });
    return this.toDomain(result);
  }

  async findManyByIds(ids: string[]): Promise<CrewMember[]> {
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
    return this.toDomainList(results);
  }

  async findManyByNames(names: string[]): Promise<CrewMember[]> {
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
    return this.toDomainList(results);
  }

  async createMany(names: string[]): Promise<void> {
    await prisma.crewMember.createMany({
      data: names.map((name) => ({ name })),
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

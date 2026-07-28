import { prisma } from "../lib/prisma";
import { CreateUserInput } from "../modules/auth/domain/auth";
import { AuthRepository } from "../modules/auth/domain/auth.repository";
import { User as PrismaUser, Prisma } from "@prisma/client";
import { AuthUserSelect } from "../modules/auth/domain/auth";

export class AuthRepositoryImpl implements AuthRepository {
  async findByEmail(email: string): Promise<PrismaUser | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      select: AuthUserSelect,
    });
    return user as PrismaUser | null;
  }

  async findByEmailWithPassword(email: string): Promise<PrismaUser | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<PrismaUser | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async create(input: CreateUserInput): Promise<PrismaUser> {
    const { passwordHash, ...dbData } = input;

    return prisma.user.create({
      data: {
        ...dbData,
        password: passwordHash,
        role: "user",
      },
    });
  }

  async updateById(id: string, data: Prisma.UserUpdateInput): Promise<PrismaUser> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
}

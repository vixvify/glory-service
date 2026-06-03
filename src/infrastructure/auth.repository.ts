import { prisma } from "../lib/prisma";
import { CreateUserRepositoryInput } from "../modules/auth/domain/auth";
import { AuthRepository } from "../modules/auth/domain/auth.repository";
import { User as PrismaUser } from "@prisma/client";

export class AuthRepositoryImpl implements AuthRepository {
  async findByEmail(email: string): Promise<PrismaUser | null> {
    return prisma.user.findUnique({
      where: { email },
    });
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

  async create(data: CreateUserRepositoryInput): Promise<PrismaUser> {
    const { passwordHash, ...dbData } = data;

    return prisma.user.create({
      data: {
        ...dbData,
        password: passwordHash,
        role: "user",
      },
    });
  }
}

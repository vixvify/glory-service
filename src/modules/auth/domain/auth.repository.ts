import { User as PrismaUser, Prisma } from "@prisma/client";
import { CreateUserInput } from "./auth";

export interface AuthRepository {
  findByEmail(email: string): Promise<PrismaUser | null>;
  findByEmailWithPassword(email: string): Promise<PrismaUser | null>;
  findById(id: string): Promise<PrismaUser | null>;
  create(input: CreateUserInput): Promise<PrismaUser>;
  updateById(id: string, data: Prisma.UserUpdateInput): Promise<PrismaUser>;
}

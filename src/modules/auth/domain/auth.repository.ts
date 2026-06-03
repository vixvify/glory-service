import { User as PrismaUser } from "@prisma/client";
import { CreateUserRepositoryInput } from "./auth";

export interface AuthRepository {
  findByEmail(email: string): Promise<PrismaUser | null>;
  findByEmailWithPassword(email: string): Promise<PrismaUser | null>;
  findById(id: string): Promise<PrismaUser | null>;
  create(data: CreateUserRepositoryInput): Promise<PrismaUser>;
}

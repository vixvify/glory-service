import { User as PrismaUser } from "@prisma/client";
import { CreateUserInput } from "./auth";

export interface AuthRepository {
  findByEmail(email: string): Promise<PrismaUser | null>;
  findByEmailWithPassword(email: string): Promise<PrismaUser | null>;
  findById(id: string): Promise<PrismaUser | null>;
  create(input: CreateUserInput): Promise<PrismaUser>;
}

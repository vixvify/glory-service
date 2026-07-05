import { User as PrismaUser } from "@prisma/client";
import { CreateUserInput, UpdateProfileInput } from "./auth";

export interface AuthRepository {
  findByEmail(email: string): Promise<PrismaUser | null>;
  findByEmailWithPassword(email: string): Promise<PrismaUser | null>;
  findById(id: string): Promise<PrismaUser | null>;
  create(input: CreateUserInput): Promise<PrismaUser>;
  update(id: string, input: UpdateProfileInput): Promise<PrismaUser>;
}

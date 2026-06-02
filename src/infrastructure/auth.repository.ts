import { prisma } from "../lib/prisma";
import { User, RegisterUserBodyInput } from "../modules/auth/domain/auth";
import { AuthRepository } from "../modules/auth/domain/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name || "",
      email: user.email,
      role: user.role as "admin" | "user",
    };
  }

  async findByEmailWithPassword(
    email: string,
  ): Promise<(User & { password?: string }) | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name || "",
      email: user.email,
      role: user.role as "admin" | "user",
      password: user.password,
    };
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name || "",
      email: user.email,
      role: user.role as "admin" | "user",
    };
  }
  async create(
    data: Omit<RegisterUserBodyInput, "password"> & { passwordHash: string },
  ): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: data.passwordHash,
        name: data.name,
        role: "user",
      },
    });

    // Automatically link to crew member if there's one with the same email
    await prisma.crewMember.updateMany({
      where: { email: data.email },
      data: { userId: user.id },
    });

    return {
      id: user.id,
      name: user.name || "",
      email: user.email,
      role: user.role as "admin" | "user",
    };
  }}

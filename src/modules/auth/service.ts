import {
  hashPassword,
  verifyPassword,
  signJWT,
  verifyJWT,
} from "../../core/utils/security";
import {
  AppError,
  ConflictError,
  UnauthorizedError,
  BadRequestError,
} from "../../core/error";
import { User, RegisterUserBodyInput, LoginUserBodyInput } from "./domain/auth";
import { AuthRepository } from "./domain/auth.repository";
import { AuthFactory } from "./factory";

export class AuthService {
  constructor(private repo: AuthRepository) {}

  async register(data: RegisterUserBodyInput): Promise<User> {
    try {
      const existing = await this.repo.findByEmail(data.email);
      if (existing) {
        throw new ConflictError("Email already exists");
      }

      const passwordHash = await hashPassword(data.password);
      return await this.repo.create({
        name: data.name,
        email: data.email,
        passwordHash,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to register user";
      throw new BadRequestError(message, error);
    }
  }

  async login(data: LoginUserBodyInput): Promise<User & { token?: string }> {
    try {
      const user = await this.repo.findByEmailWithPassword(data.email);
      if (!user) {
        throw new UnauthorizedError("Invalid email or password");
      }

      const isPasswordValid = await verifyPassword(
        data.password,
        user.password || "",
      );
      if (!isPasswordValid) {
        throw new UnauthorizedError("Invalid email or password");
      }

      const token = await signJWT({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });

      return AuthFactory.toSafeUserDTO(user, token);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to login";
      throw new BadRequestError(message, error);
    }
  }

  async me(userId: string): Promise<User | null> {
    try {
      return await this.repo.findById(userId);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error
          ? error.message
          : "Failed to retrieve user profile";
      throw new BadRequestError(message, error);
    }
  }

  async verifyToken(token: string): Promise<User | null> {
    try {
      const payload = await verifyJWT(token);
      if (!payload || !payload.id) {
        return null;
      }
      return await this.repo.findById(payload.id);
    } catch {
      return null;
    }
  }
}

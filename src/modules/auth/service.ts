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
  InternalServerError,
} from "../../core/error";
import {
  User,
  RegisterUserBodyDTO,
  LoginUserBodyDTO,
  CreateUserInput,
} from "./domain/auth";
import { AuthRepository } from "./domain/auth.repository";
import { CrewMemberRepository } from "../crew-members/domain/crew-member.repository";
import { AuthFactory } from "./factory";
import { uploadToR2 } from "../../lib/r2";

export class AuthService {
  constructor(
    private repo: AuthRepository,
    private crewMemberRepo: CrewMemberRepository,
  ) {}

  async register(dto: RegisterUserBodyDTO): Promise<Omit<User, "id" | "role">> {
    try {
      const existing = await this.repo.findByEmail(dto.email);
      if (existing) {
        throw new ConflictError("Email already exists");
      }

      let photoUrl: string | undefined = undefined;
      if (dto.photo) {
        photoUrl = await uploadToR2(dto.photo, "users");
      }

      const positions = dto.positions || [];
      const awards = dto.awards || [];

      let birthday: Date | undefined = undefined;
      if (dto.birthday) {
        const parsedDate = new Date(dto.birthday);
        if (!isNaN(parsedDate.getTime())) {
          birthday = parsedDate;
        }
      }

      const passwordHash = await hashPassword(dto.password);

      const {
        password: _pw,
        photo: _ph,
        positions: _p,
        awards: _a,
        birthday: _b,
        ...rest
      } = dto;

      const input: CreateUserInput = {
        ...rest,
        passwordHash,
        photoUrl,
        positions,
        birthday,
        awards,
      };

      const user = await this.repo.create(input);

      await this.crewMemberRepo.updateUserIdByEmail(dto.email, user.id);

      return AuthFactory.toDomainUser(user);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to register user";
      throw new BadRequestError(message, error);
    }
  }

  async login(
    dto: LoginUserBodyDTO,
  ): Promise<Omit<User, "id" | "role"> & { token?: string }> {
    try {
      const user = await this.repo.findByEmailWithPassword(dto.email);
      if (!user) {
        throw new UnauthorizedError("Invalid email or password");
      }

      const isPasswordValid = await verifyPassword(
        dto.password,
        user.password || "",
      );
      if (!isPasswordValid) {
        throw new UnauthorizedError("Invalid email or password");
      }

      const token = await signJWT({
        id: user.id,
        name: user.name || "",
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

  async me(userId: string): Promise<Omit<User, "id" | "role"> | null> {
    try {
      const user = await this.repo.findById(userId);
      if (!user) return null;
      return AuthFactory.toDomainUser(user);
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

      if (
        typeof payload.id !== "string" ||
        typeof payload.email !== "string" ||
        typeof payload.name !== "string" ||
        (payload.role !== "admin" && payload.role !== "user")
      ) {
        return null;
      }

      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      };
    } catch {
      return null;
    }
  }
}

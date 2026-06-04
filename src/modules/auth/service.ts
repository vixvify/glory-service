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
import { CrewMemberRepository } from "../crew-members/domain/crew-member.repository";
import { AuthFactory } from "./factory";
import { uploadToSupabase } from "../../lib/supabase";

export class AuthService {
  constructor(
    private repo: AuthRepository,
    private crewMemberRepo: CrewMemberRepository,
  ) {}

  async register(data: RegisterUserBodyInput): Promise<User> {
    try {
      const existing = await this.repo.findByEmail(data.email);
      if (existing) {
        throw new ConflictError("Email already exists");
      }

      let photoUrl: string | undefined = undefined;
      if (data.photo) {
        photoUrl = await uploadToSupabase(data.photo, "users");
      }

      const positions = data.positions || [];
      const awards = data.awards || [];

      let birthday: Date | undefined = undefined;
      if (data.birthday) {
        const parsedDate = new Date(data.birthday);
        if (!isNaN(parsedDate.getTime())) {
          birthday = parsedDate;
        }
      }

      const passwordHash = await hashPassword(data.password);

      const {
        password,
        photo,
        positions: _p,
        awards: _a,
        birthday: _b,
        ...rest
      } = data;

      const profileFields = Object.fromEntries(Object.entries(rest));

      const user = await this.repo.create({
        ...profileFields,
        email: data.email,
        name: data.name,
        passwordHash,
        photoUrl,
        positions,
        birthday,
        awards,
      });

      await this.crewMemberRepo.updateUserIdByEmail(data.email, user.id);

      return AuthFactory.toDomainUser(user);
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

  async me(userId: string): Promise<User | null> {
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
      if (!payload || !payload.id) {
        return null;
      }
      const user = await this.repo.findById(payload.id);
      if (!user) return null;
      return AuthFactory.toDomainUser(user);
    } catch {
      return null;
    }
  }
}

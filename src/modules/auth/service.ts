import {
  hashPassword,
  verifyPassword,
  signJWT,
  verifyJWT,
} from "../../core/utils//auth/security";
import { ConflictError, NotFoundError, UnauthorizedError } from "../../core/error";
import {
  User,
  RegisterUserBodyDTO,
  LoginUserBodyDTO,
  CreateUserInput,
  UpdateProfileBodyDTO,
  UpdateProfileInput,
} from "./domain/auth";
import { AuthRepository } from "./domain/auth.repository";
import { CrewMemberRepository } from "../crew-members/domain/crew-member.repository";
import { AuthFactory } from "./factory";
import { uploadToR2, deleteFromR2 } from "../../lib/r2";
import { handleServiceError } from "../../core/utils/error/handle-error";

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
      handleServiceError(error, "Failed to register user");
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

      if (!user.password) {
        throw new UnauthorizedError("Invalid email or password");
      }

      const isPasswordValid = await verifyPassword(dto.password, user.password);
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
      handleServiceError(error, "Failed to login");
    }
  }

  async me(userId: string): Promise<Omit<User, "id" | "role"> | null> {
    try {
      const user = await this.repo.findById(userId);
      if (!user) return null;
      return AuthFactory.toDomainUser(user);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to retrieve user profile");
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

  async updateProfile(
    userId: string,
    dto: UpdateProfileBodyDTO,
  ): Promise<Omit<User, "id" | "role">> {
    try {
      const existing = await this.repo.findById(userId);
      if (!existing) {
        throw new NotFoundError("User not found");
      }

      let photoUrl: string | null | undefined = undefined;

      if (dto.photo instanceof File) {
        // Validate file type explicitly before uploading
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(dto.photo.type)) {
          throw new Error("Invalid file type. Only jpg, png, webp, and gif are allowed.");
        }

        // Upload new photo to R2
        photoUrl = await uploadToR2(dto.photo, "users");

        // Delete old photo from R2 after successful upload
        if (existing.photoUrl) {
          await deleteFromR2(existing.photoUrl);
        }
      }

      let coverUrl: string | null | undefined = undefined;

      if (dto.coverPhoto instanceof File) {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(dto.coverPhoto.type)) {
          throw new Error("Invalid cover file type. Only jpg, png, webp, and gif are allowed.");
        }
        coverUrl = await uploadToR2(dto.coverPhoto, "users_cover");

        if (existing.coverUrl) {
          await deleteFromR2(existing.coverUrl);
        }
      }

      let birthday: Date | undefined | null = undefined;
      if (dto.birthday) {
        const parsed = new Date(dto.birthday);
        birthday = isNaN(parsed.getTime()) ? undefined : parsed;
      }

      const input: UpdateProfileInput = {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(photoUrl !== undefined && { photoUrl }),
        ...(coverUrl !== undefined && { coverUrl }),
        ...(dto.motto !== undefined && { motto: dto.motto }),
        ...(dto.bio !== undefined && { bio: dto.bio }),
        ...(dto.ig !== undefined && { ig: dto.ig }),
        ...(dto.facebook !== undefined && { facebook: dto.facebook }),
        ...(dto.youtube !== undefined && { youtube: dto.youtube }),
        ...(dto.tiktok !== undefined && { tiktok: dto.tiktok }),
        ...(dto.positions !== undefined && { positions: dto.positions }),
        ...(birthday !== undefined && { birthday }),
        ...(dto.awards !== undefined && { awards: dto.awards }),
      };

      const updated = await this.repo.update(userId, input);
      return AuthFactory.toDomainUser(updated);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to update profile");
    }
  }
}

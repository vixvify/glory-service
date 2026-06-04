import {
  AppError,
  NotFoundError,
  BadRequestError,
  ConflictError,
} from "../../core/error";
import {
  CrewMember,
  GetCrewMembersQueryInput,
  CreateCrewMemberInput,
  UpdateCrewMemberBodyInput,
} from "./domain/crew-member";
import { CrewMemberRepository } from "./domain/crew-member.repository";
import { AuthRepository } from "../auth/domain/auth.repository";
import { isDefaultQuery } from "../../core/utils/query";

export class CrewMemberService {
  constructor(
    private repo: CrewMemberRepository,
    private authRepo?: AuthRepository,
  ) {}

  async getCrewMembers(
    params?: GetCrewMembersQueryInput,
  ): Promise<CrewMember[]> {
    try {
      if (isDefaultQuery(params)) {
        return await this.repo.find();
      }

      const { search, searchby, page, pagesize, sort, sortby } = params || {};

      const pageNum = Number(page) || 1;
      const limitNum = pagesize ? Number(pagesize) : undefined;

      return await this.repo.find({
        search: search || undefined,
        searchby: searchby || undefined,
        page: pageNum,
        pagesize: limitNum,
        sort: sort || undefined,
        sortby: sortby || undefined,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get crew members";
      throw new BadRequestError(message, error);
    }
  }

  async getCrewMemberById(id: string): Promise<CrewMember> {
    try {
      const crewMember = await this.repo.findById(id);
      if (!crewMember) {
        throw new NotFoundError(`Crew member with id ${id} not found`);
      }
      return crewMember;
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get crew member";
      throw new BadRequestError(message, error);
    }
  }

  async createCrewMember(data: CreateCrewMemberInput): Promise<CrewMember> {
    try {
      const { name, email } = data;
      const trimmedName = name.trim();
      const trimmedEmail = email?.trim() || undefined;

      const existing = await this.repo.findByName(trimmedName);
      if (existing) {
        throw new ConflictError(
          `Crew member with name "${trimmedName}" already exists`,
        );
      }

      let userId: string | undefined = undefined;
      let photoUrl: string | undefined = undefined;
      if (trimmedEmail && this.authRepo) {
        const user = await this.authRepo.findByEmail(trimmedEmail);
        if (user) {
          userId = user.id;
          photoUrl = user.photoUrl || undefined;
        }
      }

      return await this.repo.create({
        name: trimmedName,
        email: trimmedEmail,
        userId,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to create crew member";
      throw new BadRequestError(message, error);
    }
  }

  async updateCrewMember(
    id: string,
    data: UpdateCrewMemberBodyInput,
  ): Promise<CrewMember> {
    try {
      const { name, email } = data;
      const existingById = await this.repo.findById(id);
      if (!existingById) {
        throw new NotFoundError(`Crew member with id ${id} not found`);
      }

      const trimmedName = name.trim();
      if (trimmedName.toLowerCase() !== existingById.name.toLowerCase()) {
        const existingByName = await this.repo.findByName(trimmedName);
        if (existingByName) {
          throw new ConflictError(
            `Crew member with name "${trimmedName}" already exists`,
          );
        }
      }

      const trimmedEmail =
        email !== undefined ? email?.trim() || null : undefined;
      let userId: string | null | undefined = undefined;
      let photoUrl: string | null | undefined = undefined;

      if (trimmedEmail !== undefined && this.authRepo) {
        if (trimmedEmail === null) {
          userId = null;
          photoUrl = null;
        } else {
          const user = await this.authRepo.findByEmail(trimmedEmail);
          if (user) {
            userId = user.id;
            photoUrl = user.photoUrl;
          } else {
            userId = null;
            photoUrl = null;
          }
        }
      }

      return await this.repo.update(id, {
        name: trimmedName,
        email: trimmedEmail,
        userId,
      });
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to update crew member";
      throw new BadRequestError(message, error);
    }
  }

  async deleteCrewMember(id: string): Promise<CrewMember> {
    try {
      const existing = await this.repo.findById(id);
      if (!existing) {
        throw new NotFoundError(`Crew member with id ${id} not found`);
      }
      return await this.repo.delete(id);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to delete crew member";
      throw new BadRequestError(message, error);
    }
  }
}

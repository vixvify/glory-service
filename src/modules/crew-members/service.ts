import {
  AppError,
  NotFoundError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
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
import { CrewMemberFactory } from "./factory";

export class CrewMemberService {
  constructor(
    private repo: CrewMemberRepository,
    private authRepo?: AuthRepository,
  ) {}

  async getCrewMembers(
    params?: GetCrewMembersQueryInput,
  ): Promise<CrewMember[]> {
    try {
      if (isDefaultQuery(params) && !params?.createdBy) {
        const results = await this.repo.find();
        return CrewMemberFactory.toDomainList(results);
      }

      const { search, searchby, page, pagesize, sort, sortby, createdBy } = params || {};

      const pageNum = Number(page) || 1;
      const limitNum = pagesize ? Number(pagesize) : undefined;

      const results = await this.repo.find({
        search: search || undefined,
        searchby: searchby || undefined,
        page: pageNum,
        pagesize: limitNum,
        sort: sort || undefined,
        sortby: sortby || undefined,
        createdBy: createdBy || undefined,
      });
      return CrewMemberFactory.toDomainList(results);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get crew members";
      throw new BadRequestError(message, error);
    }
  }

  async getMyCrewMembers(userId: string): Promise<CrewMember[]> {
    try {
      const results = await this.repo.find({ createdBy: userId });
      return CrewMemberFactory.toDomainList(results);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get my crew members";
      throw new BadRequestError(message, error);
    }
  }

  async getCrewMemberById(id: string): Promise<CrewMember> {
    try {
      const crewMember = await this.repo.findById(id);
      if (!crewMember) {
        throw new NotFoundError(`Crew member with id ${id} not found`);
      }
      return CrewMemberFactory.toDomain(crewMember);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get crew member";
      throw new BadRequestError(message, error);
    }
  }

  async createCrewMember(data: CreateCrewMemberInput, creatorId: string): Promise<CrewMember> {
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
      if (trimmedEmail && this.authRepo) {
        const user = await this.authRepo.findByEmail(trimmedEmail);
        if (user) {
          userId = user.id;
        }
      }

      const created = await this.repo.create({
        name: trimmedName,
        email: trimmedEmail,
        userId,
        createdBy: creatorId,
      });
      return CrewMemberFactory.toDomain(created);
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
    userId: string,
    role: string,
  ): Promise<CrewMember> {
    try {
      const { name, email } = data;
      const existingById = await this.repo.findById(id);
      if (!existingById) {
        throw new NotFoundError(`Crew member with id ${id} not found`);
      }

      if (existingById.createdBy !== userId && role !== "admin") {
        throw new ForbiddenError("You do not have permission to update this crew member");
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
      let linkedUserId: string | null | undefined = undefined;

      if (trimmedEmail !== undefined && this.authRepo) {
        if (trimmedEmail === null) {
          linkedUserId = null;
        } else {
          const user = await this.authRepo.findByEmail(trimmedEmail);
          if (user) {
            linkedUserId = user.id;
          } else {
            linkedUserId = null;
          }
        }
      }

      const updated = await this.repo.update(id, {
        name: trimmedName,
        email: trimmedEmail,
        userId: linkedUserId,
      });
      return CrewMemberFactory.toDomain(updated);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to update crew member";
      throw new BadRequestError(message, error);
    }
  }

  async deleteCrewMember(id: string, userId: string, role: string): Promise<CrewMember> {
    try {
      const existing = await this.repo.findById(id);
      if (!existing) {
        throw new NotFoundError(`Crew member with id ${id} not found`);
      }

      if (existing.createdBy !== userId && role !== "admin") {
        throw new ForbiddenError("You do not have permission to delete this crew member");
      }
      const deleted = await this.repo.delete(id);
      return CrewMemberFactory.toDomain(deleted);
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to delete crew member";
      throw new BadRequestError(message, error);
    }
  }
}


import { NotFoundError, ConflictError } from "../../core/error";
import {
  CrewMember,
  GetCrewMembersQueryDTO,
  CreateCrewMemberDTO,
  UpdateCrewMemberBodyDTO,
  CrewFilterInput,
  CreateCrewMemberInput,
  UpdateCrewMemberInput,
} from "./domain/crew-member";
import { CrewMemberRepository } from "./domain/crew-member.repository";
import { AuthRepository } from "../auth/domain/auth.repository";
import { isDefaultQuery } from "../../core/utils/db/query";
import { CrewMemberFactory } from "./factory";
import { handleServiceError } from "../../core/utils/error/handle-error";

export class CrewMemberService {
  constructor(
    private repo: CrewMemberRepository,
    private authRepo?: AuthRepository,
  ) {}

  async getCrewMembers(dto?: GetCrewMembersQueryDTO): Promise<CrewMember[]> {
    try {
      if (isDefaultQuery(dto)) {
        const results = await this.repo.find();
        return CrewMemberFactory.toDomainList(results);
      }

      const { search, searchby, page, pagesize, sort, sortby } = dto || {};

      const pageNum = Number(page) || 1;
      const limitNum = pagesize ? Number(pagesize) : undefined;

      const input: CrewFilterInput = {
        search: search || undefined,
        searchby: searchby || undefined,
        page: pageNum,
        pagesize: limitNum,
        sort: sort || undefined,
        sortby: sortby || undefined,
      };

      const results = await this.repo.find(input);
      return CrewMemberFactory.toDomainList(results);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get crew members");
    }
  }

  async getMyCrewMembers(userId: string): Promise<CrewMember[]> {
    try {
      const results = await this.repo.find({ createdBy: userId });
      return CrewMemberFactory.toDomainList(results);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get my crew members");
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
      handleServiceError(error, "Failed to get crew member");
    }
  }

  async createCrewMember(
    dto: CreateCrewMemberDTO,
    creatorId: string,
  ): Promise<CrewMember> {
    try {
      const { name, email } = dto;
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

      const input: CreateCrewMemberInput = {
        name: trimmedName,
        email: trimmedEmail,
        userId,
        createdBy: creatorId,
      };

      const created = await this.repo.create(input);
      return CrewMemberFactory.toDomain(created);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to create crew member");
    }
  }

  async updateCrewMember(
    id: string,
    dto: UpdateCrewMemberBodyDTO,
  ): Promise<CrewMember> {
    try {
      const { name, email } = dto;
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
      let linkedUserId: string | null | undefined = undefined;

      if (trimmedEmail !== undefined && this.authRepo) {
        if (trimmedEmail === null) {
          linkedUserId = null;
        } else {
          const user = await this.authRepo.findByEmail(trimmedEmail);
          linkedUserId = user?.id ?? null;
        }
      }

      const input: UpdateCrewMemberInput = {
        name: trimmedName,
        email: trimmedEmail,
        userId: linkedUserId,
      };

      const updated = await this.repo.update(id, input);
      return CrewMemberFactory.toDomain(updated);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to update crew member");
    }
  }

  async deleteCrewMember(id: string): Promise<CrewMember> {
    try {
      const existing = await this.repo.findById(id);
      if (!existing) {
        throw new NotFoundError(`Crew member with id ${id} not found`);
      }
      const deleted = await this.repo.delete(id);
      return CrewMemberFactory.toDomain(deleted);
    } catch (error: unknown) {
      handleServiceError(error, "Failed to delete crew member");
    }
  }
}

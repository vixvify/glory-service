import { MasterDataRepository } from "./domain/masterdata.repository";
import { Category, Language, CrewRole } from "./domain/masterdata";
import { ROLE_ORDER } from "../../core/constants/crew";
import { handleServiceError } from "../../core/utils/error/handle-error";

export class MasterDataService {
  constructor(private repo: MasterDataRepository) {}

  async getCategories(): Promise<Category[]> {
    try {
      return await this.repo.getCategories();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get categories");
    }
  }

  async getUniversities(): Promise<string[]> {
    try {
      return await this.repo.getUniversities();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get universities");
    }
  }

  async getCrewRoles(): Promise<CrewRole[]> {
    try {
      const roles = await this.repo.getCrewRoles();
      
      roles.sort((a, b) => {
        const weightA = ROLE_ORDER[a.name.toUpperCase()] || 99;
        const weightB = ROLE_ORDER[b.name.toUpperCase()] || 99;
        if (weightA !== weightB) {
          return weightA - weightB;
        }
        return (a.labelTh || a.name).localeCompare(b.labelTh || b.name);
      });

      return roles;
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get crew roles");
    }
  }

  async getMostActiveUniversity(): Promise<string | null> {
    try {
      return await this.repo.getMostActiveUniversity();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get most active university");
    }
  }
}

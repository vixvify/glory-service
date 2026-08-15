import { MasterDataRepository } from "./domain/masterdata.repository";
import {
  AffiliationMasterDataItem,
  Category,
  CrewRole,
  MasterDataItem,
} from "./domain/masterdata";
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

  async getUniversities(): Promise<AffiliationMasterDataItem[]> {
    try {
      return await this.repo.getUniversities();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get universities");
    }
  }

  async getSchools(): Promise<AffiliationMasterDataItem[]> {
    try {
      return await this.repo.getSchools();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get schools");
    }
  }

  async getLanguages(): Promise<MasterDataItem[]> {
    try {
      return await this.repo.getLanguages();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get languages");
    }
  }

  async getSubtitles(): Promise<MasterDataItem[]> {
    try {
      return await this.repo.getSubtitles();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get subtitles");
    }
  }

  async getColorTypes(): Promise<MasterDataItem[]> {
    try {
      return await this.repo.getColorTypes();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get color types");
    }
  }

  async getContentWarnings(): Promise<MasterDataItem[]> {
    try {
      return await this.repo.getContentWarnings();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get content warnings");
    }
  }

  async getAgeRatings(): Promise<MasterDataItem[]> {
    try {
      return await this.repo.getAgeRatings();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get age ratings");
    }
  }

  async getCrewRoles(): Promise<CrewRole[]> {
    try {
      const roles = await this.repo.getCrewRoles();

      roles.sort((a, b) => {
        const weightA = ROLE_ORDER[a.name.toUpperCase()];
        const weightB = ROLE_ORDER[b.name.toUpperCase()];
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

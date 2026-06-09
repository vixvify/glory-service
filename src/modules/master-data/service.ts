import { MasterDataRepository } from "./domain/masterdata.repository";
import {
  Category,
  University,
  AgeRating,
  Language,
  TargetGroup,
  CrewRole,
} from "./domain/masterdata";
import { handleServiceError } from "../../core/utils/handle-error";

export class MasterDataService {
  constructor(private repo: MasterDataRepository) {}

  async getCategories(): Promise<Category[]> {
    try {
      return await this.repo.getCategories();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get categories");
    }
  }

  async getUniversities(): Promise<University[]> {
    try {
      return await this.repo.getUniversities();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get universities");
    }
  }

  async getAgeRatings(): Promise<AgeRating[]> {
    try {
      return await this.repo.getAgeRatings();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get age ratings");
    }
  }

  async getLanguages(): Promise<Language[]> {
    try {
      return await this.repo.getLanguages();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get languages");
    }
  }

  async getTargetGroups(): Promise<TargetGroup[]> {
    try {
      return await this.repo.getTargetGroups();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get target groups");
    }
  }

  async getCrewRoles(): Promise<CrewRole[]> {
    try {
      return await this.repo.getCrewRoles();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get crew roles");
    }
  }
}

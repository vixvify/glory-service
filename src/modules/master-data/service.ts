import { MasterDataRepository } from "./domain/masterdata.repository";
import { Category, Language, CrewRole } from "./domain/masterdata";
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
      return await this.repo.getCrewRoles();
    } catch (error: unknown) {
      handleServiceError(error, "Failed to get crew roles");
    }
  }
}

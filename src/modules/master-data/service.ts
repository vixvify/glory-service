import { AppError, BadRequestError } from "../../core/error";
import { MasterDataRepository } from "./domain/masterdata.repository";
import { Category, University, AgeRating, Language, TargetGroup } from "./domain/masterdata";

export class MasterDataService {
  constructor(private repo: MasterDataRepository) {}

  async getCategories(): Promise<Category[]> {
    try {
      return await this.repo.getCategories();
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get categories";
      throw new BadRequestError(message, error);
    }
  }

  async getUniversities(): Promise<University[]> {
    try {
      return await this.repo.getUniversities();
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get universities";
      throw new BadRequestError(message, error);
    }
  }

  async getAgeRatings(): Promise<AgeRating[]> {
    try {
      return await this.repo.getAgeRatings();
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get age ratings";
      throw new BadRequestError(message, error);
    }
  }

  async getLanguages(): Promise<Language[]> {
    try {
      return await this.repo.getLanguages();
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get languages";
      throw new BadRequestError(message, error);
    }
  }

  async getTargetGroups(): Promise<TargetGroup[]> {
    try {
      return await this.repo.getTargetGroups();
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get target groups";
      throw new BadRequestError(message, error);
    }
  }
}

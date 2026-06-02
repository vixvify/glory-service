import { AppError, BadRequestError } from "../../core/error";
import { AdminRepository } from "./domain/admin.repository";
import { AdminStats } from "./domain/admin";

export class AdminService {
  constructor(private repo: AdminRepository) {}

  async getStats(): Promise<AdminStats> {
    try {
      return await this.repo.getStats();
    } catch (error: unknown) {
      if (error instanceof AppError) throw error;
      const message =
        error instanceof Error ? error.message : "Failed to get admin stats";
      throw new BadRequestError(message, error);
    }
  }
}

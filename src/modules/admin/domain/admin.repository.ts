import { AdminStats } from "./admin";

export interface AdminRepository {
  getStats(): Promise<AdminStats>;
}

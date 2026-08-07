import { Category, Language, CrewRole } from "./masterdata";

export interface MasterDataRepository {
  getCategories(): Promise<Category[]>;
  getUniversities(): Promise<string[]>;
  getSchools(): Promise<string[]>;
  getCrewRoles(): Promise<CrewRole[]>;
  countCategories(): Promise<number>;
  getMostActiveUniversity(): Promise<string | null>;
  upsertTags(names: string[]): Promise<string[]>;
}

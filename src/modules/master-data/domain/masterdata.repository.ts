import { Category, CrewRole, MasterDataItem } from "./masterdata";

export interface MasterDataRepository {
  getCategories(): Promise<Category[]>;
  getUniversities(): Promise<MasterDataItem[]>;
  getSchools(): Promise<MasterDataItem[]>;
  getLanguages(): Promise<MasterDataItem[]>;
  getSubtitles(): Promise<MasterDataItem[]>;
  getColorTypes(): Promise<MasterDataItem[]>;
  getContentWarnings(): Promise<MasterDataItem[]>;
  getAgeRatings(): Promise<MasterDataItem[]>;
  getCrewRoles(): Promise<CrewRole[]>;
  countCategories(): Promise<number>;
  getMostActiveUniversity(): Promise<string | null>;
  upsertTags(names: string[]): Promise<string[]>;
}

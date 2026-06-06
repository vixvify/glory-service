import { Category, University, AgeRating, Language, TargetGroup, CrewRole } from "./masterdata";

export interface MasterDataRepository {
  getCategories(): Promise<Category[]>;
  getUniversities(): Promise<University[]>;
  getAgeRatings(): Promise<AgeRating[]>;
  getLanguages(): Promise<Language[]>;
  getTargetGroups(): Promise<TargetGroup[]>;
  getCrewRoles(): Promise<CrewRole[]>;
  countCategories(): Promise<number>;
}

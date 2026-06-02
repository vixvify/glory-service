import { Category, University, AgeRating, Language, TargetGroup } from "./masterdata";

export interface MasterDataRepository {
  getCategories(): Promise<Category[]>;
  getUniversities(): Promise<University[]>;
  getAgeRatings(): Promise<AgeRating[]>;
  getLanguages(): Promise<Language[]>;
  getTargetGroups(): Promise<TargetGroup[]>;
}

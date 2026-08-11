export interface MasterDataItem {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  labelTh: string;
  createdAt: Date;
}

export interface Language {
  id: string;
  name: string;
  createdAt: Date;
}

export interface CrewRole {
  id: string;
  name: string;
  labelTh: string;
  labelEn: string;
  category: string;
  categoryLabelTh: string;
  createdAt: Date;
}

export interface UniversityRecord {
  _id: number;
  ACADEMIC_YEAR: number;
  UNIV_NAME: string;
  PROVINCE_UNIV_NAME_TH: string;
}

export interface SchoolRecord {
  _id: number;
  ACADEMIC_YEAR: number;
  UNIV_NAME: string;
  PROVINCE_UNIV_NAME_TH: string;
}

export interface DataGoUniversityResponse {
  success: boolean;
  result: {
    records: UniversityRecord[];
  };
}

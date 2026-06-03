import {
  CrewMember,
  CrewFilterParams,
  CreateCrewMemberRepositoryInput,
  UpdateCrewMemberRepositoryInput,
} from "./crew-member";

export interface CrewMemberRepository {
  find(params?: CrewFilterParams): Promise<CrewMember[]>;
  findById(id: string): Promise<CrewMember | null>;
  findByName(name: string): Promise<CrewMember | null>;
  create(data: CreateCrewMemberRepositoryInput): Promise<CrewMember>;
  update(id: string, data: UpdateCrewMemberRepositoryInput): Promise<CrewMember>;

  delete(id: string): Promise<CrewMember>;
  findManyByIds(ids: string[]): Promise<CrewMember[]>;
  findManyByNames(names: string[]): Promise<CrewMember[]>;
  createMany(names: string[]): Promise<void>;
  count(): Promise<number>;
  updateUserIdByEmail(email: string, userId: string): Promise<void>;
}

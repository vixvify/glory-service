import { CrewMember, CrewFilterParams } from "./crew-member";

export interface CrewMemberRepository {
  find(params?: CrewFilterParams): Promise<CrewMember[]>;
  findById(id: string): Promise<CrewMember | null>;
  findByName(name: string): Promise<CrewMember | null>;
  create(name: string, photoUrl?: string): Promise<CrewMember>;
  update(id: string, name: string, photoUrl?: string): Promise<CrewMember>;
  delete(id: string): Promise<CrewMember>;
  findManyByIds(ids: string[]): Promise<CrewMember[]>;
  findManyByNames(names: string[]): Promise<CrewMember[]>;
  createMany(names: string[]): Promise<void>;
}

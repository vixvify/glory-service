import { CrewMember as PrismaCrewMember } from "@prisma/client";
import {
  CrewFilterParams,
  CreateCrewMemberRepositoryInput,
  UpdateCrewMemberRepositoryInput,
  CrewMemberWithRelations,
} from "./crew-member";

export interface CrewMemberRepository {
  find(params?: CrewFilterParams): Promise<CrewMemberWithRelations[]>;
  findById(id: string): Promise<CrewMemberWithRelations | null>;
  findByName(name: string): Promise<CrewMemberWithRelations | null>;
  create(data: CreateCrewMemberRepositoryInput): Promise<PrismaCrewMember>;
  update(
    id: string,
    data: UpdateCrewMemberRepositoryInput,
  ): Promise<PrismaCrewMember>;
  delete(id: string): Promise<PrismaCrewMember>;
  findManyByIds(ids: string[]): Promise<CrewMemberWithRelations[]>;
  findManyByNames(names: string[]): Promise<CrewMemberWithRelations[]>;
  createMany(names: string[], createdBy: string): Promise<void>;
  count(): Promise<number>;
  updateUserIdByEmail(email: string, userId: string): Promise<void>;
}



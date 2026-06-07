import { CrewMember as PrismaCrewMember } from "@prisma/client";
import {
  CrewFilterInput,
  CreateCrewMemberInput,
  UpdateCrewMemberInput,
  CrewMemberWithRelations,
} from "./crew-member";

export interface CrewMemberRepository {
  find(input?: CrewFilterInput): Promise<CrewMemberWithRelations[]>;
  findById(id: string): Promise<CrewMemberWithRelations | null>;
  findByName(name: string): Promise<CrewMemberWithRelations | null>;
  create(input: CreateCrewMemberInput): Promise<PrismaCrewMember>;
  update(
    id: string,
    input: UpdateCrewMemberInput,
  ): Promise<PrismaCrewMember>;
  delete(id: string): Promise<PrismaCrewMember>;
  findManyByIds(ids: string[]): Promise<CrewMemberWithRelations[]>;
  findManyByNames(names: string[]): Promise<CrewMemberWithRelations[]>;
  createMany(names: string[], createdBy: string): Promise<void>;
  count(): Promise<number>;
  updateUserIdByEmail(email: string, userId: string): Promise<void>;
}



import {
  MovieFilterInput,
  CreateMovieInput,
  UpdateMovieInput,
  PrismaMovieWithRelations,
} from "./movie";
import { Movie as PrismaMovie } from "@prisma/client";

export interface MovieRepository {
  find(input?: MovieFilterInput): Promise<PrismaMovieWithRelations[]>;
  findByCategory(category: string): Promise<PrismaMovieWithRelations[]>;
  findByUniversity(university: string): Promise<PrismaMovieWithRelations[]>;
  findContributed(userId: string): Promise<PrismaMovieWithRelations[]>;
  findById(id: string): Promise<PrismaMovieWithRelations | null>;
  findMovieWithAward(): Promise<PrismaMovieWithRelations[]>;
  create(input: CreateMovieInput): Promise<PrismaMovie>;
  update(id: string, input: UpdateMovieInput): Promise<PrismaMovie>;
  delete(id: string): Promise<PrismaMovieWithRelations>;
  count(): Promise<number>;
  sumViews(): Promise<number>;
}

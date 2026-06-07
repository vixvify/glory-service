import {
  MovieFilterInput,
  CreateMovieInput,
  UpdateMovieInput,
} from "./movie";
import { Movie as PrismaMovie } from "@prisma/client";

export interface MovieRepository {
  find(input?: MovieFilterInput): Promise<PrismaMovie[]>;
  findByCategory(category: string): Promise<PrismaMovie[]>;
  findByUniversity(university: string): Promise<PrismaMovie[]>;
  findContributed(userId: string): Promise<PrismaMovie[]>;
  findById(id: string): Promise<PrismaMovie | null>;
  create(input: CreateMovieInput): Promise<PrismaMovie>;
  update(id: string, input: UpdateMovieInput): Promise<PrismaMovie>;
  delete(id: string): Promise<PrismaMovie>;
  count(): Promise<number>;
  sumViews(): Promise<number>;
}

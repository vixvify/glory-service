import {
  MovieFilterParams,
  MovieRepositoryCreateInput,
  MovieRepositoryUpdateInput,
} from "./movie";
import { Movie as PrismaMovie } from "@prisma/client";

export interface MovieRepository {
  find(params?: MovieFilterParams): Promise<PrismaMovie[]>;
  findByCategory(category: string): Promise<PrismaMovie[]>;
  findByUniversity(university: string): Promise<PrismaMovie[]>;
  findById(id: string): Promise<PrismaMovie | null>;
  create(data: MovieRepositoryCreateInput): Promise<PrismaMovie>;
  update(id: string, data: MovieRepositoryUpdateInput): Promise<PrismaMovie>;
  delete(id: string): Promise<PrismaMovie>;
  count(): Promise<number>;
  sumViews(): Promise<number>;
}

import { CreateMovieBodyInput, UpdateMovieBodyInput, MovieFilterParams } from "./movie";
import { Movie as PrismaMovie } from "@prisma/client";

export interface MovieRepository {
  find(params?: MovieFilterParams): Promise<PrismaMovie[]>;
  findByCategory(category: string): Promise<PrismaMovie[]>;
  findByUniversity(university: string): Promise<PrismaMovie[]>;
  findById(id: string): Promise<PrismaMovie | null>;
  create(
    data: Omit<CreateMovieBodyInput, "thumbnail"> & {
      thumbnail: string;
    },
  ): Promise<PrismaMovie>;
  update(
    id: string,
    data: Omit<UpdateMovieBodyInput, "thumbnail"> & {
      thumbnail: string;
    },
  ): Promise<PrismaMovie>;
  delete(id: string): Promise<PrismaMovie>;
}

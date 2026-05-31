import { CreateMovieBodyInput, UpdateMovieBodyInput, MovieFilterParams } from "./movie";
import { Movie as PrismaMovie } from "@prisma/client";

export interface MovieRepository {
  find(params?: MovieFilterParams): Promise<PrismaMovie[]>;
  findByCategory(category: string): Promise<PrismaMovie[]>;
  findByUniversity(university: string): Promise<PrismaMovie[]>;
  findById(id: string): Promise<PrismaMovie | null>;
  create(
    data: Omit<CreateMovieBodyInput, "thumbnail" | "btsPhotos"> & {
      thumbnail: string;
      btsPhotos?: string;
    },
  ): Promise<PrismaMovie>;
  update(
    id: string,
    data: Omit<UpdateMovieBodyInput, "thumbnail" | "btsPhotos"> & {
      thumbnail: string;
      btsPhotos?: string;
    },
  ): Promise<PrismaMovie>;
  delete(id: string): Promise<PrismaMovie>;
}

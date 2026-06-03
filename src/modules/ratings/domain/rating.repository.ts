import { Rating as PrismaRating, Movie as PrismaMovie, User as PrismaUser } from "@prisma/client";
import {
  AddRatingBodyInput,
  GetRatingsQueryInput,
  UpdateRatingBodyInput,
} from "./rating";

export type RatingWithRelations = PrismaRating & {
  movie: PrismaMovie;
  user: Pick<PrismaUser, "id" | "email" | "name" | "role">;
};

export interface RatingRepository {
  addRating(data: AddRatingBodyInput): Promise<void>;
  getRatingsByUserIdAndMovieId(
    data: GetRatingsQueryInput,
  ): Promise<RatingWithRelations | null>;
  deleteRating(userId: string, movieId: string): Promise<void>;
  checkRating(userId: string, movieId: string): Promise<boolean>;
  updateRating(data: UpdateRatingBodyInput): Promise<void>;
}

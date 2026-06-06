import {
  AddRatingBodyInput,
  GetRatingsQueryInput,
  UpdateRatingBodyInput,
  RatingWithRelations,
} from "./rating";

export interface RatingRepository {
  addRating(data: AddRatingBodyInput): Promise<void>;
  getRatingsByUserIdAndMovieId(
    data: GetRatingsQueryInput,
  ): Promise<RatingWithRelations | null>;
  deleteRating(userId: string, movieId: string): Promise<void>;
  checkRating(userId: string, movieId: string): Promise<boolean>;
  updateRating(data: UpdateRatingBodyInput): Promise<void>;
}

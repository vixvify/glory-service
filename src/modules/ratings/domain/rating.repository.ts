import {
  AddRatingInput,
  GetRatingsInput,
  UpdateRatingInput,
  RatingWithRelations,
} from "./rating";

export interface RatingRepository {
  addRating(input: AddRatingInput): Promise<void>;
  getRatingsByUserIdAndMovieId(
    input: GetRatingsInput,
  ): Promise<RatingWithRelations | null>;
  deleteRating(userId: string, movieId: string): Promise<void>;
  checkRating(userId: string, movieId: string): Promise<boolean>;
  updateRating(input: UpdateRatingInput): Promise<void>;
  updateMovieAverageRating(movieId: string): Promise<void>;
}

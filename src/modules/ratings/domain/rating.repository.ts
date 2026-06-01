import {
  Rating,
  AddRatingBodyInput,
  GetRatingsQueryInput,
  UpdateRatingBodyInput,
} from "./rating";

export interface RatingRepository {
  addRating(data: AddRatingBodyInput): Promise<void>;
  getRatingsByUserIdAndMovieId(
    data: GetRatingsQueryInput,
  ): Promise<Rating | null>;
  deleteRating(userId: string, movieId: string): Promise<void>;
  checkRating(userId: string, movieId: string): Promise<boolean>;
  updateRating(data: UpdateRatingBodyInput): Promise<void>;
}

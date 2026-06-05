import { Rating as DomainRating } from "./domain/rating";
import { RatingWithRelations } from "./domain/rating.repository";

export class RatingFactory {
  static toDomain(rating: RatingWithRelations): DomainRating {
    return {
      id: rating.id,
      movieId: rating.movieId,
      userId: rating.userId,
      stars: rating.stars,
      createdAt: rating.createdAt,
      updatedAt: rating.updatedAt,
      user: {
        id: rating.user.id,
        name: rating.user.name || "Unknown User",
        email: rating.user.email,
        role: rating.user.role as "user" | "admin",
      },
      movie: {
        id: rating.movie.id,
        title: rating.movie.title,
        description: rating.movie.description,
        thumbnail: rating.movie.thumbnail,
        youtubeUrl: rating.movie.youtubeUrl,
        trailerUrl: rating.movie.trailerUrl || "",
        category: rating.movie.category,
        year: rating.movie.year,
        duration: rating.movie.duration,
        views: rating.movie.views,
        matchRate: rating.movie.matchRate,
        aspectRatio: rating.movie.aspectRatio,
        ageRating: rating.movie.ageRating,
        university: rating.movie.university,
        language: rating.movie.language,
        targetGroup: rating.movie.targetGroup,
        hasProfanity: rating.movie.hasProfanity,
        hasDrugs: rating.movie.hasDrugs,
        colorType: rating.movie.colorType,
        studio: rating.movie.studio,
        createdBy: rating.movie.createdBy,
        crew: [],
        bts: null,
        createdAt: rating.movie.createdAt,
        updatedAt: rating.movie.updatedAt,
      },
    };
  }
}

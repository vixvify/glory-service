import { Rating as DomainRating } from "./domain/rating";
import { RatingWithRelations } from "./domain/rating";
import { Role } from "../auth/domain/auth";

export class RatingFactory {
  static toDomain(rating: RatingWithRelations): DomainRating {
    return {
      movieId: rating.movieId,
      userId: rating.userId,
      stars: rating.stars,
      comment: rating.comment || null,
      createdAt: rating.createdAt,
      updatedAt: rating.updatedAt,
      user: {
        id: rating.user.id,
        name: rating.user.name || "Unknown User",
        email: rating.user.email,
        role: rating.user.role as Role,
      },
      movie: {
        id: rating.movie.id,
        title: rating.movie.title,
        description: rating.movie.description,
        thumbnail: rating.movie.thumbnail,
        youtubeUrl: rating.movie.youtubeUrl,
        trailerUrl: rating.movie.trailerUrl || "",
        category: {
          id: rating.movie.category.id,
          name: rating.movie.category.name,
          createdAt: rating.movie.category.createdAt,
        },
        releaseDate: rating.movie.releaseDate,
        duration: rating.movie.duration,
        views: rating.movie.views,
        matchRate: rating.movie.matchRate,
        averageRating: rating.movie.averageRating,
        aspectRatio: rating.movie.aspectRatio,
        ageRating: rating.movie.ageRating,
        university: rating.movie.university,
        school: rating.movie.school,
        language: rating.movie.language,
        hasProfanity: rating.movie.hasProfanity,
        hasDrugs: rating.movie.hasDrugs,
        colorType: rating.movie.colorType,
        studio: rating.movie.studio,
        createdBy: rating.movie.createdBy,
        crew: [],
        btsVideos: [],
        createdAt: rating.movie.createdAt,
        updatedAt: rating.movie.updatedAt,
        awards: rating.movie.awards || [],
      },
    };
  }
}

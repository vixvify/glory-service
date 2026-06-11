import { Rating as DomainRating } from "./domain/rating";
import { RatingWithRelations } from "./domain/rating";

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
        role: rating.user.role,
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
        year: rating.movie.year,
        duration: rating.movie.duration,
        views: rating.movie.views,
        matchRate: rating.movie.matchRate,
        averageRating: rating.movie.averageRating,
        aspectRatio: rating.movie.aspectRatio,
        ageRating: {
          id: rating.movie.ageRating.id,
          name: rating.movie.ageRating.name,
          createdAt: rating.movie.ageRating.createdAt,
        },
        university: rating.movie.university
          ? {
              id: rating.movie.university.id,
              name: rating.movie.university.name,
              createdAt: rating.movie.university.createdAt,
            }
          : null,
        language: rating.movie.language
          ? {
              id: rating.movie.language.id,
              name: rating.movie.language.name,
              createdAt: rating.movie.language.createdAt,
            }
          : null,
        targetGroup: rating.movie.targetGroup
          ? {
              id: rating.movie.targetGroup.id,
              name: rating.movie.targetGroup.name,
              createdAt: rating.movie.targetGroup.createdAt,
            }
          : null,
        hasProfanity: rating.movie.hasProfanity,
        hasDrugs: rating.movie.hasDrugs,
        colorType: rating.movie.colorType,
        studio: rating.movie.studio,
        createdBy: rating.movie.createdBy,
        crew: [],
        btsVideos: [],
        createdAt: rating.movie.createdAt,
        updatedAt: rating.movie.updatedAt,
      },
    };
  }
}

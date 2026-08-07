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
        trailerUrls: rating.movie.trailerUrls || [],
        categories: rating.movie.categories.map((c) => ({
          id: c.id,
          name: c.name,
          labelTh: c.labelTh,
          createdAt: c.createdAt,
        })),
        releaseDate: rating.movie.releaseDate,
        duration: rating.movie.duration,
        views: rating.movie.views,
        matchRate: rating.movie.matchRate,
        averageRating: rating.movie.averageRating,
        aspectRatio: rating.movie.aspectRatio,
        ageRating: rating.movie.ageRating.name,
        university: rating.movie.university?.name || null,
        school: rating.movie.school?.name || null,
        language: rating.movie.language?.name || null,
        subtitle: rating.movie.subtitle?.name || null,
        contentWarnings: (rating.movie.contentWarnings || []).map((cw) => cw.name),
        otherContentWarning: rating.movie.otherContentWarning,
        tags: (rating.movie.tags || []).map((t) => t.name),
        colorType: rating.movie.colorType.name,
        studio: rating.movie.studio,
        createdBy: rating.movie.createdBy,
        crew: [],
        btsVideos: [],
        createdAt: rating.movie.createdAt,
        updatedAt: rating.movie.updatedAt,
        awards: [],
      },
    };
  }
}

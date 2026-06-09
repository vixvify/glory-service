import {
  Movie as DtoMovie,
  MovieCrew,
  PrismaMovieWithRelations,
} from "./domain/movie";
import { Rating } from "../ratings/domain/rating";

export class MovieFactory {
  static toDomain(movie: PrismaMovieWithRelations): DtoMovie {
    const categorySnapshot = {
      id: movie.category.id,
      name: movie.category.name,
      createdAt: movie.category.createdAt,
    };
    const ageRatingSnapshot = {
      id: movie.ageRating.id,
      name: movie.ageRating.name,
      createdAt: movie.ageRating.createdAt,
    };
    const universitySnapshot = movie.university
      ? { id: movie.university.id, name: movie.university.name, createdAt: movie.university.createdAt }
      : null;
    const languageSnapshot = movie.language
      ? { id: movie.language.id, name: movie.language.name, createdAt: movie.language.createdAt }
      : null;
    const targetGroupSnapshot = movie.targetGroup
      ? { id: movie.targetGroup.id, name: movie.targetGroup.name, createdAt: movie.targetGroup.createdAt }
      : null;

    const ratings: Rating[] = movie.ratings
      ? movie.ratings.map(
          (r): Rating => ({
            movieId: r.movieId,
            userId: r.userId,
            stars: r.stars,
            comment: r.comment || null,
            createdAt: r.createdAt,
            updatedAt: r.updatedAt,
            user: {
              id: r.user?.id || r.userId,
              email: r.user?.email || "",
              name: r.user?.name ?? "Unknown User",
              role: r.user?.role || "user",
            },
            movie: {
              id: movie.id,
              title: movie.title,
              description: movie.description,
              thumbnail: movie.thumbnail,
              youtubeUrl: movie.youtubeUrl || "",
              trailerUrl: movie.trailerUrl || "",
              views: movie.views,
              year: movie.year,
              matchRate: movie.matchRate,
              aspectRatio: movie.aspectRatio,
              duration: movie.duration,
              hasProfanity: movie.hasProfanity,
              hasDrugs: movie.hasDrugs,
              colorType: movie.colorType,
              studio: movie.studio,
              createdBy: movie.createdBy,
              category: categorySnapshot,
              ageRating: ageRatingSnapshot,
              university: universitySnapshot,
              language: languageSnapshot,
              targetGroup: targetGroupSnapshot,
              crew: [] as MovieCrew[],
              btsVideos: [] as string[],
              createdAt: movie.createdAt,
              updatedAt: movie.updatedAt,
            },
          }),
        )
      : [];

    const crew: DtoMovie["crew"] = movie.crew
      ? movie.crew.map((c) => ({
          id: c.id,
          movieId: c.movieId,
          crewMemberId: c.crewMemberId,
          roleId: c.roleId,
          role: c.crewRole?.name || "",
          crewRole: c.crewRole
            ? { id: c.crewRole.id, name: c.crewRole.name, createdAt: c.crewRole.createdAt }
            : undefined,
          crewMember: c.crewMember
            ? {
                id: c.crewMember.id,
                name: c.crewMember.name,
                email: c.crewMember.email,
                userId: c.crewMember.userId,
                user: c.crewMember.user
                  ? {
                      id: c.crewMember.user.id,
                      email: c.crewMember.user.email,
                      name: c.crewMember.user.name ?? "Unknown User",
                      role: c.crewMember.user.role || "user",
                      photoUrl: c.crewMember.user.photoUrl,
                      motto: c.crewMember.user.motto,
                      bio: c.crewMember.user.bio,
                      ig: c.crewMember.user.ig,
                      facebook: c.crewMember.user.facebook,
                      youtube: c.crewMember.user.youtube,
                      tiktok: c.crewMember.user.tiktok,
                      positions: c.crewMember.user.positions,
                      birthday: c.crewMember.user.birthday,
                      awards: c.crewMember.user.awards,
                    }
                  : undefined,
                createdBy: c.crewMember.createdBy,
                createdAt: c.crewMember.createdAt,
                updatedAt: c.crewMember.updatedAt,
              }
            : undefined,
          createdAt: c.createdAt,
          updatedAt: c.updatedAt,
        }))
      : [];

    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      category: categorySnapshot,
      thumbnail: movie.thumbnail,
      youtubeUrl: movie.youtubeUrl || "",
      trailerUrl: movie.trailerUrl || "",
      views: movie.views,
      ratings,
      year: movie.year,
      matchRate: movie.matchRate,
      aspectRatio: movie.aspectRatio,
      ageRating: ageRatingSnapshot,
      duration: movie.duration,
      university: universitySnapshot,
      language: languageSnapshot,
      targetGroup: targetGroupSnapshot,
      hasProfanity: movie.hasProfanity,
      hasDrugs: movie.hasDrugs,
      colorType: movie.colorType,
      studio: movie.studio,
      createdBy: movie.createdBy,
      creator: movie.creator
        ? {
            id: movie.creator.id,
            email: movie.creator.email,
            name: movie.creator.name || "",
            role: (movie.creator.role as "admin" | "user") || "user",
          }
        : undefined,
      crew,
      btsVideos: movie.btsVideos || [],
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  static toDomainList(movies: PrismaMovieWithRelations[]): DtoMovie[] {
    return movies.map(MovieFactory.toDomain);
  }
}

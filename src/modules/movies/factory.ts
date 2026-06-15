import {
  Movie as DtoMovie,
  MovieCrew,
  PrismaMovieWithRelations,
} from "./domain/movie";
import { Rating } from "../ratings/domain/rating";
import { Role } from "../auth/domain/auth";

export class MovieFactory {
  static toDomain(movie: PrismaMovieWithRelations): DtoMovie {
    const categoriesSnapshot = movie.categories.map((c) => ({
      id: c.id,
      name: c.name,
      labelTh: c.labelTh,
      createdAt: c.createdAt,
    }));

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
              role: (r.user?.role as Role) || Role.USER,
            },
            movie: {
              id: movie.id,
              title: movie.title,
              description: movie.description,
              thumbnail: movie.thumbnail,
              youtubeUrl: movie.youtubeUrl || "",
              trailerUrl: movie.trailerUrl || "",
              views: movie.views,
              releaseDate: movie.releaseDate,
              matchRate: movie.matchRate,
              averageRating: movie.averageRating,
              aspectRatio: movie.aspectRatio,
              duration: movie.duration,
              hasProfanity: movie.hasProfanity,
              hasDrugs: movie.hasDrugs,
              colorType: movie.colorType,
              studio: movie.studio,
              createdBy: movie.createdBy,
              categories: categoriesSnapshot,
              ageRating: movie.ageRating,
              university: movie.university,
              school: movie.school,
              language: movie.language,
              crew: [] as MovieCrew[],
              btsVideos: [] as string[],
              createdAt: movie.createdAt,
              updatedAt: movie.updatedAt,
              awards: movie.awards || [],
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
            ? {
                id: c.crewRole.id,
                name: c.crewRole.name,
                labelTh: c.crewRole.labelTh,
                category: c.crewRole.category,
                categoryLabelTh: c.crewRole.categoryLabelTh,
                createdAt: c.crewRole.createdAt,
              }
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
                      role: (c.crewMember.user.role as Role) || Role.USER,
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

    const roleOrder: Record<string, number> = {
      DIRECTOR: 1,
      SCREENWRITER: 2,
      PRODUCER: 3,
      EDITOR: 4,
      LEAD_ACTOR: 5,
      ASSISTANT_DIRECTOR: 6,
      SCRIPT_SUPERVISOR: 7,
      PRODUCTION_MANAGER: 8,
      COLORIST: 9,
      SUPPORTING_ACTOR: 10,
    };

    crew.sort((a, b) => {
      const weightA = roleOrder[a.role.toUpperCase()] || 99;
      const weightB = roleOrder[b.role.toUpperCase()] || 99;
      if (weightA !== weightB) {
        return weightA - weightB;
      }
      return (a.crewMember?.name || "").localeCompare(b.crewMember?.name || "");
    });

    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      categories: categoriesSnapshot,
      thumbnail: movie.thumbnail,
      youtubeUrl: movie.youtubeUrl || "",
      trailerUrl: movie.trailerUrl || "",
      views: movie.views,
      ratings,
      releaseDate: movie.releaseDate,
      matchRate: movie.matchRate,
      averageRating: movie.averageRating,
      aspectRatio: movie.aspectRatio,
      ageRating: movie.ageRating,
      duration: movie.duration,
      university: movie.university,
      school: movie.school,
      language: movie.language,
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
      awards: movie.awards || [],
    };
  }

  static toDomainList(movies: PrismaMovieWithRelations[]): DtoMovie[] {
    return movies.map(MovieFactory.toDomain);
  }
}

import { Movie as DtoMovie } from "./domain/movie";
import {
  Movie as PrismaMovie,
  Rating as PrismaRating,
  User as PrismaUser,
  MovieCrew as PrismaMovieCrew,
  CrewMember as PrismaCrewMember,
  CrewRole as PrismaCrewRole,
  Category as PrismaCategory,
  AgeRating as PrismaAgeRating,
  University as PrismaUniversity,
  Language as PrismaLanguage,
  TargetGroup as PrismaTargetGroup,
} from "@prisma/client";
import { Rating } from "../ratings/domain/rating";

export interface PrismaMovieWithRelations extends PrismaMovie {
  category: PrismaCategory;
  ageRating: PrismaAgeRating;
  university: PrismaUniversity | null;
  language: PrismaLanguage | null;
  targetGroup: PrismaTargetGroup | null;
  creator: PrismaUser;

  ratings?: Array<PrismaRating & {
    user?: PrismaUser | null;
  }> | null;

  crew?: Array<PrismaMovieCrew & {
    crewRole: PrismaCrewRole;
    crewMember?: (PrismaCrewMember & {
      user?: PrismaUser | null;
    }) | null;
  }> | null;
}

export class MovieFactory {
  static toDomain(movie: PrismaMovieWithRelations): DtoMovie {
    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      category: {
        id: movie.category.id,
        name: movie.category.name,
        createdAt: movie.category.createdAt,
      },
      thumbnail: movie.thumbnail,
      youtubeUrl: movie.youtubeUrl || "",
      trailerUrl: movie.trailerUrl || "",
      views: movie.views,
      ratings: movie.ratings
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
                role: (r.user?.role as "user" | "admin") || "user",
              },
              movie: {
                id: movie.id,
                title: movie.title,
                description: movie.description,
                category: {
                  id: movie.category.id,
                  name: movie.category.name,
                  createdAt: movie.category.createdAt,
                },
                thumbnail: movie.thumbnail,
                youtubeUrl: movie.youtubeUrl || "",
                trailerUrl: movie.trailerUrl || "",
                views: movie.views,
                year: movie.year,
                matchRate: movie.matchRate,
                aspectRatio: movie.aspectRatio,
                ageRating: {
                  id: movie.ageRating.id,
                  name: movie.ageRating.name,
                  createdAt: movie.ageRating.createdAt,
                },
                duration: movie.duration,
                university: movie.university
                  ? {
                      id: movie.university.id,
                      name: movie.university.name,
                      createdAt: movie.university.createdAt,
                    }
                  : null,
                language: movie.language
                  ? {
                      id: movie.language.id,
                      name: movie.language.name,
                      createdAt: movie.language.createdAt,
                    }
                  : null,
                targetGroup: movie.targetGroup
                  ? {
                      id: movie.targetGroup.id,
                      name: movie.targetGroup.name,
                      createdAt: movie.targetGroup.createdAt,
                    }
                  : null,
                hasProfanity: movie.hasProfanity,
                hasDrugs: movie.hasDrugs,
                colorType: movie.colorType,
                studio: movie.studio,
                createdBy: movie.createdBy,
                crew: [],
                btsVideos: [],
                createdAt: movie.createdAt,
                updatedAt: movie.updatedAt,
              },
            }),
          )
        : [],
      year: movie.year,
      matchRate: movie.matchRate,
      aspectRatio: movie.aspectRatio,
      ageRating: {
        id: movie.ageRating.id,
        name: movie.ageRating.name,
        createdAt: movie.ageRating.createdAt,
      },
      duration: movie.duration,
      university: movie.university
        ? {
            id: movie.university.id,
            name: movie.university.name,
            createdAt: movie.university.createdAt,
          }
        : null,
      language: movie.language
        ? {
            id: movie.language.id,
            name: movie.language.name,
            createdAt: movie.language.createdAt,
          }
        : null,
      targetGroup: movie.targetGroup
        ? {
            id: movie.targetGroup.id,
            name: movie.targetGroup.name,
            createdAt: movie.targetGroup.createdAt,
          }
        : null,
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
      crew: movie.crew
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
                        role: (c.crewMember.user.role as "user" | "admin") || "user",
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
                  createdAt: c.crewMember.createdAt,
                  updatedAt: c.crewMember.updatedAt,
                }
              : undefined,
            createdAt: c.createdAt,
            updatedAt: c.updatedAt,
          }))
        : [],
      btsVideos: movie.btsVideos || [],
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  static toDomainList(movies: PrismaMovieWithRelations[]): DtoMovie[] {
    return movies.map(MovieFactory.toDomain);
  }
}

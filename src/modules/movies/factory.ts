import { Movie as DtoMovie } from "./domain/movie";
import { Movie as PrismaMovie } from "@prisma/client";
import { Rating } from "../ratings/domain/rating";

export interface PrismaMovieWithRelations extends PrismaMovie {
  ratings?: Array<{
    id: string;
    movieId: string;
    userId: string;
    stars: number;
    createdAt: Date;
    updatedAt: Date;
    user?: {
      id: string;
      email: string;
      name: string | null;
      role: string;
    } | null;
  }> | null;

  crew?: Array<{
    id: string;
    movieId: string;
    crewMemberId: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    crewMember?: {
      id: string;
      name: string;
      email?: string | null;
      userId?: string | null;
      user?: {
        id: string;
        email: string;
        name: string | null;
        role: string;
        photoUrl?: string | null;
        motto?: string | null;
        bio?: string | null;
        ig?: string | null;
        facebook?: string | null;
        youtube?: string | null;
        tiktok?: string | null;
        positions?: string[];
        birthday?: Date | null;
        awards?: string[];
      } | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
  }> | null;

  bts?: {
    id: string;
    movieId: string;
    btsVideo: string[];
    createdAt: Date;
    updatedAt: Date;
  } | null;
}

export class MovieFactory {
  static toDomain(movie: PrismaMovieWithRelations): DtoMovie {
    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      category: movie.category,
      thumbnail: movie.thumbnail,
      youtubeUrl: movie.youtubeUrl || "",
      trailerUrl: movie.trailerUrl || "",
      views: movie.views,
      ratings: movie.ratings
        ? movie.ratings.map(
            (r): Rating => ({
              id: r.id,
              movieId: r.movieId,
              userId: r.userId,
              stars: r.stars,
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
                category: movie.category,
                thumbnail: movie.thumbnail,
                youtubeUrl: movie.youtubeUrl || "",
                trailerUrl: movie.trailerUrl || "",
                views: movie.views,
                year: movie.year,
                matchRate: movie.matchRate,
                aspectRatio: movie.aspectRatio,
                ageRating: movie.ageRating,
                duration: movie.duration,
                university: movie.university,
                language: movie.language,
                targetGroup: movie.targetGroup,
                hasProfanity: movie.hasProfanity,
                hasDrugs: movie.hasDrugs,
                colorType: movie.colorType,
                studio: movie.studio,
                createdBy: movie.createdBy,
                crew: [],
                bts: null,
                createdAt: movie.createdAt,
                updatedAt: movie.updatedAt,
              },
            }),
          )
        : [],
      year: movie.year,
      matchRate: movie.matchRate,
      aspectRatio: movie.aspectRatio,
      ageRating: movie.ageRating,
      duration: movie.duration,
      university: movie.university,
      language: movie.language,
      targetGroup: movie.targetGroup,
      hasProfanity: movie.hasProfanity,
      hasDrugs: movie.hasDrugs,
      colorType: movie.colorType,
      studio: movie.studio,
      createdBy: movie.createdBy,

      crew: movie.crew
        ? movie.crew.map((c) => ({
            id: c.id,
            movieId: c.movieId,
            crewMemberId: c.crewMemberId,
            role: c.role,
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

      bts: movie.bts
        ? {
            id: movie.bts.id,
            movieId: movie.bts.movieId,
            btsVideo: movie.bts.btsVideo || [],
            createdAt: movie.bts.createdAt,
            updatedAt: movie.bts.updatedAt,
          }
        : null,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  static toDomainList(movies: PrismaMovieWithRelations[]): DtoMovie[] {
    return movies.map(MovieFactory.toDomain);
  }
}

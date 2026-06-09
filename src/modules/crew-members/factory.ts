import { CrewMember as PrismaCrewMember } from "@prisma/client";
import { CrewMember, CrewMemberWithRelations } from "./domain/crew-member";

export type CrewMemberDbResult = PrismaCrewMember &
  Partial<Omit<CrewMemberWithRelations, keyof PrismaCrewMember>>;

export class CrewMemberFactory {
  static toDomain(member: CrewMemberDbResult): CrewMember {
    if (!member) return member;
    return {
      id: member.id,
      name: member.name,
      email: member.email,
      userId: member.userId,
      createdBy: member.createdBy,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      user: member.user
        ? {
            id: member.user.id,
            email: member.user.email || "",
            name: member.user.name || "",
            role: member.user.role,
            photoUrl: member.user.photoUrl,
            motto: member.user.motto,
            bio: member.user.bio,
            ig: member.user.ig,
            facebook: member.user.facebook,
            youtube: member.user.youtube,
            tiktok: member.user.tiktok,
            positions: member.user.positions,
            birthday: member.user.birthday,
            awards: member.user.awards,
          }
        : null,
      movies: member.movies
        ? member.movies.map((mc) => ({
            id: mc.id,
            movieId: mc.movieId,
            crewMemberId: mc.crewMemberId,
            roleId: mc.roleId,
            role: mc.crewRole?.name || "",
            createdAt: mc.createdAt,
            updatedAt: mc.updatedAt,
            movie: mc.movie
              ? {
                  id: mc.movie.id,
                  title: mc.movie.title,
                  description: mc.movie.description,
                  thumbnail: mc.movie.thumbnail,
                  youtubeUrl: mc.movie.youtubeUrl,
                  trailerUrl: mc.movie.trailerUrl,
                  category: {
                    id: mc.movie.category.id,
                    name: mc.movie.category.name,
                    createdAt: mc.movie.category.createdAt,
                  },
                  views: mc.movie.views,
                  ratings: [],
                  year: mc.movie.year,
                  matchRate: mc.movie.matchRate,
                  aspectRatio: mc.movie.aspectRatio,
                  ageRating: {
                    id: mc.movie.ageRating.id,
                    name: mc.movie.ageRating.name,
                    createdAt: mc.movie.ageRating.createdAt,
                  },
                  duration: mc.movie.duration,
                  university: mc.movie.university
                    ? {
                        id: mc.movie.university.id,
                        name: mc.movie.university.name,
                        createdAt: mc.movie.university.createdAt,
                      }
                    : null,
                  language: mc.movie.language
                    ? {
                        id: mc.movie.language.id,
                        name: mc.movie.language.name,
                        createdAt: mc.movie.language.createdAt,
                      }
                    : null,
                  targetGroup: mc.movie.targetGroup
                    ? {
                        id: mc.movie.targetGroup.id,
                        name: mc.movie.targetGroup.name,
                        createdAt: mc.movie.targetGroup.createdAt,
                      }
                    : null,
                  hasProfanity: mc.movie.hasProfanity,
                  hasDrugs: mc.movie.hasDrugs,
                  colorType: mc.movie.colorType,
                  studio: mc.movie.studio,
                  createdBy: mc.movie.createdBy,
                  crew: [],
                  btsVideos: [],
                  createdAt: mc.movie.createdAt,
                  updatedAt: mc.movie.updatedAt,
                }
              : undefined,
          }))
        : undefined,
    };
  }

  static toDomainList(members: CrewMemberDbResult[]): CrewMember[] {
    return members.map(CrewMemberFactory.toDomain);
  }
}

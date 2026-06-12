import { CrewMember as PrismaCrewMember } from "@prisma/client";
import { CrewMember, CrewMemberWithRelations } from "./domain/crew-member";
import { Role } from "../auth/domain/auth";

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
            role: member.user.role as Role,
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
                  releaseDate: mc.movie.releaseDate,
                  matchRate: mc.movie.matchRate,
                  averageRating: mc.movie.averageRating,
                  aspectRatio: mc.movie.aspectRatio,
                  ageRating: mc.movie.ageRating,
                  duration: mc.movie.duration,
                  university: mc.movie.university,
                  school: mc.movie.school,
                  language: mc.movie.language,
                  hasProfanity: mc.movie.hasProfanity,
                  hasDrugs: mc.movie.hasDrugs,
                  colorType: mc.movie.colorType,
                  studio: mc.movie.studio,
                  createdBy: mc.movie.createdBy,
                  crew: [],
                  btsVideos: [],
                  createdAt: mc.movie.createdAt,
                  updatedAt: mc.movie.updatedAt,
                  awards: mc.movie.awards || [],
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

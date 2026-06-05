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
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      user: member.user
        ? {
            id: member.user.id,
            email: member.user.email || "",
            name: member.user.name || "",
            role: (member.user.role as "admin" | "user") || "user",
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
      movieCrews: member.movieCrews
        ? member.movieCrews.map((mc) => ({
            id: mc.id,
            movieId: mc.movieId,
            crewMemberId: mc.crewMemberId,
            role: mc.role,
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
                  category: mc.movie.category,
                  views: mc.movie.views,
                  ratings: [],
                  year: mc.movie.year,
                  matchRate: mc.movie.matchRate,
                  aspectRatio: mc.movie.aspectRatio,
                  ageRating: mc.movie.ageRating,
                  duration: mc.movie.duration,
                  university: mc.movie.university,
                  language: mc.movie.language,
                  targetGroup: mc.movie.targetGroup,
                  hasProfanity: mc.movie.hasProfanity,
                  hasDrugs: mc.movie.hasDrugs,
                  colorType: mc.movie.colorType,
                  studio: mc.movie.studio,
                  userId: mc.movie.userId,
                  crew: [],
                  bts: null,
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

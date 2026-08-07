import {
  Movie as DtoMovie,
  MovieCrew,
  PrismaMovieWithRelations,
} from "./domain/movie";
import { Rating } from "../ratings/domain/rating";
import { Role } from "../auth/domain/auth";
import { ROLE_ORDER } from "../../core/constants/crew";
export class MovieFactory {
  static toAwardPersistence(awards?: { projectName: string; awardList?: string[] }[]): { projectName: string; awardName: string }[] {
    return (awards ?? []).flatMap((p) =>
      (p.awardList ?? []).map((name) => ({ projectName: p.projectName, awardName: name }))
    );
  }

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
              trailerUrls: movie.trailerUrls || [],
              views: movie.views,
              releaseDate: movie.releaseDate,
              matchRate: movie.matchRate,
              averageRating: movie.averageRating,
              aspectRatio: movie.aspectRatio,
              duration: movie.duration,
              contentWarnings: (movie.contentWarnings || []).map((cw) => cw.name),
              otherContentWarning: movie.otherContentWarning,
              tags: (movie.tags || []).map((t) => t.name),
              colorType: movie.colorType.name,
              studio: movie.studio,
              createdBy: movie.createdBy,
              categories: categoriesSnapshot,
              ageRating: movie.ageRating.name,
              university: movie.university?.name || null,
              school: movie.school?.name || null,
              language: movie.language?.name || null,
              subtitle: movie.subtitle?.name || null,
              crew: [] as MovieCrew[],
              btsVideos: [] as string[],
              createdAt: movie.createdAt,
              updatedAt: movie.updatedAt,
              awards: (movie.awards ?? []).reduce<{ projectName: string; awardList: string[] }[]>(
                (acc, item) => {
                  const project = acc.find((p) => p.projectName === item.projectName);
                  if (project) {
                    project.awardList.push(item.awardName);
                  } else {
                    acc.push({ projectName: item.projectName, awardList: [item.awardName] });
                  }
                  return acc;
                },
                []
              ),
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
                labelEn: c.crewRole.labelEn,
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
    crew.sort((a, b) => {
      const weightA = ROLE_ORDER[a.role.toUpperCase()] || 99;
      const weightB = ROLE_ORDER[b.role.toUpperCase()] || 99;
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
      trailerUrls: movie.trailerUrls || [],
      views: movie.views,
      ratings,
      releaseDate: movie.releaseDate,
      matchRate: movie.matchRate,
      averageRating: movie.averageRating,
      aspectRatio: movie.aspectRatio,
      ageRating: movie.ageRating.name,
      duration: movie.duration,
      university: movie.university?.name || null,
      school: movie.school?.name || null,
      language: movie.language?.name || null,
      subtitle: movie.subtitle?.name || null,
      contentWarnings: (movie.contentWarnings || []).map((cw) => cw.name),
      otherContentWarning: movie.otherContentWarning,
      tags: (movie.tags || []).map((t) => t.name),
      colorType: movie.colorType.name,
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
      awards: (movie.awards ?? []).reduce<{ projectName: string; awardList: string[] }[]>(
        (acc, item) => {
          const project = acc.find((p) => p.projectName === item.projectName);
          if (project) {
            project.awardList.push(item.awardName);
          } else {
            acc.push({ projectName: item.projectName, awardList: [item.awardName] });
          }
          return acc;
        },
        []
      ),
    };
  }

  static toDomainList(movies: PrismaMovieWithRelations[]): DtoMovie[] {
    return movies.map(MovieFactory.toDomain);
  }
}

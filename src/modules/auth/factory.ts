import { User as DomainUser } from "./domain/auth";
import { User as PrismaUser } from "@prisma/client";

export class AuthFactory {
  static toSafeUserDTO(user: PrismaUser, token?: string): Omit<DomainUser, "id" | "role"> & { token?: string } {
    return {
      name: user.name || "",
      email: user.email,
      photoUrl: user.photoUrl,
      motto: user.motto,
      bio: user.bio,
      ig: user.ig,
      facebook: user.facebook,
      youtube: user.youtube,
      tiktok: user.tiktok,
      positions: user.positions,
      birthday: user.birthday,
      awards: user.awards,
      token,
    };
  }

  static toDomainUser(user: PrismaUser): Omit<DomainUser, "id" | "role"> {
    return {
      name: user.name || "",
      email: user.email,
      photoUrl: user.photoUrl,
      motto: user.motto,
      bio: user.bio,
      ig: user.ig,
      facebook: user.facebook,
      youtube: user.youtube,
      tiktok: user.tiktok,
      positions: user.positions,
      birthday: user.birthday,
      awards: user.awards,
    };
  }
}

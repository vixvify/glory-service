import { User as DomainUser } from "./domain/auth";
import { User as PrismaUser } from "@prisma/client";

export class AuthFactory {
  static toSafeUserDTO(user: PrismaUser, token?: string): DomainUser & { token?: string } {
    return {
      id: user.id,
      name: user.name || "",
      email: user.email,
      role: user.role as "admin" | "user",
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

  static toDomainUser(user: PrismaUser): DomainUser {
    return {
      id: user.id,
      name: user.name || "",
      email: user.email,
      role: user.role as "admin" | "user",
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

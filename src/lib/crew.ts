import { NotFoundError } from "../core/error";
import { CrewMemberRepository } from "../modules/crew-members/domain/crew-member.repository";
import { MovieCrewRepository } from "../modules/movies/domain/movie-crew.repository";
import { AuthRepository } from "../modules/auth/domain/auth.repository";
import { AssociateCrewBulkInput } from "../modules/movies/domain/movie";
import { MovieCrewInputItem } from "../core/utils/transform/parser";
import { prisma } from "./prisma";
import { invalidateCache } from "../core/utils/cache/invalidate-cache";
import { CacheKeys } from "../core/utils/cache/cache-key";

export interface CrewAssociateDeps {
  crewMemberRepo: CrewMemberRepository;
  movieCrewRepo: MovieCrewRepository;
  authRepo: AuthRepository;
}

export async function associateCrewBulk(
  input: AssociateCrewBulkInput,
  createdBy: string,
  deps: CrewAssociateDeps,
): Promise<void> {
  const { movieId, crew } = input;
  const { crewMemberRepo, movieCrewRepo, authRepo } = deps;

  const items: Array<{ item: MovieCrewInputItem; role: string }> = [];

  for (const val of crew) {
    if (
      val &&
      val.role &&
      (val.crewMemberId || (val.name && val.name.trim()))
    ) {
      items.push({
        item: {
          crewMemberId: val.crewMemberId,
          name: val.name,
          email: val.email,
        },
        role: val.role.trim().toUpperCase(),
      });
    }
  }

  if (items.length === 0) return;

  const crewIdMap = new Map<string, string>();

  const explicitIds = Array.from(
    new Set(
      items.map((x) => x.item.crewMemberId).filter((id): id is string => !!id),
    ),
  );

  if (explicitIds.length > 0) {
    const existingMembers = await crewMemberRepo.findManyByIds(explicitIds);

    if (existingMembers.length !== explicitIds.length) {
      const foundUuids = new Set(existingMembers.map((m) => m.id));
      const missing = explicitIds.find((id) => !foundUuids.has(id));
      throw new NotFoundError(`Crew member with ID ${missing} not found`);
    }

    for (const m of existingMembers) {
      crewIdMap.set(m.id, m.id);
    }
  }

  const itemsToResolve = items.filter((i) => !i.item.crewMemberId);

  if (itemsToResolve.length > 0) {
    const uniqueEmails = [
      ...new Set(
        itemsToResolve
          .map((i) => i.item.email?.trim().toLowerCase())
          .filter((e): e is string => !!e),
      ),
    ];
    const uniqueNames = [
      ...new Set(
        itemsToResolve
          .map((i) => i.item.name?.trim())
          .filter((n): n is string => !!n),
      ),
    ];

    const [byEmailBatch, byNameBatch] = await Promise.all([
      uniqueEmails.length > 0
        ? crewMemberRepo.findManyByEmails(uniqueEmails)
        : [],
      uniqueNames.length > 0 ? crewMemberRepo.findManyByNames(uniqueNames) : [],
    ]);

    const emailMap = new Map(
      byEmailBatch.map((m) => [m.email?.toLowerCase() ?? "", m]),
    );
    const nameMap = new Map(byNameBatch.map((m) => [m.name, m]));

    const emailsNeedingUserLink = byEmailBatch
      .filter((m) => !m.email || !m.userId)
      .map((m) => m.email?.toLowerCase() ?? "")
      .filter(Boolean);

    const allEmailsForUserLookup = [
      ...new Set([...uniqueEmails, ...emailsNeedingUserLink]),
    ];
    const usersByEmail = new Map<string, string>();
    if (allEmailsForUserLookup.length > 0) {
      await Promise.all(
        allEmailsForUserLookup.map(async (email) => {
          const user = await authRepo.findByEmail(email);
          if (user) usersByEmail.set(email, user.id);
        }),
      );
    }

    for (const { item } of itemsToResolve) {
      const email = item.email?.trim().toLowerCase() || "";
      const name = item.name?.trim() || "";

      if (!name) continue;

      let memberId = "";

      if (email) {
        const byEmail = emailMap.get(email);
        if (byEmail) {
          memberId = byEmail.id;
          if (!byEmail.email && email) {
            const userId = usersByEmail.get(email) ?? null;
            await crewMemberRepo.update(byEmail.id, {
              name: byEmail.name,
              email,
              userId,
            });
          }
        }
      }

      if (!memberId) {
        const byName = nameMap.get(name);
        if (byName) {
          memberId = byName.id;
          if (!byName.email && email) {
            const userId = usersByEmail.get(email) ?? null;
            await crewMemberRepo.update(byName.id, {
              name: byName.name,
              email,
              userId,
            });
          }
        }
      }

      if (!memberId) {
        const userId = email ? (usersByEmail.get(email) ?? null) : null;
        const created = await crewMemberRepo.create({
          name,
          email: email || null,
          userId,
          createdBy,
        });
        memberId = created.id;
      }

      const itemKey = email ? `email:${email}` : `name:${name}`;
      crewIdMap.set(itemKey, memberId);
    }
  }

  const dbCrewRoles = await prisma.crewRole.findMany();
  const crewRoleMap = new Map(
    dbCrewRoles.map((cr) => [cr.name.toUpperCase(), cr.id]),
  );

  const movieCrewsData = items.map((item) => {
    let itemKey = "";
    if (item.item.crewMemberId) {
      itemKey = item.item.crewMemberId;
    } else {
      const email = item.item.email?.trim().toLowerCase() || "";
      const name = item.item.name?.trim() || "";
      itemKey = email ? `email:${email}` : `name:${name}`;
    }

    const crewMemberId = crewIdMap.get(itemKey);
    if (!crewMemberId) {
      throw new Error(`Failed to map crew member for key: ${itemKey}`);
    }
    const roleId = crewRoleMap.get(item.role.toUpperCase());
    if (!roleId) {
      throw new Error(`Role ID not found for role: ${item.role}`);
    }
    return { movieId, crewMemberId, roleId };
  });

  await prisma.$transaction(async (tx) => {
    await tx.movieCrew.deleteMany({
      where: { movieId },
    });

    if (movieCrewsData.length > 0) {
      await tx.movieCrew.createMany({
        data: movieCrewsData,
        skipDuplicates: true,
      });
    }
  });

  await invalidateCache([
    CacheKeys.crewListDefault(),
    CacheKeys.crewListWildcard(),
  ]);
}

import { NotFoundError } from "../core/error";
import { CrewMemberRepositoryImpl } from "../infrastructure/crew-member.repository";
import { MovieCrewRepositoryImpl } from "../infrastructure/movie-crew.repository";
import { AuthRepositoryImpl } from "../infrastructure/auth.repository";
import { AssociateCrewBulkInput } from "../modules/movies/domain/movie";
import { MovieCrewInputItem } from "../core/utils/parser";
import { prisma } from "./prisma";

const crewMemberRepo = new CrewMemberRepositoryImpl();
const movieCrewRepo = new MovieCrewRepositoryImpl();
const authRepo = new AuthRepositoryImpl();

export async function associateCrewBulk(
  input: AssociateCrewBulkInput,
  createdBy: string,
): Promise<void> {
  const { movieId, directors, producers, writers, cast, dops, editors } = input;

  const items: Array<{ item: MovieCrewInputItem; role: string }> = [];

  const addItems = (list: MovieCrewInputItem[], role: string) => {
    for (const val of list) {
      if (val && (val.crewMemberId || (val.name && val.name.trim()))) {
        items.push({ item: val, role });
      }
    }
  };

  addItems(directors, "DIRECTOR");
  addItems(producers, "PRODUCER");
  addItems(writers, "WRITER");
  addItems(cast, "CAST");
  addItems(dops, "DOP");
  addItems(editors, "EDITOR");

  if (items.length === 0) return;

  const crewIdMap = new Map<string, string>();

  // 1. First, validate and collect all explicitly provided IDs
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

  // 2. Resolve items that do not have crewMemberId
  for (const { item } of items) {
    if (item.crewMemberId) {
      continue;
    }

    const email = item.email?.trim() || "";
    const name = item.name?.trim() || "";

    if (!name) continue;

    let memberId = "";

    // A. Look up by email if provided
    if (email) {
      const byEmail = await crewMemberRepo.findByEmail(email);
      if (byEmail) {
        memberId = byEmail.id;
      }
    }

    // B. Look up by name if not found by email or email was not provided
    if (!memberId) {
      const byName = await crewMemberRepo.findByName(name);
      if (byName) {
        memberId = byName.id;
        if (!byName.email && email) {
          const user = await authRepo.findByEmail(email);
          await crewMemberRepo.update(byName.id, {
            name: byName.name,
            email,
            userId: user?.id || null,
          });
        }
      }
    }

    // C. If still not found, create new CrewMember
    if (!memberId) {
      let userId: string | null = null;
      if (email) {
        const user = await authRepo.findByEmail(email);
        userId = user?.id || null;
      }

      const created = await crewMemberRepo.create({
        name,
        email: email || null,
        userId,
        createdBy,
      });
      memberId = created.id;
    }

    const itemKey = email ? `email:${email.toLowerCase()}` : `name:${name}`;
    crewIdMap.set(itemKey, memberId);
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
      const email = item.item.email?.trim() || "";
      const name = item.item.name?.trim() || "";
      itemKey = email ? `email:${email.toLowerCase()}` : `name:${name}`;
    }

    const crewMemberId = crewIdMap.get(itemKey);
    if (!crewMemberId) {
      throw new Error(`Failed to map crew member for key: ${itemKey}`);
    }
    const roleId = crewRoleMap.get(item.role.toUpperCase());
    if (!roleId) {
      throw new Error(`Role ID not found for role: ${item.role}`);
    }
    return {
      movieId,
      crewMemberId,
      roleId,
    };
  });

  const existing = await movieCrewRepo.findByMovieId(movieId);

  const existingMap = new Map<string, string>();
  for (const ext of existing) {
    existingMap.set(`${ext.crewMemberId}-${ext.roleId}`, ext.id);
  }

  const targetKeys = new Set<string>();
  for (const target of movieCrewsData) {
    targetKeys.add(`${target.crewMemberId}-${target.roleId}`);
  }

  const toDelete: string[] = [];
  for (const ext of existing) {
    const key = `${ext.crewMemberId}-${ext.roleId}`;
    if (!targetKeys.has(key)) {
      toDelete.push(ext.id);
    }
  }

  const toInsert = movieCrewsData.filter((target) => {
    const key = `${target.crewMemberId}-${target.roleId}`;
    return !existingMap.has(key);
  });

  if (toDelete.length > 0) {
    await movieCrewRepo.deleteMany(toDelete);
  }
  if (toInsert.length > 0) {
    await movieCrewRepo.createMany(toInsert);
  }
}

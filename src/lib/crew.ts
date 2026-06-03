import { NotFoundError } from "../core/error";
import { isUuid } from "../core/utils/validator";
import { CrewMemberRepositoryImpl } from "../infrastructure/crew-member.repository";
import { MovieCrewRepositoryImpl } from "../infrastructure/movie-crew.repository";

const crewMemberRepo = new CrewMemberRepositoryImpl();
const movieCrewRepo = new MovieCrewRepositoryImpl();

export async function associateCrewBulk(
  movieId: string,
  directors: string[],
  producers: string[],
  writers: string[],
  cast: string[],
  dops: string[],
  editors: string[],
): Promise<void> {
  const items: Array<{ value: string; role: string }> = [];

  const addItems = (list: string[], role: string) => {
    for (const val of list) {
      if (val && val.trim()) {
        items.push({ value: val.trim(), role });
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

  const uuidItems = items.filter((item) => isUuid(item.value));
  const nameItems = items.filter((item) => !isUuid(item.value));

  const crewIdMap = new Map<string, string>();

  if (uuidItems.length > 0) {
    const uuids = Array.from(new Set(uuidItems.map((item) => item.value)));
    const existingMembers = await crewMemberRepo.findManyByIds(uuids);

    if (existingMembers.length !== uuids.length) {
      const foundUuids = new Set(existingMembers.map((m) => m.id));
      const missing = uuids.find((id) => !foundUuids.has(id));
      throw new NotFoundError(`Crew member with ID ${missing} not found`);
    }

    for (const m of existingMembers) {
      crewIdMap.set(m.id, m.id);
    }
  }

  if (nameItems.length > 0) {
    const names = Array.from(new Set(nameItems.map((item) => item.value)));
    const existingMembers = await crewMemberRepo.findManyByNames(names);

    const existingNames = new Set(existingMembers.map((m) => m.name));
    for (const m of existingMembers) {
      crewIdMap.set(m.name, m.id);
    }

    const missingNames = names.filter((name) => !existingNames.has(name));
    if (missingNames.length > 0) {
      await crewMemberRepo.createMany(missingNames);

      const newMembers = await crewMemberRepo.findManyByNames(missingNames);

      for (const m of newMembers) {
        crewIdMap.set(m.name, m.id);
      }
    }
  }

  const movieCrewsData = items.map((item) => {
    const crewMemberId = crewIdMap.get(item.value);
    if (!crewMemberId) {
      throw new Error(`Failed to map crew member for value: ${item.value}`);
    }
    return {
      movieId,
      crewMemberId,
      role: item.role,
    };
  });

  await movieCrewRepo.createMany(movieCrewsData);
}

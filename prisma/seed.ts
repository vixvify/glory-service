import { PrismaClient, Prisma } from "@prisma/client";
import {
  seedMovies,
  categories,
  ageRatings,
  universities,
  languages,
  targetGroups,
  SeedCrewMember,
} from "./movies.data";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seeding...");
  console.log("Cleaning up database...");
  await prisma.movieCrew.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.crewMember.deleteMany();
  await prisma.crewRole.deleteMany();
  await prisma.category.deleteMany();
  await prisma.university.deleteMany();
  await prisma.ageRating.deleteMany();
  await prisma.language.deleteMany();
  await prisma.targetGroup.deleteMany();

  console.log("Syncing default user...");
  let defaultUser = await prisma.user.findFirst({
    where: { email: "admin@thaiflix.com" },
  });
  if (!defaultUser) {
    const hashedPassword = await Bun.password.hash("password123");
    defaultUser = await prisma.user.create({
      data: {
        email: "admin@thaiflix.com",
        password: hashedPassword,
        name: "Admin System",
        role: "admin",
      },
    });
  }
  const defaultUserId = defaultUser.id;

  console.log("Seeding master data...");
  await prisma.category.createMany({
    data: categories.map((name) => ({ name })),
  });

  await prisma.ageRating.createMany({
    data: ageRatings.map((name) => ({ name })),
  });

  await prisma.university.createMany({
    data: universities.map((name) => ({ name })),
  });

  await prisma.language.createMany({
    data: languages.map((name) => ({ name })),
  });

  await prisma.targetGroup.createMany({
    data: targetGroups.map((name) => ({ name })),
  });

  const roles = ["DIRECTOR", "PRODUCER", "WRITER", "CAST", "DOP", "EDITOR"];
  await prisma.crewRole.createMany({
    data: roles.map((name) => ({ name })),
  });

  console.log("Retrieving master data mappings...");
  const dbCategories = await prisma.category.findMany();
  const categoryMap = new Map(
    dbCategories.map((c) => [c.name.toLowerCase(), c.id]),
  );

  const dbAgeRatings = await prisma.ageRating.findMany();
  const ageRatingMap = new Map(
    dbAgeRatings.map((ar) => [ar.name.toLowerCase(), ar.id]),
  );

  const dbUniversities = await prisma.university.findMany();
  const universityMap = new Map(
    dbUniversities.map((u) => [u.name.toLowerCase(), u.id]),
  );

  const dbLanguages = await prisma.language.findMany();
  const languageMap = new Map(
    dbLanguages.map((l) => [l.name.toLowerCase(), l.id]),
  );

  const dbTargetGroups = await prisma.targetGroup.findMany();
  const targetGroupMap = new Map(
    dbTargetGroups.map((tg) => [tg.name.toLowerCase(), tg.id]),
  );

  const dbCrewRoles = await prisma.crewRole.findMany();
  const crewRoleMap = new Map(
    dbCrewRoles.map((cr) => [cr.name.toLowerCase(), cr.id]),
  );

  console.log("Gathering unique crew members...");
  const uniqueCrew = new Set<string>();

  const processCrew = (
    input:
      | SeedCrewMember
      | SeedCrewMember[]
      | string[]
      | string
      | undefined
      | null,
  ) => {
    if (!input) return;
    if (Array.isArray(input)) {
      for (const item of input) {
        if (item && typeof item === "object" && "name" in item && item.name) {
          uniqueCrew.add(item.name.trim());
        }
      }
    } else if (typeof input === "object" && "name" in input && input.name) {
      uniqueCrew.add(input.name.trim());
    }
  };

  for (const movie of seedMovies) {
    const oldCrew = movie.crew?.create;
    if (oldCrew) {
      processCrew(oldCrew.director);
      processCrew(oldCrew.producer);
      processCrew(oldCrew.writer);
      processCrew(oldCrew.cast);
    }
  }

  console.log(
    `Found ${uniqueCrew.size} unique crew members. Syncing with database in bulk...`,
  );
  const seenEmails = new Set<string>();
  const crewData = Array.from(uniqueCrew).map((name) => {
    let emailPrefix = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!emailPrefix) emailPrefix = "crew";

    let email = `${emailPrefix}@thaiflix.com`;
    let counter = 1;
    while (seenEmails.has(email)) {
      email = `${emailPrefix}${counter}@thaiflix.com`;
      counter++;
    }
    seenEmails.add(email);

    return {
      name,
      email,
      createdBy: defaultUserId,
    };
  });

  await prisma.crewMember.createMany({
    data: crewData,
    skipDuplicates: true,
  });

  const allCrewMembers = await prisma.crewMember.findMany();
  const crewMap = new Map<string, string>();
  for (const c of allCrewMembers) {
    crewMap.set(c.name, c.id);
  }

  const getNames = (
    input:
      | SeedCrewMember
      | SeedCrewMember[]
      | string[]
      | string
      | undefined
      | null,
  ): string[] => {
    if (!input) return [];
    if (Array.isArray(input)) {
      return input
        .map((item) => {
          if (typeof item === "string") return item.trim();
          return item?.name?.trim();
        })
        .filter(Boolean) as string[];
    }
    if (typeof input === "object" && "name" in input && input.name) {
      return [input.name.trim()];
    }
    if (typeof input === "string") {
      return [input.trim()];
    }
    return [];
  };

  console.log("Preparing movies and relations in memory...");
  const moviesToInsert: Prisma.MovieCreateManyInput[] = [];
  const movieCrewsToInsert: Prisma.MovieCrewCreateManyInput[] = [];

  const getColorType = (type: string): "color" | "black_and_white" => {
    const clean = type.toUpperCase();
    if (clean === "BLACK_AND_WHITE" || clean === "BLACK_AND_WHITE") {
      return "black_and_white";
    }
    return "color";
  };

  let idx = 0;
  for (const movie of seedMovies) {
    const movieId = crypto.randomUUID();

    const hasProfanity = idx % 3 === 1;
    const hasDrugs = idx % 3 === 2;

    const colorTypes = ["COLOR", "BLACK_AND_WHITE", "COLOR_AND_BW"];
    const colorType = getColorType(colorTypes[idx % colorTypes.length]);

    const studios = [
      "Glory Original",
      "Thaifflix Productions",
      "Studio Ghibli",
      "Independent Creators",
      "Bangkok Film Co.",
    ];
    const studio = studios[idx % studios.length];

    const categoryId = categoryMap.get(movie.category.toLowerCase());
    if (!categoryId) throw new Error(`Category not found: ${movie.category}`);

    const ageRatingStr = movie.ageRating || "PG-13";
    const ageRatingId = ageRatingMap.get(ageRatingStr.toLowerCase());
    if (!ageRatingId) throw new Error(`Age rating not found: ${ageRatingStr}`);

    const universityId = movie.university
      ? universityMap.get(movie.university.toLowerCase()) || null
      : null;
    const languageId = movie.language
      ? languageMap.get(movie.language.toLowerCase()) || null
      : null;
    const targetGroupId = movie.targetGroup
      ? targetGroupMap.get(movie.targetGroup.toLowerCase()) || null
      : null;

    const oldCrew = movie.crew?.create;
    const btsVideos = oldCrew?.btsVideo ? [oldCrew.btsVideo] : [];

    moviesToInsert.push({
      id: movieId,
      title: movie.title,
      description: movie.description,
      thumbnail: movie.thumbnail,
      youtubeUrl: movie.youtubeUrl,
      trailerUrl: movie.trailerUrl || movie.youtubeUrl,
      categoryId,
      year: movie.year,
      duration: movie.duration,
      views: movie.views || 0,
      matchRate: movie.matchRate || 100,
      aspectRatio: idx < 40 && idx >= 30 ? "แนวตั้ง" : "แนวนอน",
      ageRatingId,
      universityId,
      languageId,
      targetGroupId,
      hasProfanity,
      hasDrugs,
      colorType,
      studio,
      createdBy: defaultUserId,
      btsVideos,
    });

    if (oldCrew) {
      const addCrewRelations = (names: string[], roleName: string) => {
        const roleId = crewRoleMap.get(roleName.toLowerCase());
        if (!roleId) throw new Error(`Role ID not found for role: ${roleName}`);

        for (const name of names) {
          if (!name) continue;
          const crewMemberId = crewMap.get(name);
          if (crewMemberId) {
            movieCrewsToInsert.push({
              movieId,
              crewMemberId,
              roleId,
            });
          }
        }
      };

      const directors = getNames(oldCrew.director);
      const producers = getNames(oldCrew.producer);
      const writers = getNames(oldCrew.writer);
      const cast = getNames(oldCrew.cast);

      addCrewRelations(directors, "DIRECTOR");
      addCrewRelations(producers, "PRODUCER");
      addCrewRelations(writers, "WRITER");
      addCrewRelations(cast, "CAST");

      // Add DOP and Editor from existing crew list
      if (allCrewMembers.length > 0) {
        const dopMember = allCrewMembers[(idx * 2) % allCrewMembers.length];
        const editorMember =
          allCrewMembers[(idx * 2 + 1) % allCrewMembers.length];

        const dopRoleId = crewRoleMap.get("dop");
        const editorRoleId = crewRoleMap.get("editor");

        if (dopRoleId) {
          movieCrewsToInsert.push({
            movieId,
            crewMemberId: dopMember.id,
            roleId: dopRoleId,
          });
        }
        if (editorRoleId) {
          movieCrewsToInsert.push({
            movieId,
            crewMemberId: editorMember.id,
            roleId: editorRoleId,
          });
        }
      }
    }
    idx++;
  }

  console.log(`Inserting ${moviesToInsert.length} movies in bulk...`);
  await prisma.movie.createMany({
    data: moviesToInsert,
    skipDuplicates: true,
  });

  const seen = new Set<string>();
  const finalMovieCrews: Prisma.MovieCrewCreateManyInput[] = [];
  for (const item of movieCrewsToInsert) {
    const key = `${item.movieId}-${item.crewMemberId}-${item.roleId}`;
    if (!seen.has(key)) {
      seen.add(key);
      finalMovieCrews.push(item);
    }
  }

  console.log(
    `Inserting ${finalMovieCrews.length} movie crew mappings in bulk...`,
  );
  await prisma.movieCrew.createMany({
    data: finalMovieCrews,
    skipDuplicates: true,
  });

  console.log(`✅ Seeded ${seedMovies.length} movies successfully.`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

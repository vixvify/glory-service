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
  await prisma.movieBts.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.crewMember.deleteMany();
  await prisma.category.deleteMany();
  await prisma.university.deleteMany();
  await prisma.ageRating.deleteMany();
  await prisma.language.deleteMany();
  await prisma.targetGroup.deleteMany();

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
  const crewData = Array.from(uniqueCrew).map((name) => ({
    name,
  }));
 
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
  const movieBtsToInsert: Prisma.MovieBtsCreateManyInput[] = [];

  let idx = 0;
  for (const movie of seedMovies) {
    const movieId = crypto.randomUUID();

    const hasProfanity = idx % 3 === 1;
    const hasDrugs = idx % 3 === 2;

    const colorTypes = ["COLOR", "BLACK_AND_WHITE", "COLOR_AND_BW"];
    const colorType = colorTypes[idx % colorTypes.length];

    const studios = [
      "Glory Original",
      "Thaifflix Productions",
      "Studio Ghibli",
      "Independent Creators",
      "Bangkok Film Co.",
    ];
    const studio = studios[idx % studios.length];

    moviesToInsert.push({
      id: movieId,
      title: movie.title,
      description: movie.description,
      thumbnail: movie.thumbnail,
      youtubeUrl: movie.youtubeUrl,
      trailerUrl: movie.trailerUrl || movie.youtubeUrl,
      category: movie.category,
      year: movie.year,
      duration: movie.duration,
      views: movie.views || 0,
      matchRate: movie.matchRate || 100,
      ageRating: movie.ageRating || "PG-13",
      university: movie.university || null,
      language: movie.language || null,
      targetGroup: movie.targetGroup || null,
      hasProfanity,
      hasDrugs,
      colorType,
      studio,
    });

    const oldCrew = movie.crew?.create;
    if (oldCrew) {
      const addCrewRelations = (names: string[], role: string) => {
        for (const name of names) {
          if (!name) continue;
          const crewMemberId = crewMap.get(name);
          if (crewMemberId) {
            movieCrewsToInsert.push({
              movieId,
              crewMemberId,
              role,
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

        movieCrewsToInsert.push({
          movieId,
          crewMemberId: dopMember.id,
          role: "DOP",
        });
        movieCrewsToInsert.push({
          movieId,
          crewMemberId: editorMember.id,
          role: "EDITOR",
        });
      }

      const btsVideo = oldCrew.btsVideo ? [oldCrew.btsVideo] : [];

      movieBtsToInsert.push({
        movieId,
        btsVideo,
      });
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
    const key = `${item.movieId}-${item.crewMemberId}-${item.role}`;
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

  console.log(
    `Inserting ${movieBtsToInsert.length} movie BTS records in bulk...`,
  );
  await prisma.movieBts.createMany({
    data: movieBtsToInsert,
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

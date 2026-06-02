import { PrismaClient } from "@prisma/client";
import { seedMovies, categories, ageRatings, universities, languages, targetGroups } from "./movies.data";

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
    data: categories.map(name => ({ name })),
  });

  await prisma.ageRating.createMany({
    data: ageRatings.map(name => ({ name })),
  });

  await prisma.university.createMany({
    data: universities.map(name => ({ name })),
  });

  await prisma.language.createMany({
    data: languages.map(name => ({ name })),
  });

  await prisma.targetGroup.createMany({
    data: targetGroups.map(name => ({ name })),
  });

  console.log("Gathering unique crew members...");
  const uniqueCrew = new Map<string, string | undefined>();

  const processCrew = (input: any) => {
    if (!input) return;
    if (Array.isArray(input)) {
      for (const item of input) {
        if (item && typeof item === "object" && item.name) {
          uniqueCrew.set(item.name.trim(), item.photoUrl);
        }
      }
    } else if (typeof input === "object" && input.name) {
      uniqueCrew.set(input.name.trim(), input.photoUrl);
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

  console.log(`Found ${uniqueCrew.size} unique crew members. Syncing with database in bulk...`);
  const crewData = Array.from(uniqueCrew.entries()).map(([name, photoUrl]) => ({
    name,
    photoUrl,
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

  const getNames = (input: any): string[] => {
    if (!input) return [];
    if (Array.isArray(input)) {
      return input.map(item => item?.name?.trim()).filter(Boolean);
    }
    if (typeof input === "object" && input.name) {
      return [input.name.trim()];
    }
    return [];
  };

  console.log("Preparing movies and relations in memory...");
  const moviesToInsert: any[] = [];
  const movieCrewsToInsert: any[] = [];
  const movieBtsToInsert: any[] = [];

  for (const movie of seedMovies) {
    const movieId = crypto.randomUUID();
    moviesToInsert.push({
      id: movieId,
      title: movie.title,
      description: movie.description,
      thumbnail: movie.thumbnail,
      youtubeUrl: movie.youtubeUrl,
      category: movie.category,
      year: movie.year,
      duration: movie.duration,
      views: movie.views || 0,
      matchRate: movie.matchRate || 100,
      ageRating: movie.ageRating || "PG-13",
      university: movie.university || null,
      facebook: movie.facebook,
      instagram: movie.instagram,
      email: movie.email,
      language: movie.language,
      targetGroup: movie.targetGroup,
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

      if (movieCrewsToInsert.length > 0) {
        const seen = new Set<string>();
        const uniqueMovieCrews: any[] = [];
        for (const item of movieCrewsToInsert) {
          const key = `${item.movieId}-${item.crewMemberId}-${item.role}`;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueMovieCrews.push(item);
          }
        }
      }

      const btsVideo = oldCrew.btsVideo ? [oldCrew.btsVideo] : [];
      const btsPhotos = Array.isArray(oldCrew.btsPhotos)
        ? oldCrew.btsPhotos
        : (oldCrew.btsPhotos ? oldCrew.btsPhotos.split(",").map((s: string) => s.trim()).filter(Boolean) : []);

      movieBtsToInsert.push({
        movieId,
        btsVideo,
        btsPhotos,
      });
    }
  }

  console.log(`Inserting ${moviesToInsert.length} movies in bulk...`);
  await prisma.movie.createMany({
    data: moviesToInsert,
    skipDuplicates: true,
  });

  const seen = new Set<string>();
  const finalMovieCrews: any[] = [];
  for (const item of movieCrewsToInsert) {
    const key = `${item.movieId}-${item.crewMemberId}-${item.role}`;
    if (!seen.has(key)) {
      seen.add(key);
      finalMovieCrews.push(item);
    }
  }

  console.log(`Inserting ${finalMovieCrews.length} movie crew mappings in bulk...`);
  await prisma.movieCrew.createMany({
    data: finalMovieCrews,
    skipDuplicates: true,
  });

  console.log(`Inserting ${movieBtsToInsert.length} movie BTS records in bulk...`);
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

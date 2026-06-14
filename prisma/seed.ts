import { PrismaClient, Prisma } from "@prisma/client";
import {
  seedMovies,
  categories,
  universities,
  languages,
  schools,
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

  await prisma.category.createMany({
    data: categories.map((name) => ({ name })),
  });

  // Category, CrewRole setup only

  const roles = [
    // 1. Production Management (ฝ่ายบริหาร)
    "EXECUTIVE_PRODUCER",
    "PRODUCER",
    "LINE_PRODUCER",
    "PRODUCTION_MANAGER",
    "PRODUCTION_ASSISTANT",

    // 2. Directing (ฝ่ายกำกับ)
    "DIRECTOR",
    "ASSISTANT_DIRECTOR",
    "CONTINUITY",
    "ACTING_COACH",

    // 3. Screenplay (ฝ่ายบท)
    "WRITER",
    "SCRIPT_CONSULTANT",

    // 4. Camera Department (ฝ่ายถ่ายภาพ)
    "DOP",
    "CAMERA_OPERATOR",
    "FIRST_ASSISTANT_CAMERA",
    "SECOND_ASSISTANT_CAMERA",
    "DIT",
    "VIDEO_ASSIST",

    // 5. ฝ่ายแสง (Lighting / Electrical)
    "GAFFER",
    "BEST_BOY",
    "ELECTRICIAN",

    // 6. ฝ่ายขนย้าย/ติดตั้งอุปกรณ์ (Grip Department)
    "KEY_GRIP",
    "GRIP",

    // 7. ฝ่ายเสียงในกองถ่าย (Production Sound)
    "SOUND_MIXER",
    "BOOM_OPERATOR",
    "SOUND_ASSISTANT",

    // 8. ฝ่ายศิลป์ (Art Department)
    "PRODUCTION_DESIGNER",
    "ART_DIRECTOR",
    "SET_DESIGNER",
    "PROPS_MASTER",
    "GRAPHIC_DESIGNER",

    // 9. ฝ่ายเครื่องแต่งกาย (Costume Department)
    "COSTUME_DESIGNER",
    "WARDROBE_SUPERVISOR",
    "COSTUME_BUYER",

    // 10. ฝ่ายแต่งหน้า/ทำผม (Hair & Makeup)
    "MAKEUP_ARTIST",
    "SFX_MAKEUP_ARTIST",
    "HAIRSTYLIST",

    // 11. ฝ่ายแสดง (Cast)
    "CAST",
    "LEAD_ACTOR",
    "SUPPORTING_ACTOR",
    "EXTRA",
    "STAND_IN",
    "BODY_DOUBLE",
    "STUNT_DOUBLE",
    "ANIMAL_WRANGLER",
    "CASTING_DIRECTOR",
    "CASTING_ASSISTANT",
    "EXTRAS_CASTING_COORDINATOR",

    // 12. ฝ่ายสถานที่ถ่ายทำ (Locations)
    "LOCATION_MANAGER",
    "ASSISTANT_LOCATION_MANAGER",
    "LOCATION_SCOUT",
    "LOCATION_COORDINATOR",
    "LOCATION_PERMITS_COORDINATOR",
    "LOCATION_ASSISTANT",
    "LOCATION_PA",
    "UNIT_MANAGER",
    "SECURITY_COORDINATOR",
    "SECURITY_GUARD",

    // 13. ฝ่ายจัดการผลิต/สนับสนุน (Production Support)
    "UNIT_PUBLICIST",
    "STILL_PHOTOGRAPHER",
    "BTS_VIDEOGRAPHER",
    "CATERING_COORDINATOR",
    "TRANSPORTATION_CAPTAIN",
    "DRIVER",
    "PICTURE_CAR_COORDINATOR",
    "MEDIC",
    "ANIMAL_COORDINATOR",
    "SCRIPT_CLEARANCE_COORDINATOR",
    "INTIMACY_COORDINATOR",
    "SAFETY_OFFICER",

    // 14. ฝ่ายเอฟเฟกต์พิเศษในกองถ่าย (On-Set Special Effects)
    "SFX_SUPERVISOR",
    "SFX_TECHNICIAN",
    "PYROTECHNICIAN",
    "MECHANICAL_FX_ARTIST",
    "WEATHER_MACHINE_OPERATOR",

    // 15. ฝ่ายหลังการผลิต (Post-Production)
    "POST_PRODUCTION_SUPERVISOR",
    "EDITOR",
    "ASSISTANT_EDITOR",
    "COLORIST",
    "DI_SUPERVISOR",
    "VFX_SUPERVISOR",
    "VFX_PRODUCER",
    "VFX_ARTIST",
    "MOTION_GRAPHICS_DESIGNER",
    "TITLE_DESIGNER",
    "SOUND_DESIGNER",
    "SUPERVISING_SOUND_EDITOR",
    "SOUND_EDITOR",
    "DIALOGUE_EDITOR",
    "ADR_SUPERVISOR",
    "FOLEY_ARTIST",
    "FOLEY_MIXER",
    "RERECORDING_MIXER",
    "COMPOSER",
    "MUSIC_SUPERVISOR",
    "ORCHESTRATOR"
  ];
  await prisma.crewRole.createMany({
    data: roles.map((name) => ({ name })),
  });

  console.log("Retrieving master data mappings...");
  const dbCategories = await prisma.category.findMany();
  const categoryMap = new Map(
    dbCategories.map((c) => [c.name.toLowerCase(), c.id]),
  );

  // Category map setup only

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
    const colorType = colorTypes[idx % colorTypes.length].toLowerCase();

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

    const ageRating = movie.ageRating || "PG-13";

    const university = movie.university || null;
    const language = movie.language || "ไทย";
    const school = idx % 2 === 0 ? schools[idx % schools.length] : null;

    const oldCrew = movie.crew?.create;
    const btsVideos = oldCrew?.btsVideo ? [oldCrew.btsVideo] : [];

    const awards = idx % 4 === 0 ? ["Best Short Film", "Best Student Director"] : [];

    moviesToInsert.push({
      id: movieId,
      title: movie.title,
      description: movie.description,
      thumbnail: movie.thumbnail,
      youtubeUrl: movie.youtubeUrl,
      trailerUrl: movie.trailerUrl || movie.youtubeUrl,
      categoryId,
      releaseDate: new Date(`${movie.year}-01-01T00:00:00.000Z`),
      duration: movie.duration,
      views: movie.views || 0,
      matchRate: movie.matchRate || 100,
      aspectRatio: idx < 40 && idx >= 30 ? "portrait" : "landscape",
      ageRating,
      university,
      language,
      school,
      hasProfanity,
      hasDrugs,
      colorType,
      studio,
      createdBy: defaultUserId,
      btsVideos,
      awards,
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

import { PrismaClient, Prisma } from "@prisma/client";
import { roles } from "./roles";
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
  await prisma.ageRating.deleteMany();
  await prisma.university.deleteMany();
  await prisma.school.deleteMany();
  await prisma.language.deleteMany();
  await prisma.subtitle.deleteMany();
  await prisma.contentWarning.deleteMany();
  await prisma.colorType.deleteMany();
  await prisma.tag.deleteMany();

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
    data: categories,
  });

  // Category, CrewRole setup only

  await prisma.crewRole.createMany({
    data: roles,
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

  console.log("Seeding relation tables...");

  const ageRatingsList = ["G", "PG", "PG-13", "NC-17", "R"];
  await prisma.ageRating.createMany({
    data: ageRatingsList.map((name) => ({ name })),
    skipDuplicates: true,
  });
  const dbAgeRatings = await prisma.ageRating.findMany();
  const ageRatingMap = new Map(
    dbAgeRatings.map((r) => [r.name.toUpperCase(), r.id]),
  );

  await prisma.university.createMany({
    data: universities.map((name) => ({ name })),
    skipDuplicates: true,
  });
  const dbUniversities = await prisma.university.findMany();
  const universityMap = new Map(
    dbUniversities.map((u) => [u.name.toUpperCase(), u.id]),
  );

  await prisma.school.createMany({
    data: schools.map((name) => ({ name })),
    skipDuplicates: true,
  });
  const dbSchools = await prisma.school.findMany();
  const schoolMap = new Map(dbSchools.map((s) => [s.name.toUpperCase(), s.id]));

  await prisma.language.createMany({
    data: languages.map((name) => ({ name })),
    skipDuplicates: true,
  });
  const dbLanguages = await prisma.language.findMany();
  const languageMap = new Map(
    dbLanguages.map((l) => [l.name.toUpperCase(), l.id]),
  );

  const subtitlesList = ["ไม่มี", "ไทย", "อังกฤษ", "เกาหลี", "ญี่ปุ่น", "จีน"];
  await prisma.subtitle.createMany({
    data: subtitlesList.map((name) => ({ name })),
    skipDuplicates: true,
  });
  const dbSubtitles = await prisma.subtitle.findMany();
  const subtitleMap = new Map(
    dbSubtitles.map((s) => [s.name.toUpperCase(), s.id]),
  );

  const colorTypesList = ["สี", "ขาวดำ", "สีและขาวดำ"];
  await prisma.colorType.createMany({
    data: colorTypesList.map((name) => ({ name })),
    skipDuplicates: true,
  });
  const dbColorTypes = await prisma.colorType.findMany();
  const colorTypeMap = new Map(
    dbColorTypes.map((c) => [c.name.toLowerCase(), c.id]),
  );

  const contentWarningsList = [
    "คำหยาบคาย",
    "สารเสพติด",
    "ความรุนแรง",
    "ภาพสยดสยอง",
    "เนื้อหาทางเพศ",
    "ภาพเปลือย",
    "การสูบบุหรี่",
    "การดื่มเครื่องดื่มแอลกอฮอล์",
    "ประเด็นสุขภาพจิต",
    "แสงกระพริบ",
  ];
  await prisma.contentWarning.createMany({
    data: contentWarningsList.map((name) => ({ name })),
    skipDuplicates: true,
  });
  const dbContentWarnings = await prisma.contentWarning.findMany();
  const contentWarningMap = new Map(
    dbContentWarnings.map((cw) => [cw.name.toUpperCase(), cw.id]),
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

  console.log("Preparing movies and relations...");
  const movieCrewsToInsert: Prisma.MovieCrewCreateManyInput[] = [];

  let idx = 0;
  for (const movie of seedMovies) {
    const movieId = crypto.randomUUID();

    const colorTypes = ["สี", "ขาวดำ", "สีและขาวดำ"];
    const colorType = colorTypes[idx % colorTypes.length].toLowerCase();

    let categoryKey = movie.category.toLowerCase().replace("-", "_");
    if (categoryKey === "adventure") {
      categoryKey = "action";
    }
    const categoryId = categoryMap.get(categoryKey);
    if (!categoryId)
      throw new Error(
        `Category not found: ${movie.category} (key: ${categoryKey})`,
      );

    const allCategoryIds = Array.from(categoryMap.values());
    const extraCategoryIds = allCategoryIds.filter((id) => id !== categoryId);
    const count = 1 + (idx % 2);
    const selectedExtraIds: string[] = [];
    for (let i = 0; i < count; i++) {
      const extraId = extraCategoryIds[(idx + i) % extraCategoryIds.length];
      if (extraId) {
        selectedExtraIds.push(extraId);
      }
    }
    const finalCategoryConnect = [categoryId, ...selectedExtraIds].map(
      (id) => ({ id }),
    );

    const ageRating = movie.ageRating || "PG-13";
    const language = movie.language || "ไทย";

    let university: string | null = null;
    let school: string | null = null;
    let studio: string | null = null;

    if (movie.university) {
      university = movie.university;
    } else {
      // Alternate between school and studio for movies without a university
      if (idx % 2 === 0) {
        school = schools[idx % schools.length];
      } else {
        const studios = [
          "Glory Original",
          "Thaifflix Productions",
          "Studio Ghibli",
          "Independent Creators",
          "Bangkok Film Co.",
        ];
        studio = studios[idx % studios.length];
      }
    }

    const oldCrew = movie.crew?.create;
    const btsVideos = oldCrew?.btsVideo ? [oldCrew.btsVideo] : [];

    const awards =
      idx % 4 === 0
        ? {
            create: [
              { projectName: "ThaiFlix Awards", awardName: "Best Short Film" },
              {
                projectName: "ThaiFlix Awards",
                awardName: "Best Student Director",
              },
            ],
          }
        : undefined;

    const ageRatingId = ageRatingMap.get(ageRating.toUpperCase());
    if (!ageRatingId)
      throw new Error(`Age rating not found in map: ${ageRating}`);

    const languageId = languageMap.get(language.toUpperCase());
    if (!languageId) throw new Error(`Language not found in map: ${language}`);

    const selectedSubtitleName = subtitlesList[idx % subtitlesList.length];
    const subtitleId =
      selectedSubtitleName !== "ไม่มี"
        ? subtitleMap.get(selectedSubtitleName.toUpperCase())
        : null;

    const colorTypeId = colorTypeMap.get(colorType.toLowerCase());
    if (!colorTypeId)
      throw new Error(`Color type not found in map: ${colorType}`);

    const universityId = university
      ? universityMap.get(university.toUpperCase())
      : null;
    const schoolId = school ? schoolMap.get(school.toUpperCase()) : null;

    const contentWarningConnect: { id: string }[] = [];
    contentWarningsList.forEach((warning, wIdx) => {
      if ((idx + wIdx) % 4 === 0) {
        const id = contentWarningMap.get(warning.toUpperCase());
        if (id) {
          contentWarningConnect.push({ id });
        }
      }
    });

    await prisma.movie.create({
      data: {
        id: movieId,
        title: movie.title,
        description: movie.description,
        thumbnail: movie.thumbnail,
        youtubeUrl: movie.youtubeUrl,
        trailerUrls: [movie.trailerUrl || movie.youtubeUrl],
        categories: {
          connect: finalCategoryConnect,
        },
        releaseDate: new Date(`${movie.year}-01-01T00:00:00.000Z`),
        duration: movie.duration,
        views: movie.views || 0,
        matchRate: movie.matchRate || 100,
        aspectRatio: idx < 40 && idx >= 30 ? "portrait" : "landscape",
        ageRatingId,
        colorTypeId,
        universityId: universityId || null,
        schoolId: schoolId || null,
        languageId: languageId || null,
        subtitleId: subtitleId || null,
        contentWarnings: {
          connect: contentWarningConnect,
        },
        studio,
        createdBy: defaultUserId,
        btsVideos,
        ...(awards ? { awards } : {}),
      },
    });

    if (oldCrew) {
      const directors = getNames(oldCrew.director);
      const producers = getNames(oldCrew.producer);
      const writers = getNames(oldCrew.writer);
      const cast = getNames(oldCrew.cast);

      let roleIdx = 0;
      for (const role of dbCrewRoles) {
        const roleName = role.name.toUpperCase();

        let assignedNames: string[] = [];
        if (roleName === "DIRECTOR") assignedNames = directors;
        else if (roleName === "PRODUCER") assignedNames = producers;
        else if (roleName === "SCREENWRITER") assignedNames = writers;
        else if (roleName === "LEAD_ACTOR") assignedNames = cast;

        if (assignedNames.length > 0) {
          for (const name of assignedNames) {
            const crewMemberId = crewMap.get(name);
            if (crewMemberId) {
              movieCrewsToInsert.push({
                movieId,
                crewMemberId,
                roleId: role.id,
              });
            }
          }
        } else {
          // Assign a fallback unique crew member for all other roles
          if (allCrewMembers.length > 0) {
            const member =
              allCrewMembers[
                (idx * dbCrewRoles.length + roleIdx) % allCrewMembers.length
              ];
            movieCrewsToInsert.push({
              movieId,
              crewMemberId: member.id,
              roleId: role.id,
            });
          }
        }
        roleIdx++;
      }
    }
    idx++;
  }

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

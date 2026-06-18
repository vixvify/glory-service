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
    data: categories,
  });

  // Category, CrewRole setup only

  const roles = [
    // 1. Production Management (ฝ่ายบริหาร)
    {
      name: "PRODUCER",
      labelTh: "ผู้อำนวยการสร้าง",
      category: "production_management",
      categoryLabelTh: "ฝ่ายบริหาร",
    },
    {
      name: "PRODUCTION_MANAGER",
      labelTh: "ผู้จัดการกองถ่าย",
      category: "production_management",
      categoryLabelTh: "ฝ่ายบริหาร",
    },

    // 2. Directing (ฝ่ายกำกับ)
    {
      name: "DIRECTOR",
      labelTh: "ผู้กำกับ",
      category: "directing",
      categoryLabelTh: "ฝ่ายกำกับ",
    },
    {
      name: "ASSISTANT_DIRECTOR",
      labelTh: "ผู้ช่วยผู้กำกับ",
      category: "directing",
      categoryLabelTh: "ฝ่ายกำกับ",
    },

    // 3. Screenplay (ฝ่ายบท)
    {
      name: "SCREENWRITER",
      labelTh: "นักเขียนบท",
      category: "screenplay",
      categoryLabelTh: "ฝ่ายบท",
    },
    {
      name: "SCRIPT_SUPERVISOR",
      labelTh: "ผู้ตรวจสคริปต์และความต่อเนื่อง",
      category: "screenplay",
      categoryLabelTh: "ฝ่ายบท",
    },

    // 4. Camera Department (ฝ่ายถ่ายภาพ)
    {
      name: "DOP",
      labelTh: "ผู้กำกับภาพ",
      category: "camera",
      categoryLabelTh: "ฝ่ายถ่ายภาพ",
    },
    {
      name: "CAMERA_OPERATOR",
      labelTh: "ช่างกล้อง",
      category: "camera",
      categoryLabelTh: "ฝ่ายถ่ายภาพ",
    },
    {
      name: "ASSISTANT_CAMERA",
      labelTh: "ผู้ช่วยกล้อง",
      category: "camera",
      categoryLabelTh: "ฝ่ายถ่ายภาพ",
    },

    // 5. ฝ่ายแสง (Lighting / Electrical)
    {
      name: "GAFFER",
      labelTh: "หัวหน้าช่างแสง",
      category: "lighting",
      categoryLabelTh: "ฝ่ายแสง",
    },
    {
      name: "BEST_BOY",
      labelTh: "ผู้ช่วยหัวหน้าช่างแสง",
      category: "lighting",
      categoryLabelTh: "ฝ่ายแสง",
    },

    // 6. ฝ่ายขนย้าย/ติดตั้งอุปกรณ์ (Grip Department)
    {
      name: "KEY_GRIP",
      labelTh: "หัวหน้าช่างอุปกรณ์",
      category: "grip",
      categoryLabelTh: "ฝ่ายขนย้าย/ติดตั้งอุปกรณ์",
    },

    // 7. ฝ่ายเสียงในกองถ่าย (Production Sound)
    {
      name: "SOUND_MIXER",
      labelTh: "หัวหน้าช่างเสียง",
      category: "sound",
      categoryLabelTh: "ฝ่ายเสียงในกองถ่าย",
    },
    {
      name: "BOOM_OPERATOR",
      labelTh: "ผู้ถือไมค์บูม",
      category: "sound",
      categoryLabelTh: "ฝ่ายเสียงในกองถ่าย",
    },

    // 8. ฝ่ายศิลป์ (Art Department)
    {
      name: "PRODUCTION_DESIGNER",
      labelTh: "ผู้ออกแบบงานสร้าง",
      category: "art",
      categoryLabelTh: "ฝ่ายศิลป์",
    },
    {
      name: "PROPS_MASTER",
      labelTh: "หัวหน้าอุปกรณ์ประกอบฉาก",
      category: "art",
      categoryLabelTh: "ฝ่ายศิลป์",
    },

    // 9. ฝ่ายเครื่องแต่งกาย (Costume Department)
    {
      name: "COSTUME_DESIGNER",
      labelTh: "นักออกแบบเครื่องแต่งกาย",
      category: "costume",
      categoryLabelTh: "ฝ่ายเครื่องแต่งกาย",
    },

    // 10. ฝ่ายแต่งหน้า/ทำผม (Hair & Makeup)
    {
      name: "MAKEUP_ARTIST",
      labelTh: "ช่างแต่งหน้า",
      category: "makeup",
      categoryLabelTh: "ฝ่ายแต่งหน้า/ทำผม",
    },
    {
      name: "HAIRSTYLIST",
      labelTh: "ช่างทำผม",
      category: "makeup",
      categoryLabelTh: "ฝ่ายแต่งหน้า/ทำผม",
    },

    // 11. ฝ่ายแสดง (Cast)
    {
      name: "LEAD_ACTOR",
      labelTh: "นักแสดงนำ",
      category: "cast",
      categoryLabelTh: "ฝ่ายแสดง",
    },
    {
      name: "SUPPORTING_ACTOR",
      labelTh: "นักแสดงสมทบ",
      category: "cast",
      categoryLabelTh: "ฝ่ายแสดง",
    },

    // 12. ฝ่ายเอฟเฟกต์พิเศษ
    {
      name: "VISUAL_EFFECTS_ARTIST",
      labelTh: "ช่างทำภาพเอฟเฟกต์พิเศษ",
      category: "vfx",
      categoryLabelTh: "ฝ่ายเอฟเฟกต์พิเศษ",
    },

    // 13. ฝ่ายหลังการผลิต (Post-Production)
    {
      name: "EDITOR",
      labelTh: "ผู้ตัดต่อ",
      category: "post_production",
      categoryLabelTh: "ฝ่ายหลังการผลิต",
    },
    {
      name: "COLORIST",
      labelTh: "ผู้ปรับแต่งสี",
      category: "post_production",
      categoryLabelTh: "ฝ่ายหลังการผลิต",
    },
  ];
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
      idx % 4 === 0 ? ["Best Short Film", "Best Student Director"] : [];

    await prisma.movie.create({
      data: {
        id: movieId,
        title: movie.title,
        description: movie.description,
        thumbnail: movie.thumbnail,
        youtubeUrl: movie.youtubeUrl,
        trailerUrl: movie.trailerUrl || movie.youtubeUrl,
        categories: {
          connect: finalCategoryConnect,
        },
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

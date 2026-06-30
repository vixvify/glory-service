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
    { name: "EXECUTIVE_PRODUCER", labelTh: "ผู้อำนวยการสร้างบริหาร", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "PRODUCER", labelTh: "ผู้อำนวยการสร้าง", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "ASSOCIATE_PRODUCER", labelTh: "ผู้อำนวยการสร้างรอง", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "CO_PRODUCER", labelTh: "ผู้อำนวยการสร้างร่วม", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "LINE_PRODUCER", labelTh: "ผู้จัดการสายการผลิต", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "UNIT_PRODUCTION_MANAGER", labelTh: "ผู้จัดการยูนิต", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "PRODUCTION_MANAGER", labelTh: "ผู้จัดการกองถ่าย", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "PRODUCTION_COORDINATOR", labelTh: "ผู้ประสานงานกองถ่าย", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "ASSISTANT_PRODUCTION_COORDINATOR", labelTh: "ผู้ช่วยผู้ประสานงานกองถ่าย", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "PRODUCTION_SECRETARY", labelTh: "เลขานุการกองถ่าย", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "PRODUCTION_ASSISTANT", labelTh: "ผู้ช่วยฝ่ายผลิต", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "OFFICE_PA", labelTh: "ผู้ช่วยประจำออฟฟิศ", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "SET_PA", labelTh: "ผู้ช่วยประจำกองถ่าย", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "PRODUCTION_ACCOUNTANT", labelTh: "นักบัญชีกองถ่าย", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "ASSISTANT_ACCOUNTANT", labelTh: "ผู้ช่วยนักบัญชี", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },
    { name: "PAYROLL_ACCOUNTANT", labelTh: "นักบัญชีเงินเดือน", category: "production_management", categoryLabelTh: "ฝ่ายบริหาร" },

    // 2. Directing (ฝ่ายกำกับ)
    { name: "DIRECTOR", labelTh: "ผู้กำกับ", category: "directing", categoryLabelTh: "ฝ่ายกำกับ" },
    { name: "FIRST_ASSISTANT_DIRECTOR", labelTh: "ผู้ช่วยผู้กำกับคนที่ 1", category: "directing", categoryLabelTh: "ฝ่ายกำกับ" },
    { name: "SECOND_ASSISTANT_DIRECTOR", labelTh: "ผู้ช่วยผู้กำกับคนที่ 2", category: "directing", categoryLabelTh: "ฝ่ายกำกับ" },
    { name: "THIRD_ASSISTANT_DIRECTOR", labelTh: "ผู้ช่วยผู้กำกับคนที่ 3", category: "directing", categoryLabelTh: "ฝ่ายกำกับ" },
    { name: "SCRIPT_SUPERVISOR", labelTh: "ผู้ตรวจสคริปต์และความต่อเนื่อง", category: "directing", categoryLabelTh: "ฝ่ายกำกับ" },
    { name: "DIALOGUE_COACH", labelTh: "โค้ชบทพูด/สำเนียง", category: "directing", categoryLabelTh: "ฝ่ายกำกับ" },
    { name: "ACTING_COACH", labelTh: "โค้ชการแสดง", category: "directing", categoryLabelTh: "ฝ่ายกำกับ" },

    // 3. Screenplay (ฝ่ายบท)
    { name: "SCREENWRITER", labelTh: "นักเขียนบท", category: "screenplay", categoryLabelTh: "ฝ่ายบท" },
    { name: "CO_WRITER", labelTh: "นักเขียนบทร่วม", category: "screenplay", categoryLabelTh: "ฝ่ายบท" },
    { name: "STORY_EDITOR", labelTh: "บรรณาธิการเนื้อเรื่อง", category: "screenplay", categoryLabelTh: "ฝ่ายบท" },
    { name: "SCRIPT_CONSULTANT", labelTh: "ที่ปรึกษาบท", category: "screenplay", categoryLabelTh: "ฝ่ายบท" },
    { name: "RESEARCH_COORDINATOR", labelTh: "ผู้ประสานงานวิจัย", category: "screenplay", categoryLabelTh: "ฝ่ายบท" },

    // 4. Camera Department (ฝ่ายถ่ายภาพ)
    { name: "DOP", labelTh: "ผู้กำกับภาพ", category: "camera", categoryLabelTh: "ฝ่ายถ่ายภาพ" },
    { name: "A_CAMERA_OPERATOR", labelTh: "ช่างกล้องกล้อง A", category: "camera", categoryLabelTh: "ฝ่ายถ่ายภาพ" },
    { name: "B_CAMERA_OPERATOR", labelTh: "ช่างกล้องกล้อง B", category: "camera", categoryLabelTh: "ฝ่ายถ่ายภาพ" },
    { name: "C_CAMERA_OPERATOR", labelTh: "ช่างกล้องกล้อง C", category: "camera", categoryLabelTh: "ฝ่ายถ่ายภาพ" },
    { name: "FIRST_ASSISTANT_CAMERA", labelTh: "ผู้ช่วยกล้องคนที่ 1", category: "camera", categoryLabelTh: "ฝ่ายถ่ายภาพ" },
    { name: "SECOND_ASSISTANT_CAMERA", labelTh: "ผู้ช่วยกล้องคนที่ 2", category: "camera", categoryLabelTh: "ฝ่ายถ่ายภาพ" },
    { name: "DIT", labelTh: "ช่างเทคนิคภาพดิจิทัล", category: "camera", categoryLabelTh: "ฝ่ายถ่ายภาพ" },
    { name: "VIDEO_ASSIST_OPERATOR", labelTh: "ผู้ดูแลจอมอนิเตอร์", category: "camera", categoryLabelTh: "ฝ่ายถ่ายภาพ" },
    { name: "STEADICAM_OPERATOR", labelTh: "ผู้ควบคุม Steadicam", category: "camera", categoryLabelTh: "ฝ่ายถ่ายภาพ" },
    { name: "DRONE_OPERATOR", labelTh: "ผู้บังคับโดรน", category: "camera", categoryLabelTh: "ฝ่ายถ่ายภาพ" },
    { name: "UNDERWATER_CAMERA_OPERATOR", labelTh: "ช่างกล้องใต้น้ำ", category: "camera", categoryLabelTh: "ฝ่ายถ่ายภาพ" },
    { name: "CAMERA_PA", labelTh: "ผู้ช่วยฝ่ายกล้อง", category: "camera", categoryLabelTh: "ฝ่ายถ่ายภาพ" },

    // 5. ฝ่ายแสง (Lighting / Electrical)
    { name: "GAFFER", labelTh: "หัวหน้าช่างแสง", category: "lighting", categoryLabelTh: "ฝ่ายแสง" },
    { name: "BEST_BOY_ELECTRIC", labelTh: "ผู้ช่วยหัวหน้าช่างแสง", category: "lighting", categoryLabelTh: "ฝ่ายแสง" },
    { name: "RIGGING_GAFFER", labelTh: "หัวหน้าช่างแสงติดตั้งล่วงหน้า", category: "lighting", categoryLabelTh: "ฝ่ายแสง" },
    { name: "ELECTRICIAN", labelTh: "ช่างไฟฟ้า/แสง", category: "lighting", categoryLabelTh: "ฝ่ายแสง" },
    { name: "LIGHTING_CONSOLE_OPERATOR", labelTh: "ผู้ควบคุมคอนโซลแสง", category: "lighting", categoryLabelTh: "ฝ่ายแสง" },
    { name: "GENERATOR_OPERATOR", labelTh: "ผู้ควบคุมเครื่องกำเนิดไฟฟ้า", category: "lighting", categoryLabelTh: "ฝ่ายแสง" },
    { name: "PRACTICAL_ELECTRICIAN", labelTh: "ช่างไฟฟ้าภายในฉาก", category: "lighting", categoryLabelTh: "ฝ่ายแสง" },

    // 6. ฝ่ายขนย้าย/ติดตั้งอุปกรณ์ (Grip Department)
    { name: "KEY_GRIP", labelTh: "หัวหน้าช่างอุปกรณ์", category: "grip", categoryLabelTh: "ฝ่ายขนย้าย/ติดตั้งอุปกรณ์" },
    { name: "BEST_BOY_GRIP", labelTh: "ผู้ช่วยหัวหน้าช่างอุปกรณ์", category: "grip", categoryLabelTh: "ฝ่ายขนย้าย/ติดตั้งอุปกรณ์" },
    { name: "RIGGING_KEY_GRIP", labelTh: "หัวหน้าช่างติดตั้งล่วงหน้า", category: "grip", categoryLabelTh: "ฝ่ายขนย้าย/ติดตั้งอุปกรณ์" },
    { name: "RIGGING_GRIP", labelTh: "ช่างติดตั้งล่วงหน้า", category: "grip", categoryLabelTh: "ฝ่ายขนย้าย/ติดตั้งอุปกรณ์" },
    { name: "DOLLY_GRIP", labelTh: "ช่างควบคุมรางเลื่อนกล้อง", category: "grip", categoryLabelTh: "ฝ่ายขนย้าย/ติดตั้งอุปกรณ์" },
    { name: "CRANE_OPERATOR", labelTh: "ผู้ควบคุมเครน/จิ๊บกล้อง", category: "grip", categoryLabelTh: "ฝ่ายขนย้าย/ติดตั้งอุปกรณ์" },
    { name: "GRIP", labelTh: "ช่างอุปกรณ์ทั่วไป", category: "grip", categoryLabelTh: "ฝ่ายขนย้าย/ติดตั้งอุปกรณ์" },

    // 7. ฝ่ายเสียง (Production Sound)
    { name: "PRODUCTION_SOUND_MIXER", labelTh: "หัวหน้าช่างเสียงในกองถ่าย", category: "sound", categoryLabelTh: "ฝ่ายเสียง" },
    { name: "BOOM_OPERATOR", labelTh: "ผู้ถือไมค์บูม", category: "sound", categoryLabelTh: "ฝ่ายเสียง" },
    { name: "SECOND_BOOM_OPERATOR", labelTh: "ผู้ถือไมค์บูมคนที่ 2", category: "sound", categoryLabelTh: "ฝ่ายเสียง" },
    { name: "SOUND_ASSISTANT", labelTh: "ผู้ช่วยฝ่ายเสียง", category: "sound", categoryLabelTh: "ฝ่ายเสียง" },
    { name: "PLAYBACK_OPERATOR", labelTh: "ผู้ควบคุมเสียงเพลย์แบ็ก", category: "sound", categoryLabelTh: "ฝ่ายเสียง" },

    // 8. ฝ่ายศิลป์ (Art Department)
    { name: "PRODUCTION_DESIGNER", labelTh: "ผู้ออกแบบงานสร้าง", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "ART_DIRECTOR", labelTh: "ผู้อำนวยการฝ่ายศิลป์", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "ASSISTANT_ART_DIRECTOR", labelTh: "ผู้ช่วยผู้อำนวยการฝ่ายศิลป์", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "SET_DESIGNER", labelTh: "ผู้ออกแบบฉาก", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "SET_DECORATOR", labelTh: "ผู้ตกแต่งฉาก", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "LEADMAN", labelTh: "หัวหน้าช่างแต่งฉาก", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "SET_DRESSER", labelTh: "ช่างแต่งฉาก", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "SCENIC_PAINTER", labelTh: "ช่างวาด/พ่นสีฉาก", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "CONSTRUCTION_COORDINATOR", labelTh: "ผู้ดูแลงานก่อสร้างฉาก", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "HEAD_CARPENTER", labelTh: "หัวหน้าช่างไม้", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "CARPENTER", labelTh: "ช่างไม้", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "PROPS_MASTER", labelTh: "หัวหน้าฝ่ายอุปกรณ์ประกอบฉาก", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "PROPS_BUYER", labelTh: "ผู้จัดซื้ออุปกรณ์ประกอบฉาก", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "PROPS_ASSISTANT", labelTh: "ผู้ช่วยฝ่ายอุปกรณ์ประกอบฉาก", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "PROP_FABRICATOR", labelTh: "ช่างทำอุปกรณ์ประกอบฉากแบบกำหนดเอง", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },
    { name: "GRAPHIC_DESIGNER", labelTh: "นักออกแบบกราฟิกประกอบฉาก", category: "art", categoryLabelTh: "ฝ่ายศิลป์" },

    // 9. ฝ่ายเครื่องแต่งกาย (Costume Department)
    { name: "COSTUME_DESIGNER", labelTh: "นักออกแบบเครื่องแต่งกาย", category: "costume", categoryLabelTh: "ฝ่ายเครื่องแต่งกาย" },
    { name: "ASSISTANT_COSTUME_DESIGNER", labelTh: "ผู้ช่วยนักออกแบบเครื่องแต่งกาย", category: "costume", categoryLabelTh: "ฝ่ายเครื่องแต่งกาย" },
    { name: "WARDROBE_SUPERVISOR", labelTh: "หัวหน้าฝ่ายเสื้อผ้า", category: "costume", categoryLabelTh: "ฝ่ายเครื่องแต่งกาย" },
    { name: "KEY_COSTUMER", labelTh: "ช่างเสื้อผ้าหลัก", category: "costume", categoryLabelTh: "ฝ่ายเครื่องแต่งกาย" },
    { name: "COSTUME_STANDBY", labelTh: "ช่างเสื้อประจำกองถ่าย", category: "costume", categoryLabelTh: "ฝ่ายเครื่องแต่งกาย" },
    { name: "TAILOR", labelTh: "ช่างตัดเย็บ", category: "costume", categoryLabelTh: "ฝ่ายเครื่องแต่งกาย" },
    { name: "COSTUME_BUYER", labelTh: "ผู้จัดซื้อเครื่องแต่งกาย", category: "costume", categoryLabelTh: "ฝ่ายเครื่องแต่งกาย" },
    { name: "COSTUME_ASSISTANT", labelTh: "ผู้ช่วยฝ่ายเครื่องแต่งกาย", category: "costume", categoryLabelTh: "ฝ่ายเครื่องแต่งกาย" },

    // 10. ฝ่ายแต่งหน้า/ทำผม (Hair & Makeup)
    { name: "KEY_MAKEUP_ARTIST", labelTh: "หัวหน้าช่างแต่งหน้า", category: "makeup", categoryLabelTh: "ฝ่ายแต่งหน้า/ทำผม" },
    { name: "MAKEUP_ARTIST", labelTh: "ช่างแต่งหน้า", category: "makeup", categoryLabelTh: "ฝ่ายแต่งหน้า/ทำผม" },
    { name: "SFX_MAKEUP_ARTIST", labelTh: "ช่างแต่งหน้าเอฟเฟกต์พิเศษ", category: "makeup", categoryLabelTh: "ฝ่ายแต่งหน้า/ทำผม" },
    { name: "PROSTHETICS_ARTIST", labelTh: "ช่างทำชิ้นส่วนเทียม", category: "makeup", categoryLabelTh: "ฝ่ายแต่งหน้า/ทำผม" },
    { name: "BODY_PAINTER", labelTh: "ช่างวาดลายตัว", category: "makeup", categoryLabelTh: "ฝ่ายแต่งหน้า/ทำผม" },
    { name: "KEY_HAIRSTYLIST", labelTh: "หัวหน้าช่างทำผม", category: "makeup", categoryLabelTh: "ฝ่ายแต่งหน้า/ทำผม" },
    { name: "HAIRSTYLIST", labelTh: "ช่างทำผม", category: "makeup", categoryLabelTh: "ฝ่ายแต่งหน้า/ทำผม" },
    { name: "HAIR_MAKEUP_ASSISTANT", labelTh: "ผู้ช่วยแต่งหน้า/ทำผม", category: "makeup", categoryLabelTh: "ฝ่ายแต่งหน้า/ทำผม" },

    // 11. ฝ่ายแสดง (Cast)
    { name: "LEAD_ACTOR", labelTh: "นักแสดงนำชาย", category: "cast", categoryLabelTh: "ฝ่ายแสดง" },
    { name: "SUPPORTING_ACTOR", labelTh: "นักแสดงสมทบ", category: "cast", categoryLabelTh: "ฝ่ายแสดง" },
    { name: "DAY_PLAYER", labelTh: "นักแสดงรับเชิญรายวัน", category: "cast", categoryLabelTh: "ฝ่ายแสดง" },
    { name: "EXTRA", labelTh: "นักแสดงประกอบ", category: "cast", categoryLabelTh: "ฝ่ายแสดง" },
    { name: "STAND_IN", labelTh: "นักแสดงแทนตัวสำหรับปรับแสง", category: "cast", categoryLabelTh: "ฝ่ายแสดง" },
    { name: "PHOTO_DOUBLE", labelTh: "นักแสดงแทนตัวสำหรับถ่ายภาพ", category: "cast", categoryLabelTh: "ฝ่ายแสดง" },
    { name: "STUNT_COORDINATOR", labelTh: "ผู้ประสานงานฉากอันตราย", category: "cast", categoryLabelTh: "ฝ่ายแสดง" },
    { name: "STUNT_DOUBLE", labelTh: "นักแสดงแทนฉากอันตราย", category: "cast", categoryLabelTh: "ฝ่ายแสดง" },
    { name: "ANIMAL_WRANGLER", labelTh: "ผู้ฝึกสัตว์/นักแสดงสัตว์", category: "cast", categoryLabelTh: "ฝ่ายแสดง" },
    { name: "CASTING_DIRECTOR", labelTh: "ผู้อำนวยการออดิชั่น", category: "cast", categoryLabelTh: "ฝ่ายแสดง" },
    { name: "CASTING_ASSISTANT", labelTh: "ผู้ช่วยออดิชั่น", category: "cast", categoryLabelTh: "ฝ่ายแสดง" },
    { name: "EXTRAS_CASTING_COORDINATOR", labelTh: "ผู้ประสานงานนักแสดงประกอบ", category: "cast", categoryLabelTh: "ฝ่ายแสดง" },

    // 12. ฝ่ายสถานที่ถ่ายทำ (Locations)
    { name: "LOCATION_MANAGER", labelTh: "ผู้จัดการสถานที่ถ่ายทำ", category: "locations", categoryLabelTh: "ฝ่ายสถานที่ถ่ายทำ" },
    { name: "ASSISTANT_LOCATION_MANAGER", labelTh: "ผู้ช่วยผู้จัดการสถานที่", category: "locations", categoryLabelTh: "ฝ่ายสถานที่ถ่ายทำ" },
    { name: "LOCATION_SCOUT", labelTh: "ผู้สำรวจสถานที่", category: "locations", categoryLabelTh: "ฝ่ายสถานที่ถ่ายทำ" },
    { name: "LOCATION_COORDINATOR", labelTh: "ผู้ประสานงานสถานที่", category: "locations", categoryLabelTh: "ฝ่ายสถานที่ถ่ายทำ" },
    { name: "LOCATION_PERMITS_COORDINATOR", labelTh: "ผู้ดูแลการขออนุญาตสถานที่", category: "locations", categoryLabelTh: "ฝ่ายสถานที่ถ่ายทำ" },
    { name: "LOCATION_ASSISTANT", labelTh: "ผู้ช่วยฝ่ายสถานที่", category: "locations", categoryLabelTh: "ฝ่ายสถานที่ถ่ายทำ" },
    { name: "LOCATION_PA", labelTh: "ผู้ช่วยประจำสถานที่", category: "locations", categoryLabelTh: "ฝ่ายสถานที่ถ่ายทำ" },
    { name: "UNIT_MANAGER", labelTh: "ผู้จัดการยูนิตหน้างาน", category: "locations", categoryLabelTh: "ฝ่ายสถานที่ถ่ายทำ" },
    { name: "SECURITY_COORDINATOR", labelTh: "ผู้ประสานงานความปลอดภัย", category: "locations", categoryLabelTh: "ฝ่ายสถานที่ถ่ายทำ" },
    { name: "SECURITY_GUARD", labelTh: "เจ้าหน้าที่รักษาความปลอดภัย", category: "locations", categoryLabelTh: "ฝ่ายสถานที่ถ่ายทำ" },

    // 13. ฝ่ายจัดการผลิต/สนับสนุน (Production Support)
    { name: "UNIT_PUBLICIST", labelTh: "ผู้ประชาสัมพันธ์ประจำกอง", category: "production_support", categoryLabelTh: "ฝ่ายจัดการผลิต/สนับสนุน" },
    { name: "STILL_PHOTOGRAPHER", labelTh: "ช่างภาพนิ่งประจำกองถ่าย", category: "production_support", categoryLabelTh: "ฝ่ายจัดการผลิต/สนับสนุน" },
    { name: "BTS_VIDEOGRAPHER", labelTh: "ช่างถ่ายวิดีโอเบื้องหลัง", category: "production_support", categoryLabelTh: "ฝ่ายจัดการผลิต/สนับสนุน" },
    { name: "CATERING_COORDINATOR", labelTh: "ผู้ดูแลอาหารในกองถ่าย", category: "production_support", categoryLabelTh: "ฝ่ายจัดการผลิต/สนับสนุน" },
    { name: "TRANSPORTATION_CAPTAIN", labelTh: "หัวหน้าฝ่ายขนส่ง", category: "production_support", categoryLabelTh: "ฝ่ายจัดการผลิต/สนับสนุน" },
    { name: "DRIVER", labelTh: "พนักงานขับรถ", category: "production_support", categoryLabelTh: "ฝ่ายจัดการผลิต/สนับสนุน" },
    { name: "PICTURE_CAR_COORDINATOR", labelTh: "ผู้ประสานงานยานพาหนะในหนัง", category: "production_support", categoryLabelTh: "ฝ่ายจัดการผลิต/สนับสนุน" },
    { name: "MEDIC", labelTh: "เจ้าหน้าที่การแพทย์/ปฐมพยาบาล", category: "production_support", categoryLabelTh: "ฝ่ายจัดการผลิต/สนับสนุน" },
    { name: "ANIMAL_COORDINATOR", labelTh: "ผู้ประสานงานสัตว์", category: "production_support", categoryLabelTh: "ฝ่ายจัดการผลิต/สนับสนุน" },
    { name: "SCRIPT_CLEARANCE_COORDINATOR", labelTh: "ผู้ตรวจสอบลิขสิทธิ์เนื้อหา", category: "production_support", categoryLabelTh: "ฝ่ายจัดการผลิต/สนับสนุน" },
    { name: "INTIMACY_COORDINATOR", labelTh: "ผู้ประสานงานฉากอ่อนไหว", category: "production_support", categoryLabelTh: "ฝ่ายจัดการผลิต/สนับสนุน" },
    { name: "SAFETY_OFFICER", labelTh: "เจ้าหน้าที่ความปลอดภัย", category: "production_support", categoryLabelTh: "ฝ่ายจัดการผลิต/สนับสนุน" },

    // 14. ฝ่ายเอฟเฟกต์พิเศษในกองถ่าย (On-Set Special Effects)
    { name: "SFX_SUPERVISOR", labelTh: "หัวหน้าฝ่ายเอฟเฟกต์พิเศษ", category: "vfx", categoryLabelTh: "ฝ่ายเอฟเฟกต์พิเศษในกองถ่าย" },
    { name: "SFX_TECHNICIAN", labelTh: "ช่างเอฟเฟกต์พิเศษ", category: "vfx", categoryLabelTh: "ฝ่ายเอฟเฟกต์พิเศษในกองถ่าย" },
    { name: "PYROTECHNICIAN", labelTh: "ช่างระเบิด/ไฟ", category: "vfx", categoryLabelTh: "ฝ่ายเอฟเฟกต์พิเศษในกองถ่าย" },
    { name: "MECHANICAL_FX_ARTIST", labelTh: "ช่างเอฟเฟกต์เชิงกล", category: "vfx", categoryLabelTh: "ฝ่ายเอฟเฟกต์พิเศษในกองถ่าย" },
    { name: "WEATHER_EFFECTS_OPERATOR", labelTh: "ผู้ควบคุมเครื่องฝน/หิมะ/ลม", category: "vfx", categoryLabelTh: "ฝ่ายเอฟเฟกต์พิเศษในกองถ่าย" },

    // 15. ฝ่ายหลังการผลิต (Post-Production)
    { name: "POST_PRODUCTION_SUPERVISOR", labelTh: "หัวหน้าฝ่ายหลังการผลิต", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "EDITOR", labelTh: "ผู้ตัดต่อ", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "ASSISTANT_EDITOR", labelTh: "ผู้ช่วยตัดต่อ", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "COLORIST", labelTh: "ผู้ปรับแต่งสี", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "DI_SUPERVISOR", labelTh: "หัวหน้าฝ่าย Digital Intermediate", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "VFX_SUPERVISOR", labelTh: "หัวหน้าฝ่าย VFX", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "VFX_PRODUCER", labelTh: "โปรดิวเซอร์ VFX", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "VFX_ARTIST", labelTh: "ช่างรวมภาพ/ศิลปิน VFX", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "MOTION_GRAPHICS_DESIGNER", labelTh: "นักออกแบบ Motion Graphics", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "TITLE_DESIGNER", labelTh: "นักออกแบบเครดิต/ไตเติ้ล", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "SOUND_DESIGNER", labelTh: "นักออกแบบเสียง", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "SUPERVISING_SOUND_EDITOR", labelTh: "หัวหน้าบรรณาธิการเสียง", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "SOUND_EDITOR", labelTh: "นักตัดต่อเสียง", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "DIALOGUE_EDITOR", labelTh: "นักตัดต่อบทพูด", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "ADR_SUPERVISOR", labelTh: "หัวหน้า ADR", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "FOLEY_ARTIST", labelTh: "ช่างทำเสียงประกอบ", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "FOLEY_MIXER", labelTh: "ช่างผสมเสียง Foley", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "RE_RECORDING_MIXER", labelTh: "วิศวกรผสมเสียงสุดท้าย", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "MUSIC_COMPOSER", labelTh: "นักแต่งเพลงประกอบ", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "MUSIC_SUPERVISOR", labelTh: "ผู้ดูแลดนตรีประกอบ", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" },
    { name: "ORCHESTRATOR", labelTh: "ผู้เรียบเรียงดนตรี", category: "post_production", categoryLabelTh: "ฝ่ายหลังการผลิต" }
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
    if (!categoryId) throw new Error(`Category not found: ${movie.category} (key: ${categoryKey})`);

    const allCategoryIds = Array.from(categoryMap.values());
    const extraCategoryIds = allCategoryIds.filter(id => id !== categoryId);
    const count = 1 + (idx % 2); 
    const selectedExtraIds: string[] = [];
    for (let i = 0; i < count; i++) {
      const extraId = extraCategoryIds[(idx + i) % extraCategoryIds.length];
      if (extraId) {
        selectedExtraIds.push(extraId);
      }
    }
    const finalCategoryConnect = [categoryId, ...selectedExtraIds].map(id => ({ id }));

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

    const awards = idx % 4 === 0 ? ["Best Short Film", "Best Student Director"] : [];

    await prisma.movie.create({
      data: {
        id: movieId,
        title: movie.title,
        description: movie.description,
        thumbnail: movie.thumbnail,
        youtubeUrl: movie.youtubeUrl,
        trailerUrls: [movie.trailerUrl || movie.youtubeUrl],
        categories: {
          connect: finalCategoryConnect
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
        contentWarnings: [
          ...(hasProfanity ? ['PROFANITY'] : []),
          ...(hasDrugs ? ['DRUGS'] : [])
        ],
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
            const member = allCrewMembers[(idx * dbCrewRoles.length + roleIdx) % allCrewMembers.length];
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

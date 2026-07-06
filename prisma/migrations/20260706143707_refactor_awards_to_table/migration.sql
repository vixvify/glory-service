-- Step 1: สร้างตารางใหม่
CREATE TABLE "movie_awards" (
  "id"           UUID NOT NULL DEFAULT gen_random_uuid(),
  "movieId"      UUID NOT NULL,
  "projectName"  TEXT NOT NULL,
  "awardName"    TEXT NOT NULL,
  "createdAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"    TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "movie_awards_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "movie_awards_movieId_fkey"
    FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE
);
CREATE INDEX "movie_awards_movieId_idx" ON "movie_awards"("movieId");

-- Step 2: ดึงข้อมูลจาก JSONB เก่า Migrate เข้าตารางใหม่
INSERT INTO "movie_awards" ("id", "movieId", "projectName", "awardName", "createdAt", "updatedAt")
SELECT
  gen_random_uuid(),
  m.id,
  project->>'projectName',
  award_name,
  NOW(),
  NOW()
FROM "movies" m
CROSS JOIN LATERAL jsonb_array_elements(m.awards) AS project
CROSS JOIN LATERAL jsonb_array_elements_text(project->'awardList') AS award_name
WHERE m.awards != '[]'::jsonb AND m.awards IS NOT NULL;

-- Step 3: ลบคอลัมน์เก่า
ALTER TABLE "movies" DROP COLUMN "awards";
